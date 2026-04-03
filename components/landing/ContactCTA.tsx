import { Phone, MessageCircle, MapPin } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { createClient } from "@/lib/supabase/server";

interface ContactInfo {
  phone: string;
  whatsapp: string;
  address: string;
  greeting: string;
}

const fallbackContact: ContactInfo = {
  phone: "+62 812 3456 7890",
  whatsapp: "6281234567890",
  address: "Jl. Merdeka No. 45, Jakarta Selatan",
  greeting: "Halo, saya tertarik dengan KostKu. Bisa info lebih lanjut?",
};

async function getContactInfo(): Promise<ContactInfo> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("site_settings")
      .select("key, value")
      .in("key", ["phone_number", "whatsapp_number", "address", "whatsapp_greeting"]);

    if (data && data.length > 0) {
      const settings = Object.fromEntries(data.map((s) => [s.key, s.value]));
      return {
        phone: settings.phone_number || fallbackContact.phone,
        whatsapp: settings.whatsapp_number || fallbackContact.whatsapp,
        address: settings.address || fallbackContact.address,
        greeting: settings.whatsapp_greeting || fallbackContact.greeting,
      };
    }
  } catch {
    // Use fallback
  }
  return fallbackContact;
}

export default async function ContactCTA() {
  const contact = await getContactInfo();

  const cards = [
    { icon: Phone, label: "Telepon", value: contact.phone },
    { icon: MessageCircle, label: "WhatsApp", value: contact.phone },
    { icon: MapPin, label: "Lokasi", value: contact.address },
  ];

  return (
    <section id="contact" className="bg-surface-inverse py-20 px-6 lg:px-[120px]">
      <div className="max-w-[1440px] mx-auto flex flex-col items-center">
        <SectionHeader
          tag="Hubungi Kami"
          title="Siap Menemukan Kost Impian Anda?"
          subtitle="Hubungi kami sekarang untuk informasi lebih lanjut atau jadwalkan kunjungan langsung ke lokasi kost kami."
          dark
        />

        {/* Contact cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-10 w-full max-w-3xl mb-10">
          {cards.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-3 bg-[#3D3530] rounded-2xl py-6 px-8"
            >
              <Icon className="w-6 h-6 text-accent-primary" />
              <span className="font-[family-name:var(--font-body)] text-xs font-medium text-fg-muted">
                {label}
              </span>
              <span className="font-[family-name:var(--font-body)] text-[15px] font-semibold text-fg-inverse text-center">
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <WhatsAppButton
          phoneNumber={contact.whatsapp}
          message={contact.greeting}
          variant="accent"
          className="rounded-full px-12 py-4 font-[family-name:var(--font-body)] text-base font-semibold w-full lg:w-auto"
        >
          <MessageCircle className="w-5 h-5" />
          Hubungi via WhatsApp
        </WhatsAppButton>
      </div>
    </section>
  );
}
