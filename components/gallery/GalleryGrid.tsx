"use client";

import { useState, useCallback } from "react";
import type { GalleryItem } from "@/lib/types";
import { getGalleryItems, BATCH_SIZE, type GalleryCategory } from "@/lib/gallery";
import GalleryItemCard from "./GalleryItem";
import FilterTabs from "./FilterTabs";
import LoadMoreButton from "./LoadMoreButton";
import PhotoLightbox from "./PhotoLightbox";
import VideoPlayer from "./VideoPlayer";

interface GalleryGridProps {
  initialItems: GalleryItem[];
  initialCount: number;
  initialCategory: GalleryCategory;
}

function GallerySkeleton() {
  return (
    <div className="px-5 lg:px-[120px]">
      <div className="max-w-[1440px] mx-auto">
        {/* Desktop skeleton */}
        <div className="hidden lg:flex flex-col gap-5">
          {[0, 1, 2].map((row) => (
            <div key={row} className="flex gap-5 h-[320px]">
              {[0, 1, 2].map((col) => (
                <div key={col} className="flex-1 rounded-2xl bg-surface-secondary animate-pulse" />
              ))}
            </div>
          ))}
        </div>
        {/* Mobile skeleton */}
        <div className="lg:hidden flex flex-col gap-3">
          <div className="h-[220px] rounded-xl bg-surface-secondary animate-pulse" />
          <div className="flex gap-3">
            <div className="flex-1 h-[170px] rounded-xl bg-surface-secondary animate-pulse" />
            <div className="flex-1 h-[170px] rounded-xl bg-surface-secondary animate-pulse" />
          </div>
          <div className="flex gap-3">
            <div className="flex-1 h-[170px] rounded-xl bg-surface-secondary animate-pulse" />
            <div className="flex-1 h-[170px] rounded-xl bg-surface-secondary animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GalleryGrid({ initialItems, initialCount, initialCategory }: GalleryGridProps) {
  const [items, setItems] = useState<GalleryItem[]>(initialItems);
  const [totalCount, setTotalCount] = useState(initialCount);
  const [category, setCategory] = useState<GalleryCategory>(initialCategory);
  const [offset, setOffset] = useState(initialItems.length);
  const [isLoading, setIsLoading] = useState(false);
  const [isFilterLoading, setIsFilterLoading] = useState(false);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Video player state
  const [videoItem, setVideoItem] = useState<GalleryItem | null>(null);

  const photos = items.filter((i) => i.media_type !== "video");

  const handleFilterChange = useCallback(async (newCategory: GalleryCategory) => {
    setCategory(newCategory);
    setIsFilterLoading(true);
    const result = await getGalleryItems(newCategory, 0, BATCH_SIZE);
    setItems(result.items);
    setTotalCount(result.count);
    setOffset(result.items.length);
    setIsFilterLoading(false);
  }, []);

  const handleLoadMore = useCallback(async () => {
    setIsLoading(true);
    const result = await getGalleryItems(category, offset, BATCH_SIZE);
    setItems((prev) => [...prev, ...result.items]);
    setOffset((prev) => prev + result.items.length);
    if (result.count > 0) setTotalCount(result.count);
    setIsLoading(false);
  }, [category, offset]);

  const handleItemClick = useCallback(
    (item: GalleryItem) => {
      if (item.media_type === "video") {
        setVideoItem(item);
      } else {
        const photoIndex = photos.findIndex((p) => p.id === item.id);
        if (photoIndex >= 0) {
          setLightboxIndex(photoIndex);
          setLightboxOpen(true);
        }
      }
    },
    [photos]
  );

  // Build desktop rows
  function buildDesktopRows(items: GalleryItem[]) {
    const rows: { items: GalleryItem[]; hasFeatured: boolean }[] = [];
    let i = 0;

    while (i < items.length) {
      const current = items[i];
      if (current.is_featured && current.media_type === "video" && i + 1 < items.length) {
        // Featured video takes 2 cols + 1 regular item
        rows.push({ items: [current, items[i + 1]], hasFeatured: true });
        i += 2;
      } else {
        // Regular row: up to 3 items
        const rowItems = items.slice(i, i + 3);
        rows.push({ items: rowItems, hasFeatured: false });
        i += rowItems.length;
      }
    }

    return rows;
  }

  // Build mobile rows
  function buildMobileRows(items: GalleryItem[]) {
    const rows: { items: GalleryItem[]; type: "full" | "pair" }[] = [];
    let i = 0;

    while (i < items.length) {
      const current = items[i];
      if (current.is_featured && current.media_type === "video") {
        rows.push({ items: [current], type: "full" });
        i += 1;
      } else if (i + 1 < items.length) {
        rows.push({ items: [items[i], items[i + 1]], type: "pair" });
        i += 2;
      } else {
        rows.push({ items: [current], type: "full" });
        i += 1;
      }
    }

    return rows;
  }

  if (isFilterLoading) {
    return (
      <>
        <FilterTabs activeCategory={category} onFilterChange={handleFilterChange} />
        <GallerySkeleton />
      </>
    );
  }

  const desktopRows = buildDesktopRows(items);
  const mobileRows = buildMobileRows(items);

  return (
    <>
      <FilterTabs activeCategory={category} onFilterChange={handleFilterChange} />

      <div className="px-5 lg:px-[120px] pb-12 lg:pb-20">
        <div className="max-w-[1440px] mx-auto">
          {/* Desktop grid */}
          <div className="hidden lg:flex flex-col gap-5">
            {desktopRows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="flex gap-5"
                style={{ height: row.hasFeatured ? 380 : 320 }}
              >
                {row.items.map((item, itemIndex) => (
                  <div
                    key={item.id}
                    className={
                      row.hasFeatured && itemIndex === 0 ? "flex-[2]" : "flex-1"
                    }
                  >
                    <GalleryItemCard
                      item={item}
                      isFeatured={row.hasFeatured && itemIndex === 0}
                      onClick={() => handleItemClick(item)}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Mobile grid */}
          <div className="lg:hidden flex flex-col gap-3">
            {mobileRows.map((row, rowIndex) => {
              if (row.type === "full") {
                return (
                  <div key={rowIndex} className="h-[220px]">
                    <GalleryItemCard
                      item={row.items[0]}
                      isFeatured={row.items[0].is_featured}
                      onClick={() => handleItemClick(row.items[0])}
                    />
                  </div>
                );
              }
              return (
                <div key={rowIndex} className="flex gap-3 h-[170px]">
                  {row.items.map((item) => (
                    <div key={item.id} className="flex-1">
                      <GalleryItemCard
                        item={item}
                        onClick={() => handleItemClick(item)}
                      />
                    </div>
                  ))}
                </div>
              );
            })}
          </div>

          {/* Load More */}
          {items.length > 0 && (
            <LoadMoreButton
              displayedCount={items.length}
              totalCount={totalCount}
              isLoading={isLoading}
              onLoadMore={handleLoadMore}
            />
          )}
        </div>
      </div>

      {/* Lightbox */}
      <PhotoLightbox
        photos={photos}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={setLightboxIndex}
      />

      {/* Video Player */}
      <VideoPlayer
        item={videoItem}
        isOpen={videoItem !== null}
        onClose={() => setVideoItem(null)}
      />
    </>
  );
}
