"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function toggleTestimonialVisibility(id: string, isVisible: boolean) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("testimonials")
    .update({ is_visible: isVisible })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

export async function createTestimonial(formData: FormData) {
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const quote = formData.get("quote") as string;
  const rating = parseInt(formData.get("rating") as string) || 5;
  const isVisible = formData.get("is_visible") === "on";
  const sortOrder = parseInt(formData.get("sort_order") as string) || 0;

  let avatarUrl = "";
  const avatarFile = formData.get("avatar") as File;
  if (avatarFile && avatarFile.size > 0) {
    const ext = avatarFile.name.split(".").pop();
    const path = `avatars/${crypto.randomUUID()}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(path, avatarFile);
    if (uploadError) throw new Error(uploadError.message);
    const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(path);
    avatarUrl = urlData.publicUrl;
  }

  const { error } = await supabase.from("testimonials").insert({
    name,
    role,
    quote,
    rating: Math.min(5, Math.max(1, rating)),
    avatar_url: avatarUrl || null,
    is_visible: isVisible,
    sort_order: sortOrder,
  });

  if (error) throw new Error(error.message);
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

export async function updateTestimonial(id: string, formData: FormData) {
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const quote = formData.get("quote") as string;
  const rating = parseInt(formData.get("rating") as string) || 5;
  const isVisible = formData.get("is_visible") === "on";
  const sortOrder = parseInt(formData.get("sort_order") as string) || 0;

  const updateData: Record<string, unknown> = {
    name,
    role,
    quote,
    rating: Math.min(5, Math.max(1, rating)),
    is_visible: isVisible,
    sort_order: sortOrder,
  };

  const avatarFile = formData.get("avatar") as File;
  if (avatarFile && avatarFile.size > 0) {
    // Delete old avatar if exists
    const oldAvatarUrl = formData.get("old_avatar_url") as string;
    if (oldAvatarUrl) {
      const oldPath = oldAvatarUrl.split("/avatars/").pop();
      if (oldPath) {
        await supabase.storage.from("avatars").remove([oldPath]);
      }
    }

    const ext = avatarFile.name.split(".").pop();
    const path = `avatars/${crypto.randomUUID()}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(path, avatarFile);
    if (uploadError) throw new Error(uploadError.message);
    const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(path);
    updateData.avatar_url = urlData.publicUrl;
  }

  const { error } = await supabase
    .from("testimonials")
    .update(updateData)
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

export async function deleteTestimonial(id: string) {
  const supabase = await createClient();

  // Get the testimonial to find avatar URL
  const { data: testimonial } = await supabase
    .from("testimonials")
    .select("avatar_url")
    .eq("id", id)
    .single();

  if (testimonial?.avatar_url) {
    const path = testimonial.avatar_url.split("/avatars/").pop();
    if (path) {
      await supabase.storage.from("avatars").remove([path]);
    }
  }

  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}
