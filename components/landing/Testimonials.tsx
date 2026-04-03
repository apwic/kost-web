import SectionHeader from "@/components/ui/SectionHeader";
import { createClient } from "@/lib/supabase/server";
import type { Testimonial } from "@/lib/types";

const fallbackTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Aisyah Putri",
    role: "Mahasiswi, 1 tahun tinggal",
    quote: "Kost ini sangat bersih dan nyaman. WiFi kencang, cocok untuk kerja remote. Ibu kostnya juga sangat ramah dan membantu.",
    rating: 5,
    avatar_url: "",
    is_visible: true,
    sort_order: 1,
    created_at: "",
  },
  {
    id: "2",
    name: "Budi Santoso",
    role: "Karyawan, 2 tahun tinggal",
    quote: "Lokasi strategis dekat kampus dan pusat kota. Fasilitas lengkap dan harga sangat terjangkau dibanding kost lain.",
    rating: 5,
    avatar_url: "",
    is_visible: true,
    sort_order: 2,
    created_at: "",
  },
  {
    id: "3",
    name: "Citra Dewi",
    role: "Profesional, 6 bulan tinggal",
    quote: "Keamanan 24 jam membuat saya merasa aman. Parkir luas dan dapur bersama selalu bersih. Sangat recommended!",
    rating: 5,
    avatar_url: "",
    is_visible: true,
    sort_order: 3,
    created_at: "",
  },
];

export default async function Testimonials() {
  let testimonials: Testimonial[] = fallbackTestimonials;

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("testimonials")
      .select("*")
      .eq("is_visible", true)
      .order("sort_order")
      .limit(3);
    if (data && data.length > 0) testimonials = data;
  } catch {
    // Use fallback
  }

  return (
    <section className="bg-surface-secondary py-20 px-6 lg:px-[120px]">
      <div className="max-w-[1440px] mx-auto">
        <SectionHeader
          tag="Testimoni"
          title="Apa Kata Penghuni Kami"
          subtitle="Dengarkan pengalaman langsung dari para penghuni kost kami."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-surface-primary rounded-2xl p-8 shadow-[0_1px_2px_#0000000a] flex flex-col gap-5"
            >
              {/* Stars */}
              <div className="text-accent-primary text-lg tracking-wider">
                {"★".repeat(t.rating)}
              </div>

              {/* Quote */}
              <p className="font-[family-name:var(--font-body)] text-[15px] text-fg-secondary leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Divider */}
              <div className="h-px bg-surface-secondary" />

              {/* Profile */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-accent-primary flex items-center justify-center shrink-0">
                  <span className="font-[family-name:var(--font-body)] text-lg font-semibold text-fg-inverse">
                    {t.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-[family-name:var(--font-body)] text-sm font-semibold text-fg-primary">
                    {t.name}
                  </p>
                  <p className="font-[family-name:var(--font-body)] text-xs text-fg-muted">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
