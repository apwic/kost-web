import { AtSign, Globe, Send } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

interface FooterContact {
  phone: string;
  email: string;
  address1: string;
  address2: string;
}

const fallbackContact: FooterContact = {
  phone: "+62 812 3456 7890",
  email: "info@kostku.com",
  address1: "Jl. Merdeka No. 45",
  address2: "Jakarta Selatan",
};

async function getFooterContact(): Promise<FooterContact> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("site_settings")
      .select("key, value")
      .in("key", ["phone_number", "email", "address"]);

    if (data && data.length > 0) {
      const settings = Object.fromEntries(data.map((s) => [s.key, s.value]));
      const address = settings.address || "Jl. Merdeka No. 45, Jakarta Selatan";
      const parts = address.split(",").map((s: string) => s.trim());
      return {
        phone: settings.phone_number || fallbackContact.phone,
        email: settings.email || fallbackContact.email,
        address1: parts[0] || fallbackContact.address1,
        address2: parts[1] || fallbackContact.address2,
      };
    }
  } catch {
    // Use fallback
  }
  return fallbackContact;
}

const navLinks = [
  { label: "Beranda", href: "#" },
  { label: "Kamar", href: "#rooms" },
  { label: "Fasilitas", href: "#facilities" },
  { label: "Galeri", href: "#gallery" },
];

const infoLinks = [
  { label: "Tentang Kami", href: "#" },
  { label: "Syarat & Ketentuan", href: "#" },
  { label: "Kebijakan Privasi", href: "#" },
  { label: "FAQ", href: "#" },
];

const socialLinks = [
  { icon: AtSign, href: "#", label: "Instagram" },
  { icon: Globe, href: "#", label: "Facebook" },
  { icon: Send, href: "#", label: "Twitter" },
];

export default async function Footer() {
  const contact = await getFooterContact();

  return (
    <footer className="bg-surface-inverse py-12 px-6 lg:px-[120px]">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-10">
        {/* Top section */}
        <div className="flex flex-col lg:flex-row lg:justify-between gap-10">
          {/* Brand */}
          <div className="lg:max-w-[300px]">
            <h3 className="font-[family-name:var(--font-heading)] text-[28px] font-bold text-fg-inverse mb-4">
              KostKu
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
                <a
                  key={link.label}
                  href={link.href}
                  className="font-[family-name:var(--font-body)] text-sm text-fg-muted hover:text-fg-inverse transition-colors"
                >
                  {link.label}
                </a>
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
                {contact.phone}
              </span>
              <span className="font-[family-name:var(--font-body)] text-sm text-fg-muted">
                {contact.email}
              </span>
              <span className="font-[family-name:var(--font-body)] text-sm text-fg-muted">
                {contact.address1}
              </span>
              <span className="font-[family-name:var(--font-body)] text-sm text-fg-muted">
                {contact.address2}
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#3D3530]" />

        {/* Bottom */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
          <span className="font-[family-name:var(--font-body)] text-[13px] text-fg-muted">
            © 2026 KostKu. Hak cipta dilindungi.
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
