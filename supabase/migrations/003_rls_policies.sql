-- ============================================================
-- STORY GYM — ROW LEVEL SECURITY (RLS) POLICIES
-- Migration: 003_rls_policies.sql
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE membership_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE trainers ENABLE ROW LEVEL SECURITY;
ALTER TABLE pt_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE pt_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE free_trial_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE promotions ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current user is ADMIN or STAFF
CREATE OR REPLACE FUNCTION is_admin_or_staff()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM profiles
        WHERE user_id = auth.uid()
        AND role IN ('ADMIN', 'STAFF')
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. PUBLIC READ ACCESS POLICIES (For Customer Site)
CREATE POLICY "Public read active membership plans" ON membership_plans FOR SELECT USING (is_active = true);
CREATE POLICY "Public read active trainers" ON trainers FOR SELECT USING (is_active = true);
CREATE POLICY "Public read active pt packages" ON pt_packages FOR SELECT USING (is_active = true);
CREATE POLICY "Public read active classes" ON classes FOR SELECT USING (is_active = true);
CREATE POLICY "Public read product categories" ON product_categories FOR SELECT USING (true);
CREATE POLICY "Public read active products" ON products FOR SELECT USING (is_active = true);
CREATE POLICY "Public read product variants" ON product_variants FOR SELECT USING (true);
CREATE POLICY "Public read active promotions" ON promotions FOR SELECT USING (is_active = true);

-- 2. PUBLIC INSERT ACCESS (Free Trial & Orders)
CREATE POLICY "Public can submit free trial" ON free_trial_leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can create orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can create order items" ON order_items FOR INSERT WITH CHECK (true);

-- 3. ADMIN & STAFF FULL ACCESS POLICIES
CREATE POLICY "Admin full profiles" ON profiles FOR ALL USING (is_admin_or_staff());
CREATE POLICY "Admin full members" ON members FOR ALL USING (is_admin_or_staff());
CREATE POLICY "Admin full membership_plans" ON membership_plans FOR ALL USING (is_admin_or_staff());
CREATE POLICY "Admin full memberships" ON memberships FOR ALL USING (is_admin_or_staff());
CREATE POLICY "Admin full trainers" ON trainers FOR ALL USING (is_admin_or_staff());
CREATE POLICY "Admin full pt_packages" ON pt_packages FOR ALL USING (is_admin_or_staff());
CREATE POLICY "Admin full pt_bookings" ON pt_bookings FOR ALL USING (is_admin_or_staff());
CREATE POLICY "Admin full classes" ON classes FOR ALL USING (is_admin_or_staff());
CREATE POLICY "Admin full class_bookings" ON class_bookings FOR ALL USING (is_admin_or_staff());
CREATE POLICY "Admin full product_categories" ON product_categories FOR ALL USING (is_admin_or_staff());
CREATE POLICY "Admin full products" ON products FOR ALL USING (is_admin_or_staff());
CREATE POLICY "Admin full product_variants" ON product_variants FOR ALL USING (is_admin_or_staff());
CREATE POLICY "Admin full inventory" ON inventory FOR ALL USING (is_admin_or_staff());
CREATE POLICY "Admin full orders" ON orders FOR ALL USING (is_admin_or_staff());
CREATE POLICY "Admin full order_items" ON order_items FOR ALL USING (is_admin_or_staff());
CREATE POLICY "Admin full payments" ON payments FOR ALL USING (is_admin_or_staff());
CREATE POLICY "Admin full free_trial_leads" ON free_trial_leads FOR ALL USING (is_admin_or_staff());
CREATE POLICY "Admin full promotions" ON promotions FOR ALL USING (is_admin_or_staff());
CREATE POLICY "Admin full attendance" ON attendance FOR ALL USING (is_admin_or_staff());
