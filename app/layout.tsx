import type { Metadata } from "next";
import { Playfair_Display, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  weight: "700",
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const geistMono = Geist_Mono({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://kostku.vercel.app"
  ),
  title: "KostKu — Kost Modern di Jakarta",
  description:
    "Kost modern dengan fasilitas lengkap, lokasi strategis, dan harga terjangkau.",
  openGraph: {
    siteName: "KostKu",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${playfairDisplay.variable} ${inter.variable} ${geistMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
