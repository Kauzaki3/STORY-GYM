-- ============================================================
-- STORY GYM — SEED DATA MIGRATION
-- Migration: 002_seed_data.sql
-- ============================================================

-- 1. MEMBERSHIP PLANS (Real Story Gym Prices)
INSERT INTO membership_plans (slug, name, tag, price, benefits, duration_months) VALUES
('daily', 'Daily Pass', NULL, 50000, '["1 Day Full Access", "Locker & Shower"]'::jsonb, 0),
('1-month', '1 Bulan', NULL, 150000, '["Full Gym Access", "Locker & Shower", "All Classes"]'::jsonb, 1),
('3-months', '3 Bulan', 'POPULAR', 400000, '["Full Gym Access", "Locker & Shower", "All Classes"]'::jsonb, 3),
('6-months', '6 Bulan', NULL, 700000, '["Full Gym Access", "Locker & Shower", "All Classes"]'::jsonb, 6),
('1-year', '1 Tahun', 'BEST VALUE', 1400000, '["Full Gym Access", "Locker & Shower", "All Classes"]'::jsonb, 12),
('member-card', 'Member Card / Joining', NULL, 75000, '["One-time joining fee", "Physical Member Card"]'::jsonb, 0)
ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price, name = EXCLUDED.name, tag = EXCLUDED.tag;

-- 2. PT PACKAGES
INSERT INTO pt_packages (slug, type, sessions, session_count, price, tag, benefits) VALUES
('pt-8', 'PERSONAL', '8X PERTEMUAN', 8, 1000000, NULL, '["Customized Program", "Nutrition Guide", "Body Metric Tracking"]'::jsonb),
('pt-12', 'PERSONAL', '12X PERTEMUAN', 12, 1200000, 'POPULAR', '["Customized Program", "Nutrition Guide", "Body Metric Tracking"]'::jsonb),
('pt-20', 'PERSONAL', '20X PERTEMUAN', 20, 2200000, 'BEST VALUE', '["Customized Program", "Nutrition Guide", "Body Metric Tracking"]'::jsonb),
('duo-8', 'DUO', '8X PERTEMUAN', 8, 1700000, NULL, '["Train with a Partner", "Customized Program", "Nutrition Guide"]'::jsonb),
('duo-12', 'DUO', '12X PERTEMUAN', 12, 2200000, NULL, '["Train with a Partner", "Customized Program", "Nutrition Guide"]'::jsonb),
('duo-20', 'DUO', '20X PERTEMUAN', 20, 4000000, NULL, '["Train with a Partner", "Customized Program", "Nutrition Guide"]'::jsonb)
ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price, sessions = EXCLUDED.sessions;

-- 3. TRAINERS
INSERT INTO trainers (name, title, specialization, experience, image_url, bio) VALUES
('Coach Arief', 'Head Coach', 'Strength & Conditioning', '8+ Years Experience', '/images/trainers/coach-arief.jpg', 'Spesialis strength training dan body transformation.'),
('Coach Sisca', 'Fitness Coach', 'Weight Loss & Toning', '6+ Years Experience', '/images/trainers/coach-sisca.jpg', 'Ahli dalam program penurunan berat badan dan body toning.'),
('Coach Appy', 'Fitness Coach', 'Functional Training', '5+ Years Experience', '/images/trainers/coach-appy.jpg', 'Fokus pada functional movement dan mobilitas.'),
('Coach Ilman', 'Fitness Coach', 'Muscle Building', '7+ Years Experience', 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=500&fit=crop', 'Spesialis hypertrophy dan muscle building.'),
('Coach Resty', 'Fitness Coach', 'HIIT & Group Classes', '4+ Years Experience', 'https://images.unsplash.com/photo-1609899464926-209b0035b6c1?w=400&h=500&fit=crop', 'Energetic group class instructor.')
ON CONFLICT DO NOTHING;

-- 4. PRODUCT CATEGORIES
INSERT INTO product_categories (slug, name, description) VALUES
('supplements', 'Supplements', 'Protein, Creatine, Pre-workout, and health supplements'),
('merch', 'Merchandise', 'Story Gym apparel, bags, towels, and water bottles'),
('equipment', 'Gym Equipment', 'Resistance bands, jump ropes, mats, and lifting gear'),
('bundles', 'Bundles', 'Special curated bundles for maximum value')
ON CONFLICT (slug) DO NOTHING;

-- 5. INITIAL ADMIN USER (Mock Profile)
INSERT INTO profiles (email, full_name, role, phone) VALUES
('admin@storygym.id', 'Admin Story Gym', 'ADMIN', '+6285186849980'),
('staff@storygym.id', 'Staff Story Gym', 'STAFF', '+6285186849981')
ON CONFLICT (email) DO NOTHING;
