import { createClient } from "@/lib/supabase/server";
import type { Facility } from "@/lib/types";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  Wifi,
  Wind,
  Car,
  Shirt,
  CookingPot,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  wifi: Wifi,
  wind: Wind,
  car: Car,
  shirt: Shirt,
  "cooking-pot": CookingPot,
  "shield-check": ShieldCheck,
};

const FALLBACK_FACILITIES: Facility[] = [
  {
    id: "1",
    name: "WiFi Cepat",
    description:
      "Internet berkecepatan tinggi tersedia di seluruh area kost untuk kebutuhan kerja dan hiburan.",
    icon_name: "wifi",
    sort_order: 1,
    created_at: "",
  },
  {
    id: "2",
    name: "AC Setiap Kamar",
    description:
      "Pendingin udara modern di setiap kamar untuk kenyamanan maksimal sepanjang hari.",
    icon_name: "wind",
    sort_order: 2,
    created_at: "",
  },
  {
    id: "3",
    name: "Parkir Luas",
    description:
      "Area parkir yang aman dan luas untuk motor maupun mobil penghuni.",
    icon_name: "car",
    sort_order: 3,
    created_at: "",
  },
  {
    id: "4",
    name: "Laundry",
    description:
      "Layanan laundry mingguan sudah termasuk dalam biaya sewa bulanan.",
    icon_name: "shirt",
    sort_order: 4,
    created_at: "",
  },
  {
    id: "5",
    name: "Dapur Bersama",
    description:
      "Dapur bersama yang bersih dan lengkap dengan peralatan memasak.",
    icon_name: "cooking-pot",
    sort_order: 5,
    created_at: "",
  },
  {
    id: "6",
    name: "Keamanan 24 Jam",
    description:
      "Sistem keamanan CCTV dan penjaga yang bertugas sepanjang hari dan malam.",
    icon_name: "shield-check",
    sort_order: 6,
    created_at: "",
  },
];

async function getFacilities(): Promise<Facility[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("facilities")
      .select("*")
      .order("sort_order", { ascending: true });

    if (data && data.length > 0) return data as Facility[];
    return FALLBACK_FACILITIES;
  } catch {
    return FALLBACK_FACILITIES;
  }
}

export default async function Facilities() {
  const facilities = await getFacilities();

  return (
    <section id="facilities" className="bg-surface-primary py-20 px-6 lg:px-[120px]">
      <div className="max-w-[1440px] mx-auto">
        <SectionHeader
          tag="Fasilitas"
          title="Fasilitas Lengkap"
          subtitle="Nikmati berbagai fasilitas modern yang dirancang untuk kenyamanan dan kemudahan Anda sehari-hari."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {facilities.map((facility) => {
            const Icon = ICON_MAP[facility.icon_name] ?? Wifi;
            return (
              <div
                key={facility.id}
                className="bg-surface-secondary rounded-2xl p-8"
              >
                <Icon
                  size={32}
                  className="text-accent-primary mb-4"
                  strokeWidth={1.5}
                />
                <h3 className="font-[family-name:var(--font-body)] text-lg font-semibold text-fg-primary mb-2">
                  {facility.name}
                </h3>
                <p className="font-[family-name:var(--font-body)] text-sm text-fg-secondary leading-relaxed">
                  {facility.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
