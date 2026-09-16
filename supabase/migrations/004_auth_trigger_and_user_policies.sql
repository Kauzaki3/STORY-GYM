-- ============================================================
-- STORY GYM — AUTH TRIGGER & USER SELF-READ POLICIES
-- Migration: 004_auth_trigger_and_user_policies.sql
-- ============================================================

-- 1. AUTO-CREATE PROFILE ON SIGNUP
-- When a user signs up via Supabase Auth, auto-insert into profiles table
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (user_id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    'CUSTOMER'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if it already exists, then create
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- 2. RLS POLICIES: Let logged-in users read their OWN profile
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  USING (user_id = auth.uid());

-- 3. RLS POLICIES: Let logged-in users read their OWN member record
CREATE POLICY "Users can read own member record"
  ON members FOR SELECT
  USING (
    profile_id IN (
      SELECT id FROM profiles WHERE user_id = auth.uid()
    )
  );

-- 4. BACKFILL: Create profiles for any existing auth.users that don't have one yet
INSERT INTO profiles (user_id, email, full_name, role)
SELECT 
  au.id,
  au.email,
  COALESCE(au.raw_user_meta_data->>'full_name', split_part(au.email, '@', 1)),
  'CUSTOMER'
FROM auth.users au
WHERE NOT EXISTS (
  SELECT 1 FROM profiles p WHERE p.user_id = au.id
);
