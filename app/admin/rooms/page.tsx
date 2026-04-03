import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Room } from "@/lib/types";
import RoomList from "@/components/admin/RoomList";

export default async function AdminRoomsPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .order("sort_order", { ascending: true });

  const rooms: Room[] = error ? [] : (data as Room[]);

  return (
    <div className="min-h-screen bg-surface-primary">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              href="/admin"
              className="text-sm text-fg-muted hover:text-fg-secondary transition-colors"
            >
              &larr; Kembali ke Dashboard
            </Link>
            <h1 className="text-2xl font-bold text-fg-primary mt-2">
              Kelola Kamar
            </h1>
          </div>
          <Link
            href="/admin/rooms/new"
            className="inline-flex items-center gap-2 bg-accent-primary text-fg-inverse px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            + Tambah Kamar
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-surface-secondary">
          <RoomList rooms={rooms} />
        </div>
      </div>
    </div>
  );
}
