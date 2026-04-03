"use client";

export default function HeroScrollButton() {
  return (
    <button
      onClick={() =>
        document.querySelector("#rooms")?.scrollIntoView({ behavior: "smooth" })
      }
      className="mt-8 bg-accent-primary text-fg-inverse rounded-full px-9 py-4 font-[family-name:var(--font-body)] font-medium hover:bg-accent-primary/90 transition-colors"
    >
      Lihat Kamar
    </button>
  );
}
