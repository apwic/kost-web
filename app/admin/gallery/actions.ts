"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function extractStoragePath(url: string, bucket: string): string | null {
  const marker = `/storage/v1/object/public/${bucket}/`;
  const idx = url.indexOf(marker);
  if (idx !== -1) {
    return url.substring(idx + marker.length);
  }
  return null;
}

export async function createGalleryItem(formData: FormData) {
  const supabase = await createClient();

  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const mediaType = formData.get("media_type") as string;
  const mediaUrl = formData.get("media_url") as string;
  const thumbnailUrl = formData.get("thumbnail_url") as string;
  const altText = formData.get("alt_text") as string;
  const sortOrder = Number(formData.get("sort_order"));
  const isFeatured = formData.get("is_featured") === "on";

  const { error } = await supabase.from("gallery").insert({
    title,
    category,
    media_type: mediaType,
    media_url: mediaUrl || null,
    thumbnail_url: thumbnailUrl || null,
    alt_text: altText || null,
    sort_order: sortOrder,
    is_featured: isFeatured,
  });

  if (error) {
    throw new Error(`Gagal menambah media: ${error.message}`);
  }

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  revalidatePath("/");
  redirect("/admin/gallery");
}

export async function updateGalleryItem(id: string, formData: FormData) {
  const supabase = await createClient();

  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const mediaType = formData.get("media_type") as string;
  const mediaUrl = formData.get("media_url") as string;
  const thumbnailUrl = formData.get("thumbnail_url") as string;
  const existingMediaUrl = formData.get("existing_media_url") as string;
  const existingThumbnailUrl = formData.get("existing_thumbnail_url") as string;
  const altText = formData.get("alt_text") as string;
  const sortOrder = Number(formData.get("sort_order"));
  const isFeatured = formData.get("is_featured") === "on";

  const finalMediaUrl = mediaUrl || existingMediaUrl || null;
  const finalThumbnailUrl = thumbnailUrl || existingThumbnailUrl || null;

  // Clean up old files if new ones were uploaded
  const pathsToRemove: string[] = [];
  if (mediaUrl && existingMediaUrl) {
    const path = extractStoragePath(existingMediaUrl, "gallery");
    if (path) pathsToRemove.push(path);
  }
  if (thumbnailUrl && existingThumbnailUrl) {
    const path = extractStoragePath(existingThumbnailUrl, "gallery");
    if (path) pathsToRemove.push(path);
  }
  if (pathsToRemove.length > 0) {
    await supabase.storage.from("gallery").remove(pathsToRemove);
  }

  const { error } = await supabase
    .from("gallery")
    .update({
      title,
      category,
      media_type: mediaType,
      media_url: finalMediaUrl,
      thumbnail_url: finalThumbnailUrl,
      alt_text: altText || null,
      sort_order: sortOrder,
      is_featured: isFeatured,
    })
    .eq("id", id);

  if (error) {
    throw new Error(`Gagal memperbarui media: ${error.message}`);
  }

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  revalidatePath("/");
  redirect("/admin/gallery");
}

export async function deleteGalleryItem(id: string) {
  const supabase = await createClient();

  // Fetch item to clean up storage
  const { data: item } = await supabase
    .from("gallery")
    .select("media_url, thumbnail_url")
    .eq("id", id)
    .single();

  if (item) {
    const pathsToRemove: string[] = [];
    if (item.media_url) {
      const path = extractStoragePath(item.media_url, "gallery");
      if (path) pathsToRemove.push(path);
    }
    if (item.thumbnail_url) {
      const path = extractStoragePath(item.thumbnail_url, "gallery");
      if (path) pathsToRemove.push(path);
    }
    if (pathsToRemove.length > 0) {
      await supabase.storage.from("gallery").remove(pathsToRemove);
    }
  }

  const { error } = await supabase.from("gallery").delete().eq("id", id);

  if (error) {
    throw new Error(`Gagal menghapus media: ${error.message}`);
  }

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  revalidatePath("/");
}
