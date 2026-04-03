import { createClient } from "@/lib/supabase/server";
import type { SiteSetting } from "@/lib/types";
import Navbar from "./Navbar";
import HeroScrollButton from "./HeroScrollButton";

const FALLBACK_HEADLINE = "Temukan Kost Nyaman untuk Hunian Anda";
const FALLBACK_SUBTITLE =
  "Hunian modern dengan fasilitas lengkap dan harga terjangkau di lokasi strategis";
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80";

async function getHeroData() {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("site_settings")
      .select("key, value")
      .in("key", ["hero_image_url", "hero_headline", "hero_subtitle"]);

    const settings: Record<string, string> = {};
    if (data) {
      (data as SiteSetting[]).forEach((s) => {
        settings[s.key] = s.value;
      });
    }

    return {
      headline: settings.hero_headline || FALLBACK_HEADLINE,
      subtitle: settings.hero_subtitle || FALLBACK_SUBTITLE,
      imageUrl: settings.hero_image_url || FALLBACK_IMAGE,
    };
  } catch {
    return {
      headline: FALLBACK_HEADLINE,
      subtitle: FALLBACK_SUBTITLE,
      imageUrl: FALLBACK_IMAGE,
    };
  }
}

export default async function Hero() {
  const { headline, subtitle, imageUrl } = await getHeroData();

  return (
    <section className="relative h-[580px] lg:h-[700px] w-full overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Navbar */}
      <Navbar />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <h1 className="font-[family-name:var(--font-heading)] font-bold text-5xl lg:text-6xl text-white max-w-3xl leading-tight">
          {headline}
        </h1>
        <p className="font-[family-name:var(--font-body)] text-lg text-white/80 mt-6 max-w-xl">
          {subtitle}
        </p>
        <HeroScrollButton />
      </div>
    </section>
  );
}
