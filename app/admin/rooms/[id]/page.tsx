import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Room } from "@/lib/types";
import RoomForm from "@/components/admin/RoomForm";

interface EditRoomPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditRoomPage({ params }: EditRoomPageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    notFound();
  }

  const room = data as Room;

  return (
    <div className="min-h-screen bg-surface-primary">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <Link
          href="/admin/rooms"
          className="text-sm text-fg-muted hover:text-fg-secondary transition-colors"
        >
          &larr; Kembali ke Daftar Kamar
        </Link>
        <h1 className="text-2xl font-bold text-fg-primary mt-2 mb-8">
          Edit Kamar: {room.name}
        </h1>
        <RoomForm room={room} />
      </div>
    </div>
  );
}
