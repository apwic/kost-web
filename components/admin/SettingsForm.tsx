"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateSettings } from "@/app/admin/settings/actions";

interface Props {
  settings: Record<string, string>;
}

const FIELDS = [
  { key: "site_name", label: "Nama Situs", type: "text" },
  { key: "phone_number", label: "Nomor Telepon", type: "text" },
  { key: "whatsapp_number", label: "Nomor WhatsApp", type: "text", hint: "Format: 6281234567890 (tanpa +)" },
  { key: "email", label: "Email", type: "email" },
  { key: "address", label: "Alamat", type: "text" },
  { key: "hero_headline", label: "Headline Hero", type: "text" },
  { key: "hero_subtitle", label: "Subtitle Hero", type: "textarea" },
  { key: "hero_image_url", label: "URL Gambar Hero", type: "text", hint: "URL lengkap gambar untuk hero section" },
  { key: "whatsapp_greeting", label: "Pesan WhatsApp", type: "textarea", hint: "Pesan default saat pengunjung klik tombol WhatsApp" },
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
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
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

      {FIELDS.map((field) => (
        <div key={field.key}>
          <label className="block text-sm font-medium text-fg-primary mb-1">{field.label}</label>
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
          {field.hint && <p className="text-xs text-fg-muted mt-1">{field.hint}</p>}
        </div>
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
