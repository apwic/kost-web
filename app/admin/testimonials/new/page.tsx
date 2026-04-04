import TestimonialForm from "@/components/admin/TestimonialForm";

export const metadata = { title: "Tambah Testimoni" };

export default function NewTestimonialPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-fg-primary mb-6">
        Tambah Testimoni
      </h1>
      <TestimonialForm />
    </div>
  );
}
