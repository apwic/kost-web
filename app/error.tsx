"use client";

import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-surface-primary text-fg-primary flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-surface-secondary flex items-center justify-center">
            <AlertTriangle className="w-10 h-10 text-accent-primary" />
          </div>
        </div>
        <h1 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl text-fg-primary mb-4">
          Terjadi Kesalahan
        </h1>
        <p className="font-[family-name:var(--font-body)] text-fg-secondary mb-8 leading-relaxed">
          Maaf, terjadi kesalahan pada sistem kami. Silakan coba lagi atau
          kembali nanti.
        </p>
        <button
          onClick={() => reset()}
          className="inline-block bg-accent-primary text-fg-inverse font-[family-name:var(--font-body)] font-semibold px-8 py-3 rounded-xl hover:opacity-90 transition-opacity cursor-pointer"
        >
          Coba Lagi
        </button>
      </div>
    </div>
  );
}
