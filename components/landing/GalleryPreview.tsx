import Image from "next/image";
import Link from "next/link";
import { Play, Images, ArrowRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { createClient } from "@/lib/supabase/server";
import type { GalleryItem } from "@/lib/types";

const fallbackGallery: GalleryItem[] = [
  {
    id: "1",
    title: "Kamar Standard",
    media_type: "video",
    media_url: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800",
    thumbnail_url: "",
    category: "kamar",
    duration: "2:45",
    is_featured: true,
    sort_order: 1,
    created_at: "",
  },
  {
    id: "2",
    title: "Dapur Bersama",
    media_type: "photo",
    media_url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600",
    thumbnail_url: "",
    category: "fasilitas",
    duration: "",
    is_featured: false,
    sort_order: 2,
    created_at: "",
  },
  {
    id: "3",
    title: "Kamar Mandi",
    media_type: "photo",
    media_url: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600",
    thumbnail_url: "",
    category: "fasilitas",
    duration: "",
    is_featured: false,
    sort_order: 3,
    created_at: "",
  },
  {
    id: "4",
    title: "Lingkungan Kost",
    media_type: "video",
    media_url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600",
    thumbnail_url: "",
    category: "lingkungan",
    duration: "4:12",
    is_featured: false,
    sort_order: 4,
    created_at: "",
  },
  {
    id: "5",
    title: "Tampak Depan",
    media_type: "photo",
    media_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600",
    thumbnail_url: "",
    category: "lingkungan",
    duration: "",
    is_featured: false,
    sort_order: 5,
    created_at: "",
  },
];

export default async function GalleryPreview() {
  let items: GalleryItem[] = fallbackGallery;

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("gallery")
      .select("*")
      .order("sort_order")
      .limit(5);
    if (data && data.length > 0) items = data;
  } catch {
    // Use fallback
  }

  const featured = items[0];
  const rest = items.slice(1, 5);

  return (
    <section id="gallery" className="bg-surface-primary py-20 px-6 lg:px-[120px]">
      <div className="max-w-[1440px] mx-auto">
        <SectionHeader
          tag="Galeri"
          title="Lihat Suasana Kost Kami"
          subtitle="Intip kenyamanan kost kami melalui foto dan video tur berikut."
        />

        {/* Desktop bento grid */}
        <div className="hidden lg:grid grid-cols-2 gap-4 h-[500px] mb-8">
          {/* Left: large featured item */}
          <div className="relative rounded-2xl overflow-hidden">
            <Image
              src={featured.media_url}
              alt={featured.title}
              fill
              className="object-cover"
            />
            {featured.media_type === "video" && (
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-2">
                <div className="w-[72px] h-[72px] rounded-full bg-white/90 flex items-center justify-center">
                  <Play className="w-8 h-8 text-fg-primary fill-fg-primary" />
                </div>
                <span className="font-[family-name:var(--font-body)] text-sm font-semibold text-white">
                  Video Tur Kamar
                </span>
              </div>
            )}
          </div>

          {/* Right: 2x2 grid */}
          <div className="grid grid-rows-2 gap-4">
            <div className="grid grid-cols-2 gap-4">
              {rest.slice(0, 2).map((item) => (
                <div key={item.id} className="relative rounded-2xl overflow-hidden">
                  <Image
                    src={item.media_url}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  {item.media_type === "video" && (
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/70 rounded-full px-3 py-1.5">
                      <Play className="w-3.5 h-3.5 text-white fill-white" />
                      <span className="text-xs font-semibold text-white">Video</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {rest[2] && (
                <div className="relative rounded-2xl overflow-hidden">
                  <Image
                    src={rest[2].media_url}
                    alt={rest[2].title}
                    fill
                    className="object-cover"
                  />
                  {rest[2].media_type === "video" && (
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/70 rounded-full px-3 py-1.5">
                      <Play className="w-3.5 h-3.5 text-white fill-white" />
                      <span className="text-xs font-semibold text-white">Video</span>
                    </div>
                  )}
                </div>
              )}
              {/* "+20 Foto & Video" card */}
              <div className="relative rounded-2xl overflow-hidden">
                {rest[3] && (
                  <Image
                    src={rest[3].media_url}
                    alt="More"
                    fill
                    className="object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-surface-inverse/70 flex flex-col items-center justify-center gap-1">
                  <span className="font-[family-name:var(--font-heading)] text-4xl font-bold text-fg-inverse">
                    +20
                  </span>
                  <span className="font-[family-name:var(--font-body)] text-sm text-white/70">
                    Foto & Video
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile grid */}
        <div className="lg:hidden grid grid-cols-2 gap-3 mb-6">
          {items.slice(0, 4).map((item, i) => (
            <div
              key={item.id}
              className={`relative rounded-xl overflow-hidden ${i === 0 ? "col-span-2 h-48" : "h-36"}`}
            >
              <Image
                src={item.media_url}
                alt={item.title}
                fill
                className="object-cover"
              />
              {item.media_type === "video" && (
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-1">
                  <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                    <Play className="w-5 h-5 text-fg-primary fill-fg-primary" />
                  </div>
                  {i === 0 && (
                    <span className="text-xs font-semibold text-white">Video Tur Kamar</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* See all button */}
        <div className="flex justify-center">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 bg-surface-secondary hover:bg-surface-secondary/80 rounded-full px-6 py-3.5 font-[family-name:var(--font-body)] text-sm font-semibold text-fg-secondary transition-colors"
          >
            <Images className="w-[18px] h-[18px]" />
            Lihat Semua Foto & Video
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
