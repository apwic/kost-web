import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { SearchX } from "lucide-react";
import { getSiteSettings } from "@/lib/settings";

export default async function NotFound() {
  const settings = await getSiteSettings();
  return (
    <div className="min-h-screen bg-surface-primary text-fg-primary flex flex-col">
      <Navbar variant="solid" siteName={settings.site_name} logoUrl={settings.logo_url} />
      <main className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="text-center max-w-md">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-surface-secondary flex items-center justify-center">
              <SearchX className="w-10 h-10 text-accent-primary" />
            </div>
          </div>
          <h1 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl text-fg-primary mb-4">
            Halaman Tidak Ditemukan
          </h1>
          <p className="font-[family-name:var(--font-body)] text-fg-secondary mb-8 leading-relaxed">
            Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
          </p>
          <Link
            href="/"
            className="inline-block bg-accent-primary text-fg-inverse font-[family-name:var(--font-body)] font-semibold px-8 py-3 rounded-xl hover:opacity-90 transition-opacity"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </main>
      <Footer
        siteName={settings.site_name}
        logoUrl={settings.logo_url}
        email={settings.email}
        phone={settings.phone_number}
        address={settings.address}
        instagramUrl={settings.instagram_url}
        facebookUrl={settings.facebook_url}
        tiktokUrl={settings.tiktok_url}
      />
    </div>
  );
}
