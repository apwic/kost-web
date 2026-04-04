import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Facility } from "@/lib/types";
import FacilityForm from "@/components/admin/FacilityForm";

export const metadata = { title: "Edit Fasilitas" };

export default async function EditFacilityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("facilities").select("*").eq("id", id).single();

  if (!data) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-fg-primary mb-6">
        Edit Fasilitas
      </h1>
      <FacilityForm facility={data as Facility} />
    </div>
  );
}
