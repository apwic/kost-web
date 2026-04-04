"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const SETTING_KEYS = [
  "site_name",
  "phone_number",
  "whatsapp_number",
  "email",
  "address",
  "city",
  "hero_headline",
  "hero_subtitle",
  "hero_image_url",
  "whatsapp_greeting",
  "latitude",
  "longitude",
  "maps_embed_url",
  "ga_measurement_id",
  "logo_url",
  "seo_description",
  "instagram_url",
  "facebook_url",
  "tiktok_url",
];

export async function updateSettings(formData: FormData) {
  const supabase = await createClient();

  const updates = SETTING_KEYS.map((key) => ({
    key,
    value: (formData.get(key) as string) ?? "",
    updated_at: new Date().toISOString(),
  }));

  for (const update of updates) {
    const { error } = await supabase
      .from("site_settings")
      .upsert(update, { onConflict: "key" });
    if (error) throw new Error(`Gagal menyimpan ${update.key}: ${error.message}`);
  }

  revalidatePath("/");
  revalidatePath("/gallery");
  revalidatePath("/admin/settings");
}
