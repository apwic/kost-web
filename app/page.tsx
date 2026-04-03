import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Facilities from "@/components/landing/Facilities";
import RoomTypes from "@/components/landing/RoomTypes";
import GalleryPreview from "@/components/landing/GalleryPreview";
import Testimonials from "@/components/landing/Testimonials";
import ContactCTA from "@/components/landing/ContactCTA";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-surface-primary text-fg-primary">
      <Navbar />
      <Hero />
      <Facilities />
      <RoomTypes />
      <GalleryPreview />
      <Testimonials />
      <ContactCTA />
      <Footer />
    </main>
  );
}
