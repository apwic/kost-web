-- Migration: Add RLS write policies for authenticated admin users
-- Run this against your Supabase project after applying schema.sql

-- Rooms
CREATE POLICY IF NOT EXISTS "Allow authenticated read" ON rooms FOR SELECT TO authenticated USING (true);
CREATE POLICY IF NOT EXISTS "Allow authenticated insert" ON rooms FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "Allow authenticated update" ON rooms FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "Allow authenticated delete" ON rooms FOR DELETE TO authenticated USING (true);

-- Gallery
CREATE POLICY IF NOT EXISTS "Allow authenticated read" ON gallery FOR SELECT TO authenticated USING (true);
CREATE POLICY IF NOT EXISTS "Allow authenticated insert" ON gallery FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "Allow authenticated update" ON gallery FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "Allow authenticated delete" ON gallery FOR DELETE TO authenticated USING (true);

-- Testimonials
CREATE POLICY IF NOT EXISTS "Allow authenticated read" ON testimonials FOR SELECT TO authenticated USING (true);
CREATE POLICY IF NOT EXISTS "Allow authenticated insert" ON testimonials FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "Allow authenticated update" ON testimonials FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "Allow authenticated delete" ON testimonials FOR DELETE TO authenticated USING (true);

-- Facilities
CREATE POLICY IF NOT EXISTS "Allow authenticated read" ON facilities FOR SELECT TO authenticated USING (true);
CREATE POLICY IF NOT EXISTS "Allow authenticated insert" ON facilities FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "Allow authenticated update" ON facilities FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "Allow authenticated delete" ON facilities FOR DELETE TO authenticated USING (true);

-- Site Settings
CREATE POLICY IF NOT EXISTS "Allow authenticated read" ON site_settings FOR SELECT TO authenticated USING (true);
CREATE POLICY IF NOT EXISTS "Allow authenticated insert" ON site_settings FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "Allow authenticated update" ON site_settings FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "Allow authenticated delete" ON site_settings FOR DELETE TO authenticated USING (true);
