import Link from "next/link";
import RoomForm from "@/components/admin/RoomForm";

export default function NewRoomPage() {
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
          Tambah Kamar Baru
        </h1>
        <RoomForm />
      </div>
    </div>
  );
}
