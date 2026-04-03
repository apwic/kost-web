"use client";

import { useEffect, useCallback } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import type { GalleryItem } from "@/lib/types";

interface PhotoLightboxProps {
  photos: GalleryItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

export default function PhotoLightbox({
  photos,
  currentIndex,
  isOpen,
  onClose,
  onIndexChange,
}: PhotoLightboxProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const slides = photos.map((p) => ({
    src: p.media_url,
    alt: p.alt_text || p.title,
    title: p.title,
  }));

  const handleView = useCallback(
    ({ index }: { index: number }) => {
      onIndexChange(index);
    },
    [onIndexChange]
  );

  if (!isOpen) return null;

  return (
    <Lightbox
      open={isOpen}
      close={onClose}
      slides={slides}
      index={currentIndex}
      on={{ view: handleView }}
      styles={{
        container: { backgroundColor: "rgba(0, 0, 0, 0.92)" },
      }}
      carousel={{ finite: false }}
      controller={{ closeOnBackdropClick: true }}
    />
  );
}
