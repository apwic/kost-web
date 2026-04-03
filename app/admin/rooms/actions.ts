"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function toggleRoomAvailability(id: string, isAvailable: boolean) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("rooms")
    .update({ is_available: isAvailable })
    .eq("id", id);

  if (error) {
    throw new Error(`Gagal mengubah status: ${error.message}`);
  }

  revalidatePath("/admin/rooms");
  revalidatePath("/");
}

export async function deleteRoom(id: string) {
  const supabase = await createClient();

  // Fetch room to get image path for cleanup
  const { data: room } = await supabase
    .from("rooms")
    .select("image_url")
    .eq("id", id)
    .single();

  if (room?.image_url) {
    // Extract storage path from public URL
    const url = room.image_url as string;
    const marker = "/storage/v1/object/public/rooms/";
    const idx = url.indexOf(marker);
    if (idx !== -1) {
      const storagePath = url.substring(idx + marker.length);
      await supabase.storage.from("rooms").remove([storagePath]);
    }
  }

  const { error } = await supabase.from("rooms").delete().eq("id", id);

  if (error) {
    throw new Error(`Gagal menghapus kamar: ${error.message}`);
  }

  revalidatePath("/admin/rooms");
  revalidatePath("/");
}

export async function createRoom(formData: FormData) {
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const price = Number(formData.get("price"));
  const priceLabel = formData.get("price_label") as string;
  const description = formData.get("description") as string;
  const amenitiesRaw = formData.get("amenities") as string;
  const totalUnits = Number(formData.get("total_units"));
  const availableUnits = Number(formData.get("available_units"));
  const sortOrder = Number(formData.get("sort_order"));
  const imageUrl = formData.get("image_url") as string;

  const amenities = amenitiesRaw
    .split("\n")
    .map((a) => a.trim())
    .filter(Boolean);

  const { error } = await supabase.from("rooms").insert({
    name,
    slug,
    price,
    price_label: priceLabel,
    description,
    amenities,
    total_units: totalUnits,
    available_units: availableUnits,
    sort_order: sortOrder,
    image_url: imageUrl || null,
    is_available: true,
  });

  if (error) {
    throw new Error(`Gagal membuat kamar: ${error.message}`);
  }

  revalidatePath("/admin/rooms");
  revalidatePath("/");
  redirect("/admin/rooms");
}

export async function updateRoom(id: string, formData: FormData) {
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const price = Number(formData.get("price"));
  const priceLabel = formData.get("price_label") as string;
  const description = formData.get("description") as string;
  const amenitiesRaw = formData.get("amenities") as string;
  const totalUnits = Number(formData.get("total_units"));
  const availableUnits = Number(formData.get("available_units"));
  const sortOrder = Number(formData.get("sort_order"));
  const imageUrl = formData.get("image_url") as string;
  const existingImageUrl = formData.get("existing_image_url") as string;

  const amenities = amenitiesRaw
    .split("\n")
    .map((a) => a.trim())
    .filter(Boolean);

  const finalImageUrl = imageUrl || existingImageUrl || null;

  // If a new image was uploaded and there was an old one, delete the old one
  if (imageUrl && existingImageUrl) {
    const marker = "/storage/v1/object/public/rooms/";
    const idx = existingImageUrl.indexOf(marker);
    if (idx !== -1) {
      const storagePath = existingImageUrl.substring(idx + marker.length);
      await supabase.storage.from("rooms").remove([storagePath]);
    }
  }

  const { error } = await supabase
    .from("rooms")
    .update({
      name,
      slug,
      price,
      price_label: priceLabel,
      description,
      amenities,
      total_units: totalUnits,
      available_units: availableUnits,
      sort_order: sortOrder,
      image_url: finalImageUrl,
    })
    .eq("id", id);

  if (error) {
    throw new Error(`Gagal memperbarui kamar: ${error.message}`);
  }

  revalidatePath("/admin/rooms");
  revalidatePath("/");
  redirect("/admin/rooms");
}
