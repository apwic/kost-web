"use client";

import { useTransition } from "react";
import Link from "next/link";
import type { Room } from "@/lib/types";
import { toggleRoomAvailability, deleteRoom } from "@/app/admin/rooms/actions";

interface RoomListProps {
  rooms: Room[];
}

export default function RoomList({ rooms }: RoomListProps) {
  const [isPending, startTransition] = useTransition();

  function handleToggle(id: string, currentStatus: boolean) {
    startTransition(async () => {
      await toggleRoomAvailability(id, !currentStatus);
    });
  }

  function handleDelete(id: string, name: string) {
    if (!confirm(`Yakin ingin menghapus kamar "${name}"?`)) return;
    startTransition(async () => {
      await deleteRoom(id);
    });
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-surface-secondary">
            <th className="py-3 px-4 text-sm font-semibold text-fg-secondary">
              Nama
            </th>
            <th className="py-3 px-4 text-sm font-semibold text-fg-secondary">
              Harga
            </th>
            <th className="py-3 px-4 text-sm font-semibold text-fg-secondary">
              Unit Tersedia
            </th>
            <th className="py-3 px-4 text-sm font-semibold text-fg-secondary">
              Status
            </th>
            <th className="py-3 px-4 text-sm font-semibold text-fg-secondary">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr
              key={room.id}
              className="border-b border-surface-secondary hover:bg-surface-secondary/50 transition-colors"
            >
              <td className="py-3 px-4 text-sm text-fg-primary font-medium">
                {room.name}
              </td>
              <td className="py-3 px-4 text-sm text-fg-secondary">
                {room.price_label ||
                  new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(room.price)}
              </td>
              <td className="py-3 px-4 text-sm text-fg-secondary">
                {room.available_units} / {room.total_units}
              </td>
              <td className="py-3 px-4">
                <button
                  onClick={() => handleToggle(room.id, room.is_available)}
                  disabled={isPending}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    room.is_available ? "bg-accent-primary" : "bg-fg-muted"
                  } ${isPending ? "opacity-50 cursor-wait" : "cursor-pointer"}`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      room.is_available ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/rooms/${room.id}`}
                    className="text-sm text-accent-primary hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(room.id, room.name)}
                    disabled={isPending}
                    className="text-sm text-red-600 hover:underline disabled:opacity-50"
                  >
                    Hapus
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {rooms.length === 0 && (
            <tr>
              <td
                colSpan={5}
                className="py-8 text-center text-fg-muted text-sm"
              >
                Belum ada kamar. Klik &quot;Tambah Kamar&quot; untuk menambahkan.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
