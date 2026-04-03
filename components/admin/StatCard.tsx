import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  href: string;
  icon: LucideIcon;
}

export function StatCard({ title, value, href, icon: Icon }: StatCardProps) {
  return (
    <Link
      href={href}
      className="block rounded-xl bg-surface-secondary p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-3xl font-semibold text-fg-primary">{value}</p>
          <p className="mt-1 text-sm text-fg-secondary">{title}</p>
        </div>
        <div className="rounded-lg bg-accent-primary/10 p-2.5">
          <Icon size={22} className="text-accent-primary" />
        </div>
      </div>
    </Link>
  );
}
