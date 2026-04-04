import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Testimonial } from "@/lib/types";
import TestimonialForm from "@/components/admin/TestimonialForm";

export const metadata = { title: "Edit Testimoni" };

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("testimonials").select("*").eq("id", id).single();

  if (!data) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-fg-primary mb-6">
        Edit Testimoni
      </h1>
      <TestimonialForm testimonial={data as Testimonial} />
    </div>
  );
}
