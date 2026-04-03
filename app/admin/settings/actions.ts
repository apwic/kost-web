"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const SETTING_KEYS = [
  "site_name",
  "phone_number",
  "whatsapp_number",
  "email",
  "address",
  "hero_headline",
  "hero_subtitle",
  "hero_image_url",
  "whatsapp_greeting",
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
  revalidatePath("/admin/settings");
}
