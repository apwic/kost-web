"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { CATEGORIES, type GalleryCategory } from "@/lib/gallery";

interface FilterTabsProps {
  activeCategory: GalleryCategory;
  onFilterChange: (category: GalleryCategory) => void;
}

export default function FilterTabs({ activeCategory, onFilterChange }: FilterTabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleClick(category: GalleryCategory) {
    onFilterChange(category);
    const params = new URLSearchParams(searchParams.toString());
    if (category === "semua") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    const qs = params.toString();
    router.replace(qs ? `/gallery?${qs}` : "/gallery", { scroll: false });
  }

  return (
    <div className="bg-surface-primary px-5 lg:px-[120px] pb-6 lg:pb-10">
      <div className="max-w-[1440px] mx-auto">
        <div
          role="tablist"
          className="flex lg:justify-start justify-center gap-2 lg:gap-3 overflow-x-auto scrollbar-hide"
        >
          {CATEGORIES.map((cat) => {
            const active = cat.value === activeCategory;
            return (
              <button
                key={cat.value}
                role="tab"
                aria-selected={active}
                onClick={() => handleClick(cat.value)}
                className={`shrink-0 rounded-full font-[family-name:var(--font-body)] text-[13px] lg:text-sm font-medium transition-colors ${
                  active
                    ? "bg-accent-primary text-fg-inverse font-semibold"
                    : "bg-surface-secondary text-fg-secondary hover:text-fg-primary"
                } px-4 lg:px-6 py-2 lg:py-2.5`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
