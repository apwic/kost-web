import { LoginForm } from "@/components/admin/LoginForm";

export const metadata = {
  title: "Masuk — KostKu Admin",
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-surface-primary flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="bg-surface-secondary rounded-2xl shadow-lg p-8">
          <h1 className="font-[family-name:var(--font-heading)] text-2xl text-fg-primary text-center mb-6">
            KostKu Admin
          </h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
