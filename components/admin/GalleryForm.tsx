"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import type { GalleryItem } from "@/lib/types";
import {
  createGalleryItem,
  updateGalleryItem,
} from "@/app/admin/gallery/actions";
import storage from "@/lib/storage";

interface GalleryFormProps {
  item?: GalleryItem;
}

export default function GalleryForm({ item }: GalleryFormProps) {
  const isEdit = !!item;
  const [isPending, startTransition] = useTransition();
  const [mediaType, setMediaType] = useState<string>(
    item?.media_type ?? "photo"
  );
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(
    item?.media_url ?? null
  );
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(
    item?.thumbnail_url ?? null
  );
  const [error, setError] = useState<string | null>(null);

  function handleMediaChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setMediaFile(file);
      if (file.type.startsWith("image/")) {
        setMediaPreview(URL.createObjectURL(file));
      } else {
        setMediaPreview(null);
      }
    }
  }

  function handleThumbnailChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  }

  async function handleSubmit(formData: FormData) {
    setError(null);

    startTransition(async () => {
      try {
        let mediaUrl = "";
        let thumbnailUrl = "";

        // Upload media file if selected
        if (mediaFile) {
          const filePath = await storage.upload("gallery", "", mediaFile);
          mediaUrl = storage.getPublicUrl("gallery", filePath);
        }

        // Upload thumbnail if selected (for videos)
        if (thumbnailFile) {
          const filePath = await storage.upload(
            "gallery",
            "thumbnails",
            thumbnailFile
          );
          thumbnailUrl = storage.getPublicUrl("gallery", filePath);
        }

        formData.set("media_url", mediaUrl);
        formData.set("thumbnail_url", thumbnailUrl);
        formData.set("media_type", mediaType);

        if (isEdit && item) {
          formData.set("existing_media_url", item.media_url ?? "");
          formData.set("existing_thumbnail_url", item.thumbnail_url ?? "");
          await updateGalleryItem(item.id, formData);
        } else {
          await createGalleryItem(formData);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Terjadi kesalahan"
        );
      }
    });
  }

  return (
    <form action={handleSubmit} className="space-y-6 max-w-2xl">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Judul */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-fg-primary mb-1.5"
        >
          Judul
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          defaultValue={item?.title ?? ""}
          className="w-full border border-surface-secondary rounded-lg px-4 py-2.5 text-sm text-fg-primary bg-white focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary"
          placeholder="Contoh: Kamar Deluxe Tipe A"
        />
      </div>

      {/* Kategori */}
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-fg-primary mb-1.5"
        >
          Kategori
        </label>
        <select
          id="category"
          name="category"
          required
          defaultValue={item?.category ?? "kamar"}
          className="w-full border border-surface-secondary rounded-lg px-4 py-2.5 text-sm text-fg-primary bg-white focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary"
        >
          <option value="kamar">Kamar</option>
          <option value="fasilitas">Fasilitas</option>
          <option value="lingkungan">Lingkungan</option>
        </select>
      </div>

      {/* Tipe Media */}
      <div>
        <span className="block text-sm font-medium text-fg-primary mb-2">
          Tipe Media
        </span>
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="media_type_radio"
              value="photo"
              checked={mediaType === "photo"}
              onChange={() => setMediaType("photo")}
              className="accent-accent-primary"
            />
            <span className="text-sm text-fg-primary">Foto</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="media_type_radio"
              value="video"
              checked={mediaType === "video"}
              onChange={() => setMediaType("video")}
              className="accent-accent-primary"
            />
            <span className="text-sm text-fg-primary">Video</span>
          </label>
        </div>
      </div>

      {/* File Upload */}
      <div>
        <label
          htmlFor="media_file"
          className="block text-sm font-medium text-fg-primary mb-1.5"
        >
          {mediaType === "photo" ? "File Foto" : "File Video"}
        </label>
        {mediaPreview && mediaType === "photo" && (
          <div className="mb-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={mediaPreview}
              alt="Preview"
              className="w-48 h-32 object-cover rounded-lg border border-surface-secondary"
            />
          </div>
        )}
        <input
          type="file"
          id="media_file"
          accept={mediaType === "photo" ? "image/*" : "video/*"}
          onChange={handleMediaChange}
          className="w-full text-sm text-fg-secondary file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-surface-secondary file:text-fg-primary hover:file:bg-surface-secondary/80 file:cursor-pointer"
        />
      </div>

      {/* Thumbnail (for videos) */}
      {mediaType === "video" && (
        <div>
          <label
            htmlFor="thumbnail_file"
            className="block text-sm font-medium text-fg-primary mb-1.5"
          >
            Thumbnail Video
          </label>
          {thumbnailPreview && (
            <div className="mb-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={thumbnailPreview}
                alt="Thumbnail preview"
                className="w-48 h-32 object-cover rounded-lg border border-surface-secondary"
              />
            </div>
          )}
          <input
            type="file"
            id="thumbnail_file"
            accept="image/*"
            onChange={handleThumbnailChange}
            className="w-full text-sm text-fg-secondary file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-surface-secondary file:text-fg-primary hover:file:bg-surface-secondary/80 file:cursor-pointer"
          />
        </div>
      )}

      {/* Alt Text */}
      <div>
        <label
          htmlFor="alt_text"
          className="block text-sm font-medium text-fg-primary mb-1.5"
        >
          Teks Alternatif
        </label>
        <input
          type="text"
          id="alt_text"
          name="alt_text"
          defaultValue={item?.alt_text ?? ""}
          className="w-full border border-surface-secondary rounded-lg px-4 py-2.5 text-sm text-fg-primary bg-white focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary"
          placeholder="Deskripsi singkat untuk aksesibilitas"
        />
      </div>

      {/* Sort Order & Featured */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="sort_order"
            className="block text-sm font-medium text-fg-primary mb-1.5"
          >
            Urutan
          </label>
          <input
            type="number"
            id="sort_order"
            name="sort_order"
            required
            min={0}
            defaultValue={item?.sort_order ?? 0}
            className="w-full border border-surface-secondary rounded-lg px-4 py-2.5 text-sm text-fg-primary bg-white focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary"
          />
        </div>
        <div className="flex items-end pb-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="is_featured"
              defaultChecked={item?.is_featured ?? false}
              className="w-4 h-4 accent-accent-primary rounded"
            />
            <span className="text-sm text-fg-primary">
              Tampilkan sebagai unggulan
            </span>
          </label>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-4">
        <button
          type="submit"
          disabled={isPending}
          className="bg-accent-primary text-fg-inverse px-6 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-wait"
        >
          {isPending
            ? "Menyimpan..."
            : isEdit
              ? "Simpan Perubahan"
              : "Tambah Media"}
        </button>
        <Link
          href="/admin/gallery"
          className="text-sm text-fg-muted hover:text-fg-secondary transition-colors"
        >
          Batal
        </Link>
      </div>
    </form>
  );
}
