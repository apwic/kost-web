"use client";

import { ChevronDown, Loader2 } from "lucide-react";

interface LoadMoreButtonProps {
  displayedCount: number;
  totalCount: number;
  isLoading: boolean;
  onLoadMore: () => void;
}

export default function LoadMoreButton({
  displayedCount,
  totalCount,
  isLoading,
  onLoadMore,
}: LoadMoreButtonProps) {
  const allLoaded = displayedCount >= totalCount;

  return (
    <div className="flex flex-col items-center gap-4 py-8 lg:py-12">
      <p
        className="font-[family-name:var(--font-body)] text-xs lg:text-sm text-fg-muted"
        aria-live="polite"
      >
        Menampilkan {displayedCount} dari {totalCount} foto & video
      </p>

      {allLoaded ? (
        <p className="font-[family-name:var(--font-body)] text-xs lg:text-sm text-fg-muted">
          Semua item telah dimuat
        </p>
      ) : (
        <button
          onClick={onLoadMore}
          disabled={isLoading}
          className="inline-flex items-center gap-2 bg-accent-primary hover:bg-accent-primary/90 disabled:opacity-70 text-fg-inverse rounded-full px-8 lg:px-10 py-3 lg:py-3.5 font-[family-name:var(--font-body)] text-[13px] lg:text-sm font-semibold transition-colors"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-3.5 lg:w-4 h-3.5 lg:h-4 animate-spin" />
              Memuat...
            </>
          ) : (
            <>
              Muat Lebih Banyak
              <ChevronDown className="w-3.5 lg:w-4 h-3.5 lg:h-4" />
            </>
          )}
        </button>
      )}
    </div>
  );
}
