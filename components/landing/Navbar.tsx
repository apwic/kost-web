"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Kamar", href: "#rooms" },
  { label: "Fasilitas", href: "#facilities" },
  { label: "Galeri", href: "#gallery" },
  { label: "Kontak", href: "#contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  function scrollTo(id: string) {
    setMobileOpen(false);
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <nav className="absolute top-0 left-0 w-full z-50 backdrop-blur-sm">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-6 lg:px-[120px] py-5">
        {/* Logo */}
        <a
          href="#"
          className="font-[family-name:var(--font-heading)] text-2xl font-bold text-white"
        >
          KostKu
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => scrollTo(link.href)}
                className="font-[family-name:var(--font-body)] text-white/80 hover:text-white transition-colors"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-white"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="lg:hidden bg-black/80 backdrop-blur-md px-6 pb-6">
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => scrollTo(link.href)}
                  className="font-[family-name:var(--font-body)] text-white/80 hover:text-white transition-colors w-full text-left py-2"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
