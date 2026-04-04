import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Facility } from "@/lib/types";
import FacilityList from "@/components/admin/FacilityList";

export const metadata = { title: "Kelola Fasilitas" };

export default async function FacilitiesPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("facilities")
    .select("*")
    .order("sort_order", { ascending: true });

  const facilities = (data as Facility[]) ?? [];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-fg-primary">
          Kelola Fasilitas
        </h1>
        <Link
          href="/admin/facilities/new"
          className="bg-accent-primary hover:bg-accent-primary/90 text-fg-inverse rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors"
        >
          + Tambah Fasilitas
        </Link>
      </div>
      <FacilityList facilities={facilities} />
    </div>
  );
}
