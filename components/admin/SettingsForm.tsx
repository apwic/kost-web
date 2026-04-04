"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateSettings } from "@/app/admin/settings/actions";

interface Props {
  settings: Record<string, string>;
}

const FIELD_SECTIONS = [
  {
    title: "Branding",
    fields: [
      { key: "site_name", label: "Nama Situs", type: "text" },
      {
        key: "logo_url",
        label: "URL Logo",
        type: "text",
        hint: "URL gambar logo (upload ke Storage, lalu tempel URL-nya di sini)",
      },
    ],
  },
  {
    title: "Kontak",
    fields: [
      { key: "phone_number", label: "Nomor Telepon", type: "text" },
      {
        key: "whatsapp_number",
        label: "Nomor WhatsApp",
        type: "text",
        hint: "Format: 6281234567890 (tanpa +)",
      },
      { key: "email", label: "Email", type: "email" },
      { key: "address", label: "Alamat", type: "text" },
      { key: "city", label: "Kota", type: "text", hint: "Digunakan untuk SEO metadata" },
    ],
  },
  {
    title: "Hero Section",
    fields: [
      { key: "hero_headline", label: "Headline Hero", type: "text" },
      { key: "hero_subtitle", label: "Subtitle Hero", type: "textarea" },
      {
        key: "hero_image_url",
        label: "URL Gambar Hero",
        type: "text",
        hint: "URL lengkap gambar untuk hero section",
      },
      {
        key: "whatsapp_greeting",
        label: "Pesan WhatsApp",
        type: "textarea",
        hint: "Pesan default saat pengunjung klik tombol WhatsApp",
      },
    ],
  },
  {
    title: "Media Sosial",
    fields: [
      { key: "instagram_url", label: "Instagram URL", type: "text", hint: "Contoh: https://instagram.com/namakost" },
      { key: "facebook_url", label: "Facebook URL", type: "text", hint: "Contoh: https://facebook.com/namakost" },
      { key: "tiktok_url", label: "TikTok URL", type: "text", hint: "Contoh: https://tiktok.com/@namakost" },
    ],
  },
  {
    title: "SEO",
    fields: [
      {
        key: "seo_description",
        label: "Deskripsi SEO",
        type: "textarea",
        hint: "Deskripsi singkat untuk mesin pencari (maks 160 karakter)",
      },
    ],
  },
  {
    title: "Lokasi & Peta",
    fields: [
      { key: "latitude", label: "Latitude", type: "text" },
      { key: "longitude", label: "Longitude", type: "text" },
      {
        key: "maps_embed_url",
        label: "Google Maps Embed URL",
        type: "text",
        hint: "URL embed dari Google Maps untuk menampilkan peta",
      },
    ],
  },
  {
    title: "Lanjutan",
    fields: [
      {
        key: "ga_measurement_id",
        label: "Google Analytics Measurement ID",
        type: "text",
        hint: "Contoh: G-XXXXXXXXXX",
      },
    ],
  },
];

export default function SettingsForm({ settings }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    setError("");

    try {
      const formData = new FormData(e.currentTarget);
      await updateSettings(formData);
      setSuccess(true);
      router.refresh();
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-3">
          Pengaturan berhasil disimpan!
        </div>
      )}

      {FIELD_SECTIONS.map((section) => (
        <fieldset key={section.title} className="space-y-4">
          <legend className="text-sm font-semibold text-fg-primary border-b border-surface-secondary pb-2 w-full">
            {section.title}
          </legend>
          {section.fields.map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-fg-primary mb-1">
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  name={field.key}
                  rows={3}
                  defaultValue={settings[field.key] ?? ""}
                  className="w-full rounded-lg border border-surface-secondary px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-primary"
                />
              ) : (
                <input
                  name={field.key}
                  type={field.type}
                  defaultValue={settings[field.key] ?? ""}
                  className="w-full rounded-lg border border-surface-secondary px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-primary"
                />
              )}
              {field.hint && (
                <p className="text-xs text-fg-muted mt-1">{field.hint}</p>
              )}
            </div>
          ))}
        </fieldset>
      ))}

      <div className="pt-2">
        <button
          type="submit"
          disabled={saving}
          className="bg-accent-primary hover:bg-accent-primary/90 disabled:opacity-70 text-fg-inverse rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors"
        >
          {saving ? "Menyimpan..." : "Simpan Pengaturan"}
        </button>
      </div>
    </form>
  );
}
