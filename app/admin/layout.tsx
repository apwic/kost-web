import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { getSiteSettings } from "@/lib/settings";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: {
      template: `%s - Admin ${settings.site_name}`,
      default: `Admin ${settings.site_name}`,
    },
  };
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();
  return <AdminShell siteName={settings.site_name}>{children}</AdminShell>;
}
