"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  LayoutDashboard,
  BedDouble,
  Image,
  MessageSquareQuote,
  Building2,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Kamar", href: "/admin/rooms", icon: BedDouble },
  { label: "Galeri", href: "/admin/gallery", icon: Image },
  { label: "Testimoni", href: "/admin/testimonials", icon: MessageSquareQuote },
  { label: "Fasilitas", href: "/admin/facilities", icon: Building2 },
  { label: "Pengaturan", href: "/admin/settings", icon: Settings },
];

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname.startsWith(href);
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-surface-primary flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-surface-inverse flex flex-col
          transform transition-transform duration-200 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo / title */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-white/10">
          <Link
            href="/admin"
            className="font-[family-name:var(--font-heading)] text-lg text-fg-inverse"
          >
            KostKu
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-fg-inverse/60 hover:text-fg-inverse cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                  ${
                    active
                      ? "bg-accent-primary text-fg-inverse"
                      : "text-fg-inverse/60 hover:text-fg-inverse hover:bg-white/5"
                  }
                `}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Sign out */}
        <div className="px-3 py-4 border-t border-white/10">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-fg-inverse/60 hover:text-fg-inverse hover:bg-white/5 transition-colors cursor-pointer"
          >
            <LogOut size={18} />
            Keluar
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <header className="lg:hidden flex items-center h-16 px-4 border-b border-fg-muted/10 bg-surface-primary">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-fg-primary hover:text-fg-secondary cursor-pointer"
          >
            <Menu size={24} />
          </button>
          <span className="ml-4 font-[family-name:var(--font-heading)] text-lg text-fg-primary">
            KostKu
          </span>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
