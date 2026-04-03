import type { Metadata } from "next";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Facilities from "@/components/landing/Facilities";
import RoomTypes from "@/components/landing/RoomTypes";
import GalleryPreview from "@/components/landing/GalleryPreview";
import Testimonials from "@/components/landing/Testimonials";
import ContactCTA from "@/components/landing/ContactCTA";
import Footer from "@/components/landing/Footer";
import { createClient } from "@/lib/supabase/server";
import { buildLocalBusinessJsonLd } from "@/lib/jsonld";
import type { SiteSetting, Testimonial } from "@/lib/types";

export async function generateMetadata(): Promise<Metadata> {
  let heroImageUrl = "";

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("site_settings")
      .select("key, value, updated_at")
      .eq("key", "hero_image_url")
      .single();
    if (data?.value) {
      heroImageUrl = data.value;
    }
  } catch {
    // Use fallback without OG image
  }

  const images = heroImageUrl ? [{ url: heroImageUrl }] : [];

  return {
    title: "KostKu — Kost Modern di Jakarta",
    description:
      "Temukan kost modern di Jakarta dengan fasilitas lengkap, lokasi strategis, keamanan 24 jam, dan harga terjangkau. Booking sekarang!",
    openGraph: {
      title: "KostKu — Kost Modern di Jakarta",
      description:
        "Temukan kost modern di Jakarta dengan fasilitas lengkap, lokasi strategis, keamanan 24 jam, dan harga terjangkau. Booking sekarang!",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: "KostKu — Kost Modern di Jakarta",
      description:
        "Temukan kost modern di Jakarta dengan fasilitas lengkap, lokasi strategis, keamanan 24 jam, dan harga terjangkau. Booking sekarang!",
    },
  };
}

async function getJsonLdData() {
  let settings: SiteSetting[] = [];
  let testimonials: Testimonial[] = [];

  try {
    const supabase = await createClient();

    const [settingsRes, testimonialsRes] = await Promise.all([
      supabase.from("site_settings").select("key, value, updated_at"),
      supabase
        .from("testimonials")
        .select("*")
        .eq("is_visible", true),
    ]);

    if (settingsRes.data) settings = settingsRes.data;
    if (testimonialsRes.data) testimonials = testimonialsRes.data;
  } catch {
    // Use empty fallbacks
  }

  const reviewCount = testimonials.length;
  const avgRating =
    reviewCount > 0
      ? testimonials.reduce((sum, t) => sum + t.rating, 0) / reviewCount
      : 0;

  return buildLocalBusinessJsonLd(settings, avgRating, reviewCount);
}

export default async function Home() {
  const jsonLd = await getJsonLdData();

  return (
    <main className="min-h-screen bg-surface-primary text-fg-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <Hero />
      <Facilities />
      <RoomTypes />
      <GalleryPreview />
      <Testimonials />
      <ContactCTA />
      <Footer />
    </main>
  );
}
