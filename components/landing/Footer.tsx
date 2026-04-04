import Link from "next/link";
import { AtSign, Globe, Music2 } from "lucide-react";

interface FooterProps {
  siteName?: string;
  logoUrl?: string;
  email?: string;
  phone?: string;
  address?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  tiktokUrl?: string;
}

const navLinks = [
  { label: "Beranda", href: "/" },
  { label: "Kamar", href: "/#rooms" },
  { label: "Fasilitas", href: "/#facilities" },
  { label: "Galeri", href: "/gallery" },
];

const infoLinks = [
  { label: "Tentang Kami", href: "#" },
  { label: "Syarat & Ketentuan", href: "#" },
  { label: "Kebijakan Privasi", href: "#" },
  { label: "FAQ", href: "#" },
];

export default function Footer({
  siteName = "Nama Kost",
  logoUrl,
  email = "info@namakost.com",
  phone = "+62 xxx xxxx xxxx",
  address = "Alamat kost Anda",
  instagramUrl = "",
  facebookUrl = "",
  tiktokUrl = "",
}: FooterProps) {
  const addressParts = address.split(",").map((s: string) => s.trim());
  const address1 = addressParts[0] || address;
  const address2 = addressParts.slice(1).join(", ") || "";

  const socialLinks = [
    { icon: AtSign, href: instagramUrl, label: "Instagram" },
    { icon: Globe, href: facebookUrl, label: "Facebook" },
    { icon: Music2, href: tiktokUrl, label: "TikTok" },
  ].filter((link) => link.href);

  return (
    <footer className="bg-surface-inverse py-12 px-6 lg:px-[120px]">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-10">
        {/* Top section */}
        <div className="flex flex-col lg:flex-row lg:justify-between gap-10">
          {/* Brand */}
          <div className="lg:max-w-[300px]">
            <h3 className="font-[family-name:var(--font-heading)] text-[28px] font-bold text-fg-inverse mb-4">
              {logoUrl ? (
                <img src={logoUrl} alt={siteName} className="h-8 w-auto" />
              ) : (
                siteName
              )}
            </h3>
            <p className="font-[family-name:var(--font-body)] text-sm text-fg-muted leading-relaxed">
              Kost modern dengan fasilitas lengkap untuk kenyamanan Anda. Lokasi strategis dan harga terjangkau.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-20">
            {/* Navigasi */}
            <div className="flex flex-col gap-3">
              <h4 className="font-[family-name:var(--font-body)] text-sm font-semibold text-fg-inverse">
                Navigasi
              </h4>
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-[family-name:var(--font-body)] text-sm text-fg-muted hover:text-fg-inverse transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Informasi */}
            <div className="flex flex-col gap-3">
              <h4 className="font-[family-name:var(--font-body)] text-sm font-semibold text-fg-inverse">
                Informasi
              </h4>
              {infoLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-[family-name:var(--font-body)] text-sm text-fg-muted hover:text-fg-inverse transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Kontak */}
            <div className="flex flex-col gap-3 col-span-2 lg:col-span-1">
              <h4 className="font-[family-name:var(--font-body)] text-sm font-semibold text-fg-inverse">
                Kontak
              </h4>
              <span className="font-[family-name:var(--font-body)] text-sm text-fg-muted">
                {phone}
              </span>
              <span className="font-[family-name:var(--font-body)] text-sm text-fg-muted">
                {email}
              </span>
              <span className="font-[family-name:var(--font-body)] text-sm text-fg-muted">
                {address1}
              </span>
              {address2 && (
                <span className="font-[family-name:var(--font-body)] text-sm text-fg-muted">
                  {address2}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#3D3530]" />

        {/* Bottom */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
          <span className="font-[family-name:var(--font-body)] text-[13px] text-fg-muted">
            © {new Date().getFullYear()} {siteName}. Hak cipta dilindungi.
          </span>
          <div className="flex items-center gap-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-fg-muted hover:text-fg-inverse transition-colors"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
