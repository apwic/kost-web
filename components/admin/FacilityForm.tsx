"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import type { Facility } from "@/lib/types";
import { createFacility, updateFacility } from "@/app/admin/facilities/actions";

function getIcon(name: string) {
  const pascalCase = name
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (LucideIcons as any)[pascalCase] || null;
}

export default function FacilityForm({ facility }: { facility?: Facility }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [iconName, setIconName] = useState(facility?.icon_name ?? "");
  const isEdit = !!facility;

  const PreviewIcon = getIcon(iconName);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const formData = new FormData(e.currentTarget);
      if (isEdit) {
        await updateFacility(facility.id, formData);
      } else {
        await createFacility(formData);
      }
      router.push("/admin/facilities");
      router.refresh();
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

      <div>
        <label className="block text-sm font-medium text-fg-primary mb-1">Nama Fasilitas</label>
        <input
          name="name"
          type="text"
          required
          defaultValue={facility?.name}
          className="w-full rounded-lg border border-surface-secondary px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-fg-primary mb-1">Nama Ikon (Lucide)</label>
        <div className="flex items-center gap-3">
          <input
            name="icon_name"
            type="text"
            required
            value={iconName}
            onChange={(e) => setIconName(e.target.value)}
            placeholder="cth: wifi, car, shield-check"
            className="flex-1 rounded-lg border border-surface-secondary px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-primary"
          />
          <div className="w-10 h-10 rounded-lg bg-surface-secondary flex items-center justify-center shrink-0">
            {PreviewIcon ? (
              <PreviewIcon className="w-5 h-5 text-accent-primary" />
            ) : (
              <span className="text-xs text-fg-muted">?</span>
            )}
          </div>
        </div>
        <p className="text-xs text-fg-muted mt-1">
          Ikon yang tersedia: wifi, wind, car, shirt, cooking-pot, shield-check, tv, snowflake, lamp
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-fg-primary mb-1">Deskripsi</label>
        <textarea
          name="description"
          rows={3}
          defaultValue={facility?.description}
          className="w-full rounded-lg border border-surface-secondary px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-fg-primary mb-1">Urutan</label>
        <input
          name="sort_order"
          type="number"
          defaultValue={facility?.sort_order ?? 0}
          className="w-32 rounded-lg border border-surface-secondary px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-primary"
        />
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="bg-accent-primary hover:bg-accent-primary/90 disabled:opacity-70 text-fg-inverse rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors"
        >
          {saving ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Tambah Fasilitas"}
        </button>
        <Link href="/admin/facilities" className="text-sm text-fg-muted hover:text-fg-primary">
          Kembali
        </Link>
      </div>
    </form>
  );
}
