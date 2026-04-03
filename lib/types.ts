export interface Room {
  id: string;
  name: string;
  slug: string;
  price: number;
  price_label: string;
  description: string;
  image_url: string;
  amenities: string[];
  is_available: boolean;
  sort_order: number;
  total_units: number;
  available_units: number;
  created_at: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  media_type: string;
  media_url: string;
  thumbnail_url: string;
  category: string;
  duration: string;
  is_featured: boolean;
  alt_text: string | null;
  sort_order: number;
  created_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  avatar_url: string;
  is_visible: boolean;
  sort_order: number;
  created_at: string;
}

export interface Facility {
  id: string;
  name: string;
  description: string;
  icon_name: string;
  sort_order: number;
  created_at: string;
}

export interface SiteSetting {
  key: string;
  value: string;
  updated_at: string;
}
