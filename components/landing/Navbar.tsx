"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  variant?: "transparent" | "solid";
}

const LANDING_LINKS = [
  { label: "Kamar", href: "#rooms" },
  { label: "Fasilitas", href: "#facilities" },
  { label: "Galeri", href: "#gallery" },
  { label: "Kontak", href: "#contact" },
];

const PAGE_LINKS = [
  { label: "Beranda", href: "/" },
  { label: "Kamar", href: "/#rooms" },
  { label: "Fasilitas", href: "/#facilities" },
  { label: "Galeri", href: "/gallery" },
  { label: "Kontak", href: "/#contact" },
];

export default function Navbar({ variant = "transparent" }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isSolid = variant === "solid";
  const links = isSolid ? PAGE_LINKS : LANDING_LINKS;

  function isActiveLink(href: string) {
    if (href === "/gallery") return pathname === "/gallery";
    if (href === "/") return pathname === "/";
    return false;
  }

  function handleLinkClick(href: string) {
    setMobileOpen(false);
    if (href.startsWith("#")) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <nav
      className={
        isSolid
          ? "sticky top-0 w-full z-50 bg-surface-primary border-b border-surface-secondary"
          : "absolute top-0 left-0 w-full z-50 backdrop-blur-sm"
      }
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-6 lg:px-[120px] py-5">
        {/* Logo */}
        <Link
          href="/"
          className={`font-[family-name:var(--font-heading)] text-2xl font-bold ${
            isSolid ? "text-fg-primary" : "text-white"
          }`}
        >
          KostKu
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {links.map((link) => {
              const active = isSolid && isActiveLink(link.href);
              if (isSolid) {
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`font-[family-name:var(--font-body)] transition-colors ${
                        active
                          ? "text-accent-primary font-semibold"
                          : "text-fg-secondary hover:text-fg-primary"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              }
              return (
                <li key={link.href}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="font-[family-name:var(--font-body)] text-white/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              );
            })}
          </ul>

          {isSolid && (
            <Link
              href="/#contact"
              className="bg-accent-primary hover:bg-accent-primary/90 text-fg-inverse rounded-full px-5 py-2.5 font-[family-name:var(--font-body)] text-sm font-semibold transition-colors"
            >
              Hubungi Kami
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className={`lg:hidden ${isSolid ? "text-fg-primary" : "text-white"}`}
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div
          className={`lg:hidden px-6 pb-6 ${
            isSolid
              ? "bg-surface-primary border-b border-surface-secondary"
              : "bg-black/80 backdrop-blur-md"
          }`}
        >
          <ul className="flex flex-col gap-4">
            {links.map((link) => {
              const active = isSolid && isActiveLink(link.href);
              if (isSolid) {
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`font-[family-name:var(--font-body)] block w-full py-2 transition-colors ${
                        active
                          ? "text-accent-primary font-semibold"
                          : "text-fg-secondary hover:text-fg-primary"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              }
              return (
                <li key={link.href}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="font-[family-name:var(--font-body)] text-white/80 hover:text-white transition-colors w-full text-left py-2"
                  >
                    {link.label}
                  </button>
                </li>
              );
            })}
          </ul>
          {isSolid && (
            <Link
              href="/#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-4 block text-center bg-accent-primary hover:bg-accent-primary/90 text-fg-inverse rounded-full px-5 py-2.5 font-[family-name:var(--font-body)] text-sm font-semibold transition-colors"
            >
              Hubungi Kami
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
