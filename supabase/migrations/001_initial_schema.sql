-- CapturedByLulu Admin Platform Schema
-- Run in Supabase SQL Editor or via: supabase db push

-- Extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Profiles (admin access)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Bookings / inquiries
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  session_type TEXT NOT NULL,
  package TEXT NOT NULL,
  preferred_date DATE NOT NULL,
  location TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'New'
    CHECK (status IN ('New', 'Contacted', 'Booked', 'Completed', 'Cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS bookings_status_idx ON bookings(status);
CREATE INDEX IF NOT EXISTS bookings_preferred_date_idx ON bookings(preferred_date);
CREATE INDEX IF NOT EXISTS bookings_created_at_idx ON bookings(created_at DESC);

-- Package categories
CREATE TABLE IF NOT EXISTS package_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  note TEXT,
  link_href TEXT,
  link_label TEXT,
  display_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Packages
CREATE TABLE IF NOT EXISTS packages (
  id TEXT PRIMARY KEY,
  category_id TEXT NOT NULL REFERENCES package_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  price TEXT NOT NULL,
  description TEXT,
  duration TEXT NOT NULL DEFAULT '',
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_popular BOOLEAN NOT NULL DEFAULT false,
  display_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS packages_category_idx ON packages(category_id);
CREATE INDEX IF NOT EXISTS packages_active_idx ON packages(is_active);

-- Portfolio images
CREATE TABLE IF NOT EXISTS portfolio_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT,
  alt_text TEXT,
  tags TEXT[] NOT NULL DEFAULT '{}',
  storage_path TEXT NOT NULL,
  public_url TEXT NOT NULL,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  display_order INT NOT NULL DEFAULT 0,
  height INT NOT NULL DEFAULT 800,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS portfolio_category_idx ON portfolio_images(category);
CREATE INDEX IF NOT EXISTS portfolio_featured_idx ON portfolio_images(is_featured);
CREATE INDEX IF NOT EXISTS portfolio_order_idx ON portfolio_images(display_order);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  review TEXT NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  session_type TEXT NOT NULL,
  photo_url TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Site content (key-value JSON)
CREATE TABLE IF NOT EXISTS site_content (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Availability blocks
CREATE TABLE IF NOT EXISTS availability_blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  block_date DATE NOT NULL,
  block_type TEXT NOT NULL CHECK (block_type IN ('blocked', 'vacation', 'booked')),
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (block_date)
);

CREATE INDEX IF NOT EXISTS availability_date_idx ON availability_blocks(block_date);

-- Media library
CREATE TABLE IF NOT EXISTS media_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  public_url TEXT NOT NULL,
  mime_type TEXT,
  size_bytes BIGINT,
  alt_text TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Site settings
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
DECLARE
  t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'profiles', 'bookings', 'package_categories', 'packages',
    'portfolio_images', 'testimonials', 'site_content', 'site_settings'
  ]
  LOOP
    EXECUTE format(
      'DROP TRIGGER IF EXISTS set_updated_at ON %I; CREATE TRIGGER set_updated_at BEFORE UPDATE ON %I FOR EACH ROW EXECUTE FUNCTION set_updated_at();',
      t, t
    );
  END LOOP;
END $$;

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, is_admin)
  VALUES (NEW.id, NEW.email, false)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE package_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Admin helper (inline EXISTS checks in policies)
CREATE POLICY profiles_select_own ON profiles FOR SELECT TO authenticated
  USING (auth.uid() = id);

CREATE POLICY profiles_admin_update ON profiles FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.is_admin = true));

-- Bookings: admin full access; public insert via service role only (API route)
CREATE POLICY bookings_admin_all ON bookings FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.is_admin = true))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.is_admin = true));

-- Public read for active catalog data
CREATE POLICY package_categories_public_read ON package_categories FOR SELECT TO anon, authenticated
  USING (is_active = true);

CREATE POLICY package_categories_admin_all ON package_categories FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.is_admin = true))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.is_admin = true));

CREATE POLICY packages_public_read ON packages FOR SELECT TO anon, authenticated
  USING (is_active = true);

CREATE POLICY packages_admin_all ON packages FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.is_admin = true))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.is_admin = true));

CREATE POLICY portfolio_public_read ON portfolio_images FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY portfolio_admin_all ON portfolio_images FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.is_admin = true))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.is_admin = true));

CREATE POLICY testimonials_public_read ON testimonials FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY testimonials_admin_all ON testimonials FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.is_admin = true))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.is_admin = true));

CREATE POLICY site_content_public_read ON site_content FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY site_content_admin_all ON site_content FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.is_admin = true))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.is_admin = true));

CREATE POLICY availability_public_read ON availability_blocks FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY availability_admin_all ON availability_blocks FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.is_admin = true))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.is_admin = true));

CREATE POLICY media_admin_all ON media_assets FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.is_admin = true))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.is_admin = true));

CREATE POLICY settings_public_read ON site_settings FOR SELECT TO anon, authenticated
  USING (key IN ('business', 'social', 'hours', 'branding'));

CREATE POLICY settings_admin_all ON site_settings FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.is_admin = true))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.is_admin = true));

-- Storage buckets (run separately if needed via dashboard)
-- portfolio: public read, admin write
-- media: public read, admin write
-- branding: public read, admin write

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('portfolio', 'portfolio', true, 10485760, ARRAY['image/jpeg','image/png','image/webp','image/gif']),
  ('media', 'media', true, 20971520, ARRAY['image/jpeg','image/png','image/webp','image/gif','video/mp4']),
  ('branding', 'branding', true, 5242880, ARRAY['image/jpeg','image/png','image/webp','image/svg+xml','image/x-icon'])
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY portfolio_public_read ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id = 'portfolio');

CREATE POLICY portfolio_admin_write ON storage.objects FOR ALL TO authenticated
  USING (bucket_id = 'portfolio' AND EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.is_admin = true))
  WITH CHECK (bucket_id = 'portfolio' AND EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.is_admin = true));

CREATE POLICY media_public_read ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id = 'media');

CREATE POLICY media_admin_write ON storage.objects FOR ALL TO authenticated
  USING (bucket_id = 'media' AND EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.is_admin = true))
  WITH CHECK (bucket_id = 'media' AND EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.is_admin = true));

CREATE POLICY branding_public_read ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id = 'branding');

CREATE POLICY branding_admin_write ON storage.objects FOR ALL TO authenticated
  USING (bucket_id = 'branding' AND EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.is_admin = true))
  WITH CHECK (bucket_id = 'branding' AND EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.is_admin = true));
