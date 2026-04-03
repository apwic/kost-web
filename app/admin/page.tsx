import { createClient } from "@/lib/supabase/server";
import { StatCard } from "@/components/admin/StatCard";
import { BedDouble, Image, MessageSquareQuote, Building2 } from "lucide-react";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [
    { count: totalRooms },
    { count: availableRooms },
    { count: totalGallery },
    { count: visibleTestimonials },
  ] = await Promise.all([
    supabase.from("rooms").select("*", { count: "exact", head: true }),
    supabase
      .from("rooms")
      .select("*", { count: "exact", head: true })
      .eq("is_available", true),
    supabase.from("gallery").select("*", { count: "exact", head: true }),
    supabase
      .from("testimonials")
      .select("*", { count: "exact", head: true })
      .eq("is_visible", true),
  ]);

  return (
    <div>
      <h1 className="font-[family-name:var(--font-heading)] text-2xl text-fg-primary mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard
          title="Total Kamar"
          value={totalRooms ?? 0}
          href="/admin/rooms"
          icon={BedDouble}
        />
        <StatCard
          title="Kamar Tersedia"
          value={availableRooms ?? 0}
          href="/admin/rooms"
          icon={BedDouble}
        />
        <StatCard
          title="Item Galeri"
          value={totalGallery ?? 0}
          href="/admin/gallery"
          icon={Image}
        />
        <StatCard
          title="Testimoni Tampil"
          value={visibleTestimonials ?? 0}
          href="/admin/testimonials"
          icon={MessageSquareQuote}
        />
      </div>
    </div>
  );
}
