-- KostKu Seed Data

-- Rooms
INSERT INTO rooms (name, slug, price, price_label, description, image_url, amenities, is_available, sort_order, total_units, available_units) VALUES
(
  'Standard',
  'standard',
  1500000,
  'Rp 1.500.000 / bulan',
  'Kamar nyaman dengan fasilitas dasar untuk kebutuhan harian Anda. Cocok untuk mahasiswa dan pekerja yang mencari hunian praktis.',
  'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
  '["Kasur Single", "Lemari Pakaian", "Meja Belajar", "WiFi", "Kamar Mandi Dalam"]',
  true,
  1,
  5,
  3
),
(
  'Deluxe',
  'deluxe',
  2500000,
  'Rp 2.500.000 / bulan',
  'Kamar luas dengan fasilitas premium untuk kenyamanan ekstra. Dilengkapi AC dan perabotan modern.',
  'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80',
  '["Kasur Queen", "Lemari Pakaian", "Meja Belajar", "WiFi", "Kamar Mandi Dalam", "AC", "TV LED 32 inch", "Kulkas Mini"]',
  true,
  2,
  3,
  1
),
(
  'Premium',
  'premium',
  3500000,
  'Rp 3.500.000 / bulan',
  'Kamar terbaik kami dengan fasilitas lengkap dan desain interior modern. Pengalaman tinggal seperti di apartemen.',
  'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
  '["Kasur King", "Walk-in Closet", "Meja Kerja Ergonomis", "WiFi Premium", "Kamar Mandi Dalam (Shower & Bathtub)", "AC Inverter", "Smart TV 43 inch", "Kulkas", "Balkon Privat", "Water Heater"]',
  true,
  3,
  2,
  2
);

-- Facilities
INSERT INTO facilities (name, description, icon_name, sort_order) VALUES
('WiFi Cepat', 'Internet berkecepatan tinggi hingga 100 Mbps tersedia di seluruh area kost.', 'wifi', 1),
('AC & Kipas Angin', 'Setiap kamar dilengkapi AC dan kipas angin untuk kenyamanan optimal.', 'wind', 2),
('Parkir Luas', 'Area parkir yang luas dan aman untuk motor dan mobil penghuni.', 'car', 3),
('Laundry', 'Layanan laundry tersedia setiap hari dengan harga terjangkau.', 'shirt', 4),
('Dapur Bersama', 'Dapur bersama yang bersih dan lengkap dengan peralatan masak.', 'cooking-pot', 5),
('Keamanan 24 Jam', 'Sistem keamanan CCTV dan satpam berjaga 24 jam untuk ketenangan Anda.', 'shield-check', 6);

-- Gallery
INSERT INTO gallery (title, media_type, media_url, thumbnail_url, category, duration, is_featured, sort_order) VALUES
(
  'Kamar Deluxe - Interior Modern',
  'photo',
  'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&q=80',
  'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400&q=80',
  'kamar',
  NULL,
  false,
  1
),
(
  'Area Parkir Luas',
  'photo',
  'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=1200&q=80',
  'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=400&q=80',
  'fasilitas',
  NULL,
  false,
  2
),
(
  'Lingkungan Asri dan Hijau',
  'photo',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80',
  'lingkungan',
  NULL,
  false,
  3
),
(
  'Tur Virtual KostKu',
  'video',
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80',
  'fasilitas',
  '3:45',
  true,
  4
),
(
  'Review Penghuni KostKu',
  'video',
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&q=80',
  'lingkungan',
  '2:30',
  false,
  5
);

-- Testimonials
INSERT INTO testimonials (name, role, quote, rating, avatar_url, is_visible, sort_order) VALUES
(
  'Aisyah Putri',
  'Mahasiswi',
  'Saya sudah tinggal di KostKu selama 2 tahun dan sangat puas. Fasilitasnya lengkap, lingkungannya aman, dan pemiliknya sangat ramah. WiFi-nya juga kencang, cocok banget buat kuliah online!',
  5,
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
  true,
  1
),
(
  'Budi Santoso',
  'Karyawan',
  'Lokasi KostKu sangat strategis, dekat dengan kantor dan pusat perbelanjaan. Kamarnya bersih dan nyaman. Harga juga sangat bersahabat untuk fasilitas yang didapat. Recommended banget!',
  5,
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
  true,
  2
),
(
  'Citra Dewi',
  'Profesional',
  'Sebagai profesional yang butuh tempat tinggal nyaman, KostKu adalah pilihan terbaik. Kamar Premium-nya seperti apartemen mini. AC-nya dingin, kamar mandinya bersih, dan ada balkon pribadi juga!',
  5,
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
  true,
  3
);

-- Site Settings
INSERT INTO site_settings (key, value) VALUES
('whatsapp_number', '6281234567890'),
('phone_number', '+62 812 3456 7890'),
('address', 'Jl. Merdeka No. 45 Jakarta Selatan'),
('email', 'info@kostku.com'),
('site_name', 'KostKu'),
('hero_image_url', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80'),
('hero_headline', 'Kost Modern di Jantung Jakarta'),
('hero_subtitle', 'Nikmati hunian nyaman dengan fasilitas lengkap, lokasi strategis, dan harga terjangkau. KostKu — rumah kedua Anda di Jakarta.'),
('whatsapp_greeting', 'Halo KostKu! Saya tertarik untuk mengetahui lebih lanjut tentang kamar yang tersedia.');
