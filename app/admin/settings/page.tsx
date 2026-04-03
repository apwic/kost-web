import { createClient } from "@/lib/supabase/server";
import SettingsForm from "@/components/admin/SettingsForm";

export const metadata = { title: "Pengaturan Situs - Admin KostKu" };

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("key, value");

  const settings: Record<string, string> = {};
  if (data) {
    for (const row of data) {
      settings[row.key] = row.value ?? "";
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-fg-primary mb-6">
        Pengaturan Situs
      </h1>
      <SettingsForm settings={settings} />
    </div>
  );
}
