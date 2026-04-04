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
import { getSiteSettings } from "@/lib/settings";
import type { Testimonial } from "@/lib/types";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title = `${settings.site_name} — Kost Modern di ${settings.city}`;
  const description = settings.seo_description;
  const images = settings.hero_image_url ? [{ url: settings.hero_image_url }] : [];

  return {
    title,
    description,
    openGraph: { title, description, images },
    twitter: { card: "summary_large_image", title, description },
  };
}

async function getJsonLdData() {
  const settings = await getSiteSettings();
  let testimonials: Testimonial[] = [];

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("testimonials")
      .select("*")
      .eq("is_visible", true);
    if (data) testimonials = data;
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
  const [jsonLd, settings] = await Promise.all([
    getJsonLdData(),
    getSiteSettings(),
  ]);

  return (
    <main className="min-h-screen bg-surface-primary text-fg-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar siteName={settings.site_name} logoUrl={settings.logo_url} />
      <Hero />
      <Facilities />
      <RoomTypes />
      <GalleryPreview />
      <Testimonials />
      <ContactCTA />
      <Footer
        siteName={settings.site_name}
        logoUrl={settings.logo_url}
        email={settings.email}
        phone={settings.phone_number}
        address={settings.address}
        instagramUrl={settings.instagram_url}
        facebookUrl={settings.facebook_url}
        tiktokUrl={settings.tiktok_url}
      />
    </main>
  );
}
