import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { GalleryItem } from "@/lib/types";
import GalleryForm from "@/components/admin/GalleryForm";

interface EditGalleryItemPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditGalleryItemPage({
  params,
}: EditGalleryItemPageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    notFound();
  }

  const item = data as GalleryItem;

  return (
    <div className="min-h-screen bg-surface-primary">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <Link
          href="/admin/gallery"
          className="text-sm text-fg-muted hover:text-fg-secondary transition-colors"
        >
          &larr; Kembali ke Galeri
        </Link>
        <h1 className="text-2xl font-bold text-fg-primary mt-2 mb-8">
          Edit Media: {item.title}
        </h1>
        <GalleryForm item={item} />
      </div>
    </div>
  );
}
