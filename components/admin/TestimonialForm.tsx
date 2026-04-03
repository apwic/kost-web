"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Testimonial } from "@/lib/types";
import { createTestimonial, updateTestimonial } from "@/app/admin/testimonials/actions";

interface Props {
  testimonial?: Testimonial;
}

export default function TestimonialForm({ testimonial }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const isEdit = !!testimonial;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const formData = new FormData(e.currentTarget);
      if (testimonial?.avatar_url) {
        formData.set("old_avatar_url", testimonial.avatar_url);
      }
      if (isEdit) {
        await updateTestimonial(testimonial.id, formData);
      } else {
        await createTestimonial(formData);
      }
      router.push("/admin/testimonials");
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
        <label className="block text-sm font-medium text-fg-primary mb-1">Nama</label>
        <input
          name="name"
          type="text"
          required
          defaultValue={testimonial?.name}
          className="w-full rounded-lg border border-surface-secondary px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-fg-primary mb-1">Peran</label>
        <input
          name="role"
          type="text"
          defaultValue={testimonial?.role}
          placeholder="cth: Mahasiswi, Karyawan"
          className="w-full rounded-lg border border-surface-secondary px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-fg-primary mb-1">Kutipan</label>
        <textarea
          name="quote"
          required
          rows={4}
          defaultValue={testimonial?.quote}
          className="w-full rounded-lg border border-surface-secondary px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-primary"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-fg-primary mb-1">Rating (1-5)</label>
          <input
            name="rating"
            type="number"
            min={1}
            max={5}
            defaultValue={testimonial?.rating ?? 5}
            className="w-full rounded-lg border border-surface-secondary px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-fg-primary mb-1">Urutan</label>
          <input
            name="sort_order"
            type="number"
            defaultValue={testimonial?.sort_order ?? 0}
            className="w-full rounded-lg border border-surface-secondary px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-primary"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-fg-primary mb-1">Foto Avatar</label>
        {testimonial?.avatar_url && (
          <p className="text-xs text-fg-muted mb-1">Sudah ada foto. Upload baru untuk mengganti.</p>
        )}
        <input
          name="avatar"
          type="file"
          accept="image/*"
          className="w-full text-sm text-fg-secondary file:mr-3 file:rounded-lg file:border-0 file:bg-surface-secondary file:px-3 file:py-2 file:text-sm file:font-medium"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          name="is_visible"
          type="checkbox"
          defaultChecked={testimonial?.is_visible ?? true}
          className="rounded border-surface-secondary"
        />
        <label className="text-sm text-fg-primary">Tampilkan di website</label>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="bg-accent-primary hover:bg-accent-primary/90 disabled:opacity-70 text-fg-inverse rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors"
        >
          {saving ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Tambah Testimoni"}
        </button>
        <Link href="/admin/testimonials" className="text-sm text-fg-muted hover:text-fg-primary">
          Kembali
        </Link>
      </div>
    </form>
  );
}
