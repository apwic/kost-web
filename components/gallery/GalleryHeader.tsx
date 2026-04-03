import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";

export default function GalleryHeader() {
  return (
    <div className="bg-surface-primary pt-8 lg:pt-[60px] pb-6 lg:pb-10 px-5 lg:px-[120px]">
      <div className="max-w-[1440px] mx-auto">
        {/* Desktop breadcrumb */}
        <nav className="hidden lg:flex items-center gap-2 mb-6" aria-label="Breadcrumb">
          <Link
            href="/"
            className="font-[family-name:var(--font-body)] text-sm text-fg-muted hover:text-fg-secondary transition-colors"
          >
            Beranda
          </Link>
          <span className="text-fg-muted text-sm">&gt;</span>
          <span className="font-[family-name:var(--font-body)] text-sm text-fg-secondary">
            Galeri
          </span>
        </nav>

        {/* Mobile breadcrumb */}
        <nav className="flex lg:hidden items-center gap-1.5 mb-4" aria-label="Breadcrumb">
          <Home className="w-3.5 h-3.5 text-fg-muted" />
          <Link
            href="/"
            className="font-[family-name:var(--font-body)] text-xs text-fg-muted hover:text-fg-secondary transition-colors"
          >
            Beranda
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-fg-muted" />
          <span className="font-[family-name:var(--font-body)] text-xs text-fg-secondary">
            Galeri
          </span>
        </nav>

        {/* Title */}
        <h1 className="font-[family-name:var(--font-heading)] text-[28px] lg:text-5xl font-bold text-fg-primary text-center mb-3 lg:mb-4">
          Galeri Foto & Video
        </h1>

        {/* Subtitle */}
        <p className="font-[family-name:var(--font-body)] text-sm lg:text-lg text-fg-secondary text-center max-w-[640px] mx-auto">
          Jelajahi semua foto dan video tur kost kami untuk melihat kenyamanan yang kami tawarkan.
        </p>
      </div>
    </div>
  );
}
