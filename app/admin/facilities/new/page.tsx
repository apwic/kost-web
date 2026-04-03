import FacilityForm from "@/components/admin/FacilityForm";

export const metadata = { title: "Tambah Fasilitas - Admin KostKu" };

export default function NewFacilityPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-fg-primary mb-6">
        Tambah Fasilitas
      </h1>
      <FacilityForm />
    </div>
  );
}
