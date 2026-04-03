"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import type { Room } from "@/lib/types";
import { createRoom, updateRoom } from "@/app/admin/rooms/actions";
import storage from "@/lib/storage";

interface RoomFormProps {
  room?: Room;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function RoomForm({ room }: RoomFormProps) {
  const isEdit = !!room;
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState(room?.name ?? "");
  const [slug, setSlug] = useState(room?.slug ?? "");
  const [imagePreview, setImagePreview] = useState<string | null>(
    room?.image_url ?? null
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleNameChange(value: string) {
    setName(value);
    if (!isEdit) {
      setSlug(slugify(value));
    }
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  async function handleSubmit(formData: FormData) {
    setError(null);

    startTransition(async () => {
      try {
        let imageUrl = "";

        // Upload image if a new file was selected
        if (imageFile) {
          const filePath = await storage.upload("rooms", "", imageFile);
          imageUrl = storage.getPublicUrl("rooms", filePath);
        }

        formData.set("image_url", imageUrl);
        formData.set("slug", slug);

        if (isEdit && room) {
          formData.set("existing_image_url", room.image_url ?? "");
          await updateRoom(room.id, formData);
        } else {
          await createRoom(formData);
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

      {/* Nama */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-fg-primary mb-1.5"
        >
          Nama Kamar
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={name}
          onChange={(e) => handleNameChange(e.target.value)}
          className="w-full border border-surface-secondary rounded-lg px-4 py-2.5 text-sm text-fg-primary bg-white focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary"
          placeholder="Contoh: Kamar Deluxe"
        />
      </div>

      {/* Slug */}
      <div>
        <label
          htmlFor="slug"
          className="block text-sm font-medium text-fg-primary mb-1.5"
        >
          Slug
        </label>
        <input
          type="text"
          id="slug"
          name="slug"
          required
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full border border-surface-secondary rounded-lg px-4 py-2.5 text-sm text-fg-secondary bg-surface-secondary/30 focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary"
          placeholder="kamar-deluxe"
        />
      </div>

      {/* Harga */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-fg-primary mb-1.5"
          >
            Harga (Rp)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            required
            min={0}
            defaultValue={room?.price ?? ""}
            className="w-full border border-surface-secondary rounded-lg px-4 py-2.5 text-sm text-fg-primary bg-white focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary"
            placeholder="1500000"
          />
        </div>
        <div>
          <label
            htmlFor="price_label"
            className="block text-sm font-medium text-fg-primary mb-1.5"
          >
            Label Harga
          </label>
          <input
            type="text"
            id="price_label"
            name="price_label"
            defaultValue={room?.price_label ?? ""}
            className="w-full border border-surface-secondary rounded-lg px-4 py-2.5 text-sm text-fg-primary bg-white focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary"
            placeholder="Rp 1.500.000 / bulan"
          />
        </div>
      </div>

      {/* Deskripsi */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-fg-primary mb-1.5"
        >
          Deskripsi
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={room?.description ?? ""}
          className="w-full border border-surface-secondary rounded-lg px-4 py-2.5 text-sm text-fg-primary bg-white focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary resize-y"
          placeholder="Deskripsi singkat tentang kamar..."
        />
      </div>

      {/* Fasilitas */}
      <div>
        <label
          htmlFor="amenities"
          className="block text-sm font-medium text-fg-primary mb-1.5"
        >
          Fasilitas (satu per baris)
        </label>
        <textarea
          id="amenities"
          name="amenities"
          rows={4}
          defaultValue={room?.amenities?.join("\n") ?? ""}
          className="w-full border border-surface-secondary rounded-lg px-4 py-2.5 text-sm text-fg-primary bg-white focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary resize-y"
          placeholder={"WiFi\nAC\nKamar Mandi Dalam\nLemari"}
        />
      </div>

      {/* Gambar */}
      <div>
        <label
          htmlFor="image"
          className="block text-sm font-medium text-fg-primary mb-1.5"
        >
          Gambar Kamar
        </label>
        {imagePreview && (
          <div className="mb-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imagePreview}
              alt="Preview"
              className="w-48 h-32 object-cover rounded-lg border border-surface-secondary"
            />
          </div>
        )}
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full text-sm text-fg-secondary file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-surface-secondary file:text-fg-primary hover:file:bg-surface-secondary/80 file:cursor-pointer"
        />
      </div>

      {/* Unit */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="total_units"
            className="block text-sm font-medium text-fg-primary mb-1.5"
          >
            Total Unit
          </label>
          <input
            type="number"
            id="total_units"
            name="total_units"
            required
            min={0}
            defaultValue={room?.total_units ?? 1}
            className="w-full border border-surface-secondary rounded-lg px-4 py-2.5 text-sm text-fg-primary bg-white focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary"
          />
        </div>
        <div>
          <label
            htmlFor="available_units"
            className="block text-sm font-medium text-fg-primary mb-1.5"
          >
            Unit Tersedia
          </label>
          <input
            type="number"
            id="available_units"
            name="available_units"
            required
            min={0}
            defaultValue={room?.available_units ?? 1}
            className="w-full border border-surface-secondary rounded-lg px-4 py-2.5 text-sm text-fg-primary bg-white focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary"
          />
        </div>
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
            defaultValue={room?.sort_order ?? 0}
            className="w-full border border-surface-secondary rounded-lg px-4 py-2.5 text-sm text-fg-primary bg-white focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary"
          />
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
              : "Tambah Kamar"}
        </button>
        <Link
          href="/admin/rooms"
          className="text-sm text-fg-muted hover:text-fg-secondary transition-colors"
        >
          Batal
        </Link>
      </div>
    </form>
  );
}
