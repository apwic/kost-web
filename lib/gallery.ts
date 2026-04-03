import { createClient } from "@/lib/supabase/client";
import type { GalleryItem } from "@/lib/types";

export const BATCH_SIZE = 12;

export type GalleryCategory = "semua" | "kamar" | "fasilitas" | "lingkungan" | "video";

export const CATEGORIES: { label: string; value: GalleryCategory }[] = [
  { label: "Semua", value: "semua" },
  { label: "Kamar", value: "kamar" },
  { label: "Fasilitas", value: "fasilitas" },
  { label: "Lingkungan", value: "lingkungan" },
  { label: "Video", value: "video" },
];

export interface GalleryFetchResult {
  items: GalleryItem[];
  count: number;
}

export async function getGalleryItems(
  category: GalleryCategory = "semua",
  offset: number = 0,
  limit: number = BATCH_SIZE
): Promise<GalleryFetchResult> {
  try {
    const supabase = createClient();
    let query = supabase
      .from("gallery")
      .select("*", { count: "exact" })
      .order("sort_order", { ascending: true });

    if (category === "video") {
      query = query.eq("media_type", "video");
    } else if (category !== "semua") {
      query = query.eq("category", category);
    }

    query = query.range(offset, offset + limit - 1);

    const { data, count, error } = await query;

    if (error) throw error;

    return {
      items: (data as GalleryItem[]) ?? [],
      count: count ?? 0,
    };
  } catch {
    return { items: [], count: 0 };
  }
}
