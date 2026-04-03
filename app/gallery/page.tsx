import Link from "next/link";
import { ArrowLeft, Images } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export const metadata = {
  title: "Galeri - KostKu",
  description: "Foto dan video kost kami.",
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-surface-primary text-fg-primary">
      <Navbar />
      <section className="py-20 px-6 lg:px-[120px]">
        <div className="max-w-[1440px] mx-auto flex flex-col items-center justify-center min-h-[60vh] gap-6">
          <div className="w-16 h-16 rounded-full bg-surface-secondary flex items-center justify-center">
            <Images className="w-8 h-8 text-fg-muted" />
          </div>
          <h1 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-fg-primary text-center">
            Segera Hadir
          </h1>
          <p className="font-[family-name:var(--font-body)] text-fg-secondary text-center max-w-md">
            Halaman galeri lengkap dengan foto dan video tur sedang dalam pengembangan.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-accent-primary hover:bg-accent-primary/90 text-fg-inverse rounded-full px-6 py-3 font-[family-name:var(--font-body)] text-sm font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Beranda
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
