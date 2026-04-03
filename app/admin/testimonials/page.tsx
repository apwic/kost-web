import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Testimonial } from "@/lib/types";
import TestimonialList from "@/components/admin/TestimonialList";

export const metadata = { title: "Kelola Testimoni - Admin KostKu" };

export default async function TestimonialsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("testimonials")
    .select("*")
    .order("sort_order", { ascending: true });

  const testimonials = (data as Testimonial[]) ?? [];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-fg-primary">
          Kelola Testimoni
        </h1>
        <Link
          href="/admin/testimonials/new"
          className="bg-accent-primary hover:bg-accent-primary/90 text-fg-inverse rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors"
        >
          + Tambah Testimoni
        </Link>
      </div>
      <TestimonialList testimonials={testimonials} />
    </div>
  );
}
