-- ============================================
-- CLEANUP: Supprime les anciennes policies
-- ============================================

-- Categories
DROP POLICY IF EXISTS "Allow public select categories" ON categories;
DROP POLICY IF EXISTS "Allow public insert categories" ON categories;
DROP POLICY IF EXISTS "Allow public update categories" ON categories;

-- Menu Items
DROP POLICY IF EXISTS "Allow public select menu_items" ON menu_items;
DROP POLICY IF EXISTS "Allow public insert menu_items" ON menu_items;
DROP POLICY IF EXISTS "Allow public update menu_items" ON menu_items;

-- Gallery
DROP POLICY IF EXISTS "Allow public select gallery" ON gallery;
DROP POLICY IF EXISTS "Allow public insert gallery" ON gallery;
DROP POLICY IF EXISTS "Allow public update gallery" ON gallery;

-- Testimonials
DROP POLICY IF EXISTS "Allow public select testimonials" ON testimonials;
DROP POLICY IF EXISTS "Allow public insert testimonials" ON testimonials;
DROP POLICY IF EXISTS "Allow public update testimonials" ON testimonials;

-- Restaurant Info
DROP POLICY IF EXISTS "Allow public select restaurant_info" ON restaurant_info;
DROP POLICY IF EXISTS "Allow public insert restaurant_info" ON restaurant_info;
DROP POLICY IF EXISTS "Allow public update restaurant_info" ON restaurant_info;

-- ============================================
-- Ajoute les nouvelles policies (read + write)
-- ============================================

-- ── Categories: Public read/write ──
CREATE POLICY "Allow public select categories" 
  ON categories FOR SELECT 
  USING (true);

CREATE POLICY "Allow public insert categories" 
  ON categories FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow public update categories" 
  ON categories FOR UPDATE 
  USING (true) WITH CHECK (true);

-- ── Menu Items: Public read/write ──
CREATE POLICY "Allow public select menu_items" 
  ON menu_items FOR SELECT 
  USING (true);

CREATE POLICY "Allow public insert menu_items" 
  ON menu_items FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow public update menu_items" 
  ON menu_items FOR UPDATE 
  USING (true) WITH CHECK (true);

-- ── Gallery: Public read/write ──
CREATE POLICY "Allow public select gallery" 
  ON gallery FOR SELECT 
  USING (true);

CREATE POLICY "Allow public insert gallery" 
  ON gallery FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow public update gallery" 
  ON gallery FOR UPDATE 
  USING (true) WITH CHECK (true);

-- ── Testimonials: Public read/write ──
CREATE POLICY "Allow public select testimonials" 
  ON testimonials FOR SELECT 
  USING (visible = true);

CREATE POLICY "Allow public insert testimonials" 
  ON testimonials FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow public update testimonials" 
  ON testimonials FOR UPDATE 
  USING (true) WITH CHECK (true);

-- ── Restaurant Info: Public read/write ──
CREATE POLICY "Allow public select restaurant_info" 
  ON restaurant_info FOR SELECT 
  USING (true);

CREATE POLICY "Allow public insert restaurant_info" 
  ON restaurant_info FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow public update restaurant_info" 
  ON restaurant_info FOR UPDATE 
  USING (true) WITH CHECK (true);
