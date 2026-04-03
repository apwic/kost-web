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
INSERT INTO gallery (title, media_type, media_url, thumbnail_url, category, duration, is_featured, alt_text, sort_order) VALUES
-- Kamar photos (10 items)
('Kamar Deluxe - Interior Modern', 'photo', 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&q=80', 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400&q=80', 'kamar', NULL, false, 'Interior kamar deluxe dengan desain modern', 1),
('Kamar Standard - Nyaman', 'photo', 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&q=80', 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&q=80', 'kamar', NULL, false, 'Kamar standard yang nyaman dan bersih', 2),
('Kamar Premium - Suite', 'photo', 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80', 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80', 'kamar', NULL, false, 'Suite premium dengan fasilitas lengkap', 3),
('Kamar Mandi Dalam', 'photo', 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&q=80', 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&q=80', 'kamar', NULL, false, 'Kamar mandi dalam yang bersih dan modern', 4),
('Meja Belajar di Kamar', 'photo', 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=1200&q=80', 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&q=80', 'kamar', NULL, false, 'Area meja belajar di dalam kamar', 5),
('Kamar Deluxe - Sudut Lain', 'photo', 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=1200&q=80', 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=400&q=80', 'kamar', NULL, false, 'Sudut lain kamar deluxe yang luas', 6),
('Lemari Pakaian Kamar Premium', 'photo', 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&q=80', 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80', 'kamar', NULL, false, 'Walk-in closet di kamar premium', 7),
('Balkon Kamar Premium', 'photo', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80', 'kamar', NULL, false, 'Balkon privat kamar premium dengan pemandangan', 8),
('Kasur King Size Premium', 'photo', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&q=80', 'kamar', NULL, false, 'Kasur king size yang empuk di kamar premium', 9),
('Kamar Standard - Tampak Depan', 'photo', 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=1200&q=80', 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=400&q=80', 'kamar', NULL, false, 'Tampak depan kamar standard', 10),

-- Fasilitas photos (8 items)
('Area Parkir Luas', 'photo', 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=1200&q=80', 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=400&q=80', 'fasilitas', NULL, false, 'Area parkir yang luas dan aman', 11),
('Dapur Bersama', 'photo', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80', 'fasilitas', NULL, false, 'Dapur bersama yang bersih dan lengkap', 12),
('Ruang Tamu Bersama', 'photo', 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80', 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&q=80', 'fasilitas', NULL, false, 'Ruang tamu bersama yang nyaman', 13),
('Area Laundry', 'photo', 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=1200&q=80', 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=400&q=80', 'fasilitas', NULL, false, 'Area laundry dengan mesin cuci modern', 14),
('Rooftop Lounge', 'photo', 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80', 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80', 'fasilitas', NULL, false, 'Area rooftop untuk bersantai', 15),
('WiFi Router Cepat', 'photo', 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&q=80', 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&q=80', 'fasilitas', NULL, false, 'Router WiFi berkecepatan tinggi', 16),
('CCTV Keamanan', 'photo', 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=1200&q=80', 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=400&q=80', 'fasilitas', NULL, false, 'Sistem CCTV untuk keamanan 24 jam', 17),
('AC Inverter Modern', 'photo', 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=1200&q=80', 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=400&q=80', 'fasilitas', NULL, false, 'AC inverter hemat energi di setiap kamar', 18),

-- Lingkungan photos (10 items)
('Lingkungan Asri dan Hijau', 'photo', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80', 'lingkungan', NULL, false, 'Lingkungan kost yang asri dan hijau', 19),
('Tampak Depan Kost', 'photo', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80', 'lingkungan', NULL, false, 'Tampak depan bangunan kost', 20),
('Taman Kost', 'photo', 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=1200&q=80', 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=400&q=80', 'lingkungan', NULL, false, 'Taman hijau di area kost', 21),
('Jalan Masuk Kost', 'photo', 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80', 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400&q=80', 'lingkungan', NULL, false, 'Jalan masuk ke area kost yang rapi', 22),
('Koridor Kost', 'photo', 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200&q=80', 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=400&q=80', 'lingkungan', NULL, false, 'Koridor kost yang bersih dan terang', 23),
('Area Sekitar - Cafe Terdekat', 'photo', 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&q=80', 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&q=80', 'lingkungan', NULL, false, 'Cafe terdekat dari lokasi kost', 24),
('Area Sekitar - Minimarket', 'photo', 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1200&q=80', 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400&q=80', 'lingkungan', NULL, false, 'Minimarket terdekat dari lokasi kost', 25),
('Pemandangan Malam', 'photo', 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80', 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&q=80', 'lingkungan', NULL, false, 'Pemandangan area kost di malam hari', 26),
('Halaman Belakang', 'photo', 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80', 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&q=80', 'lingkungan', NULL, false, 'Halaman belakang kost yang terawat', 27),
('Teras Depan', 'photo', 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&q=80', 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=400&q=80', 'lingkungan', NULL, false, 'Teras depan kost yang nyaman', 28),

-- Videos (5 items)
('Tur Virtual KostKu', 'video', '/videos/tur-kostku.mp4', 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80', 'kamar', '3:45', true, 'Video tur virtual seluruh area KostKu', 29),
('Video Tur Kamar Standard', 'video', '/videos/tur-standard.mp4', 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&q=80', 'kamar', '2:15', false, 'Video tur kamar standard', 30),
('Video Tur Kamar Deluxe', 'video', '/videos/tur-deluxe.mp4', 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400&q=80', 'kamar', '2:45', true, 'Video tur kamar deluxe dengan fasilitas lengkap', 31),
('Review Penghuni KostKu', 'video', '/videos/review-penghuni.mp4', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&q=80', 'lingkungan', '2:30', false, 'Video review dari penghuni kost', 32),
('Tur Fasilitas Bersama', 'video', '/videos/tur-fasilitas.mp4', 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&q=80', 'fasilitas', '4:10', false, 'Video tur fasilitas bersama kost', 33);

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
