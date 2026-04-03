"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import type { Testimonial } from "@/lib/types";
import { toggleTestimonialVisibility, deleteTestimonial } from "@/app/admin/testimonials/actions";

export default function TestimonialList({ testimonials }: { testimonials: Testimonial[] }) {
  const router = useRouter();

  async function handleToggle(id: string, currentVisible: boolean) {
    await toggleTestimonialVisibility(id, !currentVisible);
    router.refresh();
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Apakah Anda yakin ingin menghapus testimoni dari "${name}"?`)) return;
    await deleteTestimonial(id);
    router.refresh();
  }

  if (testimonials.length === 0) {
    return (
      <div className="bg-surface-secondary rounded-xl p-8 text-center">
        <p className="text-fg-muted">Belum ada testimoni.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {testimonials.map((t) => (
        <div
          key={t.id}
          className="bg-white rounded-xl border border-surface-secondary p-4 flex items-start gap-4"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-fg-primary text-sm">{t.name}</span>
              <span className="text-fg-muted text-xs">({t.role})</span>
              <div className="flex items-center gap-0.5 ml-auto">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${i < t.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
            </div>
            <p className="text-fg-secondary text-sm line-clamp-2">{t.quote}</p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleToggle(t.id, t.is_visible)}
              className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                t.is_visible
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {t.is_visible ? "Tampil" : "Sembunyi"}
            </button>
            <Link
              href={`/admin/testimonials/${t.id}`}
              className="text-xs text-accent-primary hover:underline"
            >
              Edit
            </Link>
            <button
              onClick={() => handleDelete(t.id, t.name)}
              className="text-xs text-red-500 hover:underline"
            >
              Hapus
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
