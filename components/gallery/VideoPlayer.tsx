"use client";

import { useEffect, useCallback } from "react";
import { X } from "lucide-react";
import type { GalleryItem } from "@/lib/types";

interface VideoPlayerProps {
  item: GalleryItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoPlayer({ item, isOpen, onClose }: VideoPlayerProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !item) return null;

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4 lg:p-8"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 lg:top-6 lg:right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
        aria-label="Close video"
      >
        <X className="w-5 h-5 text-white" />
      </button>

      <div className="w-full max-w-4xl aspect-video">
        <video
          className="w-full h-full rounded-lg"
          controls
          poster={item.thumbnail_url || undefined}
          aria-label={item.alt_text || item.title}
        >
          <source src={item.media_url} type="video/mp4" />
          Browser Anda tidak mendukung pemutaran video.
        </video>
      </div>
    </div>
  );
}
