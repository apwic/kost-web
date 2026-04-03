import Image from "next/image";
import { Check } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { Room, SiteSetting } from "@/lib/types";
import SectionHeader from "@/components/ui/SectionHeader";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

const FALLBACK_WHATSAPP = "6281234567890";

const FALLBACK_ROOMS: Room[] = [
  {
    id: "1",
    name: "Kamar Standar",
    slug: "kamar-standar",
    price: 1500000,
    price_label: "Rp 1.500.000 / bulan",
    description: "Kamar nyaman dengan fasilitas dasar.",
    image_url:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
    amenities: ["Kasur & Lemari", "WiFi", "Kamar Mandi Dalam", "AC"],
    is_available: true,
    sort_order: 1,
    total_units: 10,
    available_units: 3,
    created_at: "",
  },
  {
    id: "2",
    name: "Kamar Deluxe",
    slug: "kamar-deluxe",
    price: 2200000,
    price_label: "Rp 2.200.000 / bulan",
    description: "Kamar luas dengan fasilitas premium.",
    image_url:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
    amenities: ["Kasur Queen & Lemari", "WiFi Prioritas", "Kamar Mandi Dalam", "AC & TV"],
    is_available: true,
    sort_order: 2,
    total_units: 5,
    available_units: 2,
    created_at: "",
  },
  {
    id: "3",
    name: "Kamar Suite",
    slug: "kamar-suite",
    price: 3000000,
    price_label: "Rp 3.000.000 / bulan",
    description: "Kamar terluas dengan fasilitas terbaik.",
    image_url:
      "https://images.unsplash.com/photo-1598928506311-c55ez637a745?auto=format&fit=crop&w=800&q=80",
    amenities: ["Kasur King & Sofa", "WiFi Prioritas", "Kamar Mandi Luas", "AC, TV & Kulkas"],
    is_available: true,
    sort_order: 3,
    total_units: 3,
    available_units: 1,
    created_at: "",
  },
];

async function getRoomsAndPhone(): Promise<{
  rooms: Room[];
  whatsapp: string;
}> {
  try {
    const supabase = await createClient();

    const [roomsRes, settingsRes] = await Promise.all([
      supabase
        .from("rooms")
        .select("*")
        .order("sort_order", { ascending: true }),
      supabase
        .from("site_settings")
        .select("key, value")
        .eq("key", "whatsapp_number")
        .single(),
    ]);

    const rooms =
      roomsRes.data && roomsRes.data.length > 0
        ? (roomsRes.data as Room[])
        : FALLBACK_ROOMS;

    const whatsapp =
      (settingsRes.data as SiteSetting | null)?.value ?? FALLBACK_WHATSAPP;

    return { rooms, whatsapp };
  } catch {
    return { rooms: FALLBACK_ROOMS, whatsapp: FALLBACK_WHATSAPP };
  }
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export default async function RoomTypes() {
  const { rooms, whatsapp } = await getRoomsAndPhone();

  return (
    <section id="rooms" className="bg-surface-secondary py-20 px-6 lg:px-[120px]">
      <div className="max-w-[1440px] mx-auto">
        <SectionHeader
          tag="Tipe Kamar"
          title="Pilihan Kamar"
          subtitle="Berbagai pilihan kamar yang dirancang untuk memenuhi kebutuhan dan anggaran Anda."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="bg-surface-primary rounded-2xl overflow-hidden shadow-sm flex flex-col"
            >
              {/* Image */}
              <div className="relative h-[220px] w-full">
                {room.image_url ? (
                  <Image
                    src={room.image_url}
                    alt={room.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-surface-secondary flex items-center justify-center">
                    <span className="text-fg-muted text-sm">No image</span>
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="p-6 space-y-4 flex flex-col flex-1">
                <h3 className="font-[family-name:var(--font-body)] text-xl font-semibold text-fg-primary">
                  {room.name}
                </h3>

                <p className="font-[family-name:var(--font-mono)] text-xl font-semibold text-accent-primary">
                  {room.price_label || `${formatPrice(room.price)} / bulan`}
                </p>

                <div className="h-px bg-surface-secondary" />

                <ul className="space-y-2 flex-1">
                  {room.amenities.slice(0, 4).map((amenity) => (
                    <li
                      key={amenity}
                      className="flex items-center gap-2 font-[family-name:var(--font-body)] text-sm text-fg-secondary"
                    >
                      <Check size={16} className="text-accent-primary shrink-0" />
                      {amenity}
                    </li>
                  ))}
                </ul>

                <WhatsAppButton
                  phoneNumber={whatsapp}
                  message={`Halo, saya tertarik dengan ${room.name}. Apakah masih tersedia?`}
                  variant="accent"
                  fullWidth
                  className="rounded-lg py-3.5"
                >
                  Pesan Sekarang
                </WhatsAppButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
