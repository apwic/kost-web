-- KostKu Database Schema

-- Rooms table
CREATE TABLE rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  price INTEGER NOT NULL,
  price_label TEXT,
  description TEXT,
  image_url TEXT,
  amenities JSONB,
  is_available BOOLEAN DEFAULT TRUE,
  sort_order INTEGER,
  total_units INTEGER DEFAULT 1,
  available_units INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Gallery table
CREATE TABLE gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT,
  media_type TEXT,
  media_url TEXT,
  thumbnail_url TEXT,
  category TEXT,
  duration TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  alt_text TEXT,
  sort_order INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Testimonials table
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  role TEXT,
  quote TEXT,
  rating INTEGER,
  avatar_url TEXT,
  is_visible BOOLEAN DEFAULT TRUE,
  sort_order INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Facilities table
CREATE TABLE facilities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  description TEXT,
  icon_name TEXT,
  sort_order INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Site settings table
CREATE TABLE site_settings (
  key TEXT PRIMARY KEY,
  value TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read access on all tables
CREATE POLICY "Allow anonymous read access" ON rooms
  FOR SELECT TO anon USING (true);

CREATE POLICY "Allow anonymous read access" ON gallery
  FOR SELECT TO anon USING (true);

CREATE POLICY "Allow anonymous read access" ON testimonials
  FOR SELECT TO anon USING (true);

CREATE POLICY "Allow anonymous read access" ON facilities
  FOR SELECT TO anon USING (true);

CREATE POLICY "Allow anonymous read access" ON site_settings
  FOR SELECT TO anon USING (true);

-- Admin users are created manually via Supabase Dashboard (Auth > Users).
-- No profiles table needed — a valid Supabase Auth session grants admin access.

-- Allow authenticated users full access on all tables
CREATE POLICY "Allow authenticated read" ON rooms FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated insert" ON rooms FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update" ON rooms FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated delete" ON rooms FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated read" ON gallery FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated insert" ON gallery FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update" ON gallery FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated delete" ON gallery FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated read" ON testimonials FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated insert" ON testimonials FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update" ON testimonials FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated delete" ON testimonials FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated read" ON facilities FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated insert" ON facilities FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update" ON facilities FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated delete" ON facilities FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated read" ON site_settings FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated insert" ON site_settings FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update" ON site_settings FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated delete" ON site_settings FOR DELETE TO authenticated USING (true);
