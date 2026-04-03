"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import * as LucideIcons from "lucide-react";
import type { Facility } from "@/lib/types";
import { deleteFacility } from "@/app/admin/facilities/actions";

function getIcon(name: string) {
  const pascalCase = name
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = (LucideIcons as any)[pascalCase];
  return Icon || null;
}

export default function FacilityList({ facilities }: { facilities: Facility[] }) {
  const router = useRouter();

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Apakah Anda yakin ingin menghapus fasilitas "${name}"?`)) return;
    await deleteFacility(id);
    router.refresh();
  }

  if (facilities.length === 0) {
    return (
      <div className="bg-surface-secondary rounded-xl p-8 text-center">
        <p className="text-fg-muted">Belum ada fasilitas.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {facilities.map((f) => {
        const Icon = getIcon(f.icon_name);
        return (
          <div
            key={f.id}
            className="bg-white rounded-xl border border-surface-secondary p-4 flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-lg bg-surface-secondary flex items-center justify-center shrink-0">
              {Icon ? (
                <Icon className="w-5 h-5 text-accent-primary" />
              ) : (
                <span className="text-xs text-fg-muted">?</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-fg-primary text-sm">{f.name}</div>
              <div className="text-fg-muted text-xs truncate">{f.description}</div>
            </div>
            <span className="text-xs text-fg-muted shrink-0">#{f.sort_order}</span>
            <Link
              href={`/admin/facilities/${f.id}`}
              className="text-xs text-accent-primary hover:underline shrink-0"
            >
              Edit
            </Link>
            <button
              onClick={() => handleDelete(f.id, f.name)}
              className="text-xs text-red-500 hover:underline shrink-0"
            >
              Hapus
            </button>
          </div>
        );
      })}
    </div>
  );
}
