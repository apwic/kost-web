import type { SiteSettings } from "./types";

const DEFAULTS: SiteSettings = {
  site_name: "Nama Kost",
  phone_number: "+62 xxx xxxx xxxx",
  whatsapp_number: "",
  email: "info@namakost.com",
  address: "Alamat kost Anda",
  city: "Jakarta",
  hero_headline: "Kost Modern untuk Hunian Anda",
  hero_subtitle:
    "Hunian nyaman dengan fasilitas lengkap, lokasi strategis, dan harga terjangkau.",
  hero_image_url:
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80",
  whatsapp_greeting: "Halo, saya tertarik dengan kost Anda. Bisa info lebih lanjut?",
  latitude: "-6.2088",
  longitude: "106.8456",
  maps_embed_url: "",
  ga_measurement_id: "",
  logo_url: "",
  seo_description:
    "Kost modern dengan fasilitas lengkap, lokasi strategis, dan harga terjangkau.",
  instagram_url: "",
  facebook_url: "",
  tiktok_url: "",
};

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const { createClient } = await import("./supabase/server");
    const supabase = await createClient();
    const { data } = await supabase.from("site_settings").select("key, value");

    if (!data) return { ...DEFAULTS };

    const map: Record<string, string> = {};
    for (const row of data) {
      map[row.key] = row.value;
    }

    return {
      ...DEFAULTS,
      ...Object.fromEntries(
        Object.entries(map).filter(
          ([key]) => key in DEFAULTS
        )
      ),
    } as SiteSettings;
  } catch {
    return { ...DEFAULTS };
  }
}

export { DEFAULTS as SITE_SETTINGS_DEFAULTS };
