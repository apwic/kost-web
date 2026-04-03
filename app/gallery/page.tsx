import { Suspense } from "react";
import type { Metadata } from "next";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import GalleryHeader from "@/components/gallery/GalleryHeader";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { createClient } from "@/lib/supabase/server";
import { BATCH_SIZE, type GalleryCategory } from "@/lib/gallery";
import type { GalleryItem } from "@/lib/types";

export const metadata: Metadata = {
  title: "Galeri - KostKu",
  description:
    "Jelajahi foto dan video tur kost kami. Lihat kamar, fasilitas, dan lingkungan KostKu.",
};

const FALLBACK_ITEMS: GalleryItem[] = [
  { id: "1", title: "Kamar Deluxe - Interior Modern", media_type: "photo", media_url: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&q=80", thumbnail_url: "", category: "kamar", duration: "", is_featured: false, alt_text: "Interior kamar deluxe", sort_order: 1, created_at: "" },
  { id: "2", title: "Kamar Standard - Nyaman", media_type: "photo", media_url: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&q=80", thumbnail_url: "", category: "kamar", duration: "", is_featured: false, alt_text: "Kamar standard nyaman", sort_order: 2, created_at: "" },
  { id: "3", title: "Kamar Premium - Suite", media_type: "photo", media_url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80", thumbnail_url: "", category: "kamar", duration: "", is_featured: false, alt_text: "Suite premium", sort_order: 3, created_at: "" },
  { id: "4", title: "Area Parkir Luas", media_type: "photo", media_url: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=1200&q=80", thumbnail_url: "", category: "fasilitas", duration: "", is_featured: false, alt_text: "Area parkir luas", sort_order: 4, created_at: "" },
  { id: "5", title: "Dapur Bersama", media_type: "photo", media_url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80", thumbnail_url: "", category: "fasilitas", duration: "", is_featured: false, alt_text: "Dapur bersama", sort_order: 5, created_at: "" },
  { id: "6", title: "Lingkungan Asri", media_type: "photo", media_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80", thumbnail_url: "", category: "lingkungan", duration: "", is_featured: false, alt_text: "Lingkungan asri", sort_order: 6, created_at: "" },
  { id: "7", title: "Tur Virtual KostKu", media_type: "video", media_url: "/videos/tur-kostku.mp4", thumbnail_url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80", category: "kamar", duration: "3:45", is_featured: true, alt_text: "Video tur virtual KostKu", sort_order: 7, created_at: "" },
  { id: "8", title: "Tampak Depan Kost", media_type: "photo", media_url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80", thumbnail_url: "", category: "lingkungan", duration: "", is_featured: false, alt_text: "Tampak depan kost", sort_order: 8, created_at: "" },
  { id: "9", title: "Rooftop Lounge", media_type: "photo", media_url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80", thumbnail_url: "", category: "fasilitas", duration: "", is_featured: false, alt_text: "Area rooftop", sort_order: 9, created_at: "" },
  { id: "10", title: "Taman Kost", media_type: "photo", media_url: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=1200&q=80", thumbnail_url: "", category: "lingkungan", duration: "", is_featured: false, alt_text: "Taman kost", sort_order: 10, created_at: "" },
  { id: "11", title: "Video Tur Kamar Deluxe", media_type: "video", media_url: "/videos/tur-deluxe.mp4", thumbnail_url: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400&q=80", category: "kamar", duration: "2:45", is_featured: true, alt_text: "Video tur kamar deluxe", sort_order: 11, created_at: "" },
  { id: "12", title: "Koridor Kost", media_type: "photo", media_url: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200&q=80", thumbnail_url: "", category: "lingkungan", duration: "", is_featured: false, alt_text: "Koridor kost", sort_order: 12, created_at: "" },
];

async function getInitialGalleryData(category: GalleryCategory) {
  try {
    const supabase = await createClient();
    let query = supabase
      .from("gallery")
      .select("*", { count: "exact" })
      .order("sort_order", { ascending: true });

    if (category === "video") {
      query = query.eq("media_type", "video");
    } else if (category !== "semua") {
      query = query.eq("category", category);
    }

    query = query.range(0, BATCH_SIZE - 1);
    const { data, count } = await query;

    if (data && data.length > 0) {
      return { items: data as GalleryItem[], count: count ?? data.length };
    }
  } catch {
    // Use fallback
  }

  // Fallback: filter client-side
  let filtered = FALLBACK_ITEMS;
  if (category === "video") {
    filtered = FALLBACK_ITEMS.filter((i) => i.media_type === "video");
  } else if (category !== "semua") {
    filtered = FALLBACK_ITEMS.filter((i) => i.category === category);
  }
  return { items: filtered.slice(0, BATCH_SIZE), count: filtered.length };
}

const VALID_CATEGORIES = ["semua", "kamar", "fasilitas", "lingkungan", "video"] as const;

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const rawCategory = params.category || "semua";
  const category: GalleryCategory = VALID_CATEGORIES.includes(
    rawCategory as GalleryCategory
  )
    ? (rawCategory as GalleryCategory)
    : "semua";

  const { items, count } = await getInitialGalleryData(category);

  return (
    <main className="min-h-screen bg-surface-primary text-fg-primary">
      <Navbar variant="solid" />
      <GalleryHeader />
      <Suspense>
        <GalleryGrid
          initialItems={items}
          initialCount={count}
          initialCategory={category}
        />
      </Suspense>
      <Footer />
    </main>
  );
}
