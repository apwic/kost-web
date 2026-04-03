import Image from "next/image";
import { Play } from "lucide-react";
import type { GalleryItem as GalleryItemType } from "@/lib/types";

interface GalleryItemProps {
  item: GalleryItemType;
  isFeatured?: boolean;
  onClick: () => void;
}

export default function GalleryItemCard({ item, isFeatured = false, onClick }: GalleryItemProps) {
  const isVideo = item.media_type === "video";
  const imgSrc = isVideo ? item.thumbnail_url : item.media_url;
  const alt = item.alt_text || item.title || `${item.category} - gallery item`;

  const sizes = isFeatured
    ? "(min-width: 1024px) 66vw, 100vw"
    : "(min-width: 1024px) 33vw, 50vw";

  return (
    <button
      type="button"
      onClick={onClick}
      className="relative w-full h-full rounded-xl lg:rounded-2xl overflow-hidden group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
      aria-label={isVideo ? `Play video: ${item.title}` : `View photo: ${item.title}`}
    >
      {imgSrc && (
        <Image
          src={imgSrc}
          alt={alt}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes={sizes}
          loading="lazy"
        />
      )}

      {isVideo && isFeatured ? (
        // Featured video overlay
        <div className="absolute inset-0 bg-black/25 flex flex-col items-center justify-center gap-1.5 lg:gap-2">
          <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-white flex items-center justify-center">
            <Play className="w-6 h-6 lg:w-8 lg:h-8 text-fg-primary fill-fg-primary" />
          </div>
          <span className="font-[family-name:var(--font-body)] text-[13px] lg:text-[15px] font-semibold text-white/90">
            {item.title}
          </span>
          {item.duration && (
            <span className="font-[family-name:var(--font-mono)] text-xs lg:text-[13px] text-white/60">
              {item.duration}
            </span>
          )}
        </div>
      ) : isVideo ? (
        // Small video pill
        <div className="absolute bottom-2.5 left-2.5 lg:bottom-4 lg:left-4 flex items-center gap-2 bg-black/65 rounded-full px-2.5 lg:px-3.5 py-1.5 lg:py-2">
          <Play className="w-3.5 lg:w-4 h-3.5 lg:h-4 text-white/90 fill-white/90" />
          <span className="font-[family-name:var(--font-body)] text-[10px] lg:text-xs font-semibold text-white/90">
            Video
          </span>
        </div>
      ) : (
        // Photo category tag
        <div className="absolute bottom-2.5 left-2.5 lg:bottom-4 lg:left-4 bg-black/65 rounded-full px-2.5 lg:px-3.5 py-1 lg:py-1.5">
          <span className="font-[family-name:var(--font-body)] text-[10px] lg:text-xs font-medium text-white/90">
            {item.title}
          </span>
        </div>
      )}
    </button>
  );
}
