import Link from "next/link";
import GalleryForm from "@/components/admin/GalleryForm";

export default function NewGalleryItemPage() {
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
          Tambah Media Baru
        </h1>
        <GalleryForm />
      </div>
    </div>
  );
}
