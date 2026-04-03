"use client";

import { useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import type { GalleryItem } from "@/lib/types";
import { deleteGalleryItem } from "@/app/admin/gallery/actions";

const CATEGORY_LABELS: Record<string, string> = {
  kamar: "Kamar",
  fasilitas: "Fasilitas",
  lingkungan: "Lingkungan",
};

interface GalleryListProps {
  items: GalleryItem[];
}

export default function GalleryList({ items }: GalleryListProps) {
  const [isPending, startTransition] = useTransition();

  function handleDelete(id: string, title: string) {
    if (!confirm(`Yakin ingin menghapus "${title}"?`)) return;
    startTransition(async () => {
      await deleteGalleryItem(id);
    });
  }

  if (items.length === 0) {
    return (
      <p className="text-center text-fg-muted text-sm py-8">
        Belum ada media. Klik &quot;Tambah Media&quot; untuk menambahkan.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item) => {
        const thumbSrc =
          item.media_type === "video"
            ? item.thumbnail_url
            : item.media_url;

        return (
          <div
            key={item.id}
            className={`group relative rounded-xl overflow-hidden border border-surface-secondary ${
              isPending ? "opacity-50" : ""
            }`}
          >
            {/* Thumbnail */}
            <div className="relative aspect-square bg-surface-secondary">
              {thumbSrc ? (
                <Image
                  src={thumbSrc}
                  alt={item.alt_text || item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-fg-muted text-xs">
                  No image
                </div>
              )}

              {/* Media type badge */}
              {item.media_type === "video" && (
                <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-medium px-2 py-0.5 rounded">
                  Video
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-3 space-y-1.5">
              <p className="text-sm font-medium text-fg-primary truncate">
                {item.title}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-surface-secondary text-fg-secondary">
                  {CATEGORY_LABELS[item.category] || item.category}
                </span>
                {item.is_featured && (
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-accent-primary/10 text-accent-primary">
                    Unggulan
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Link
                  href={`/admin/gallery/${item.id}`}
                  className="text-xs text-accent-primary hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(item.id, item.title)}
                  disabled={isPending}
                  className="text-xs text-red-600 hover:underline disabled:opacity-50"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
