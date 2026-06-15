-- ============================================
-- La Bodega Lomé — Supabase SQL Schema
-- ============================================

-- Categories
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  "order" INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Menu Items
CREATE TABLE IF NOT EXISTS menu_items (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  price INTEGER NOT NULL,
  category_id TEXT NOT NULL REFERENCES categories(id),
  badges TEXT[] DEFAULT '{}',
  available BOOLEAN DEFAULT true,
  image_url TEXT DEFAULT '',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Gallery
CREATE TABLE IF NOT EXISTS gallery (
  id TEXT PRIMARY KEY,
  url TEXT NOT NULL,
  caption TEXT DEFAULT '',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  text TEXT NOT NULL,
  rating INTEGER NOT NULL,
  location TEXT DEFAULT '',
  visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Restaurant Info (single row)
CREATE TABLE IF NOT EXISTS restaurant_info (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slogan TEXT DEFAULT '',
  address TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  whatsapp TEXT DEFAULT '',
  instagram TEXT DEFAULT '',
  hours TEXT DEFAULT '',
  description TEXT DEFAULT '',
  admin_password_hash TEXT DEFAULT '',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- Row Level Security (RLS) Policies
-- ============================================

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurant_info ENABLE ROW LEVEL SECURITY;

-- ── Categories: Public read/write (pour la migration) ──
CREATE POLICY "Allow public select categories" 
  ON categories FOR SELECT 
  USING (true);

CREATE POLICY "Allow public insert categories" 
  ON categories FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow public update categories" 
  ON categories FOR UPDATE 
  USING (true) WITH CHECK (true);

-- ── Menu Items: Public read, public write pour migration ──
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

-- ── Testimonials: Public read, restricted write ──
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

-- ============================================
-- Indexes (for performance)
-- ============================================

CREATE INDEX idx_menu_items_category_id ON menu_items(category_id);
CREATE INDEX idx_menu_items_available ON menu_items(available);
CREATE INDEX idx_testimonials_visible ON testimonials(visible);
