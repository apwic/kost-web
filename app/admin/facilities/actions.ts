"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function createFacility(formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase.from("facilities").insert({
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    icon_name: formData.get("icon_name") as string,
    sort_order: parseInt(formData.get("sort_order") as string) || 0,
  });

  if (error) throw new Error(error.message);
  revalidatePath("/admin/facilities");
  revalidatePath("/");
}

export async function updateFacility(id: string, formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("facilities")
    .update({
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      icon_name: formData.get("icon_name") as string,
      sort_order: parseInt(formData.get("sort_order") as string) || 0,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/facilities");
  revalidatePath("/");
}

export async function deleteFacility(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("facilities").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/facilities");
  revalidatePath("/");
}
