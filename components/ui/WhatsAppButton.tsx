"use client";

import { generateWhatsAppUrl } from "@/lib/whatsapp";
import { trackEvent, EVENTS } from "@/lib/analytics";

interface WhatsAppButtonProps {
  phoneNumber: string;
  message: string;
  children: React.ReactNode;
  className?: string;
  variant?: "accent" | "green";
  fullWidth?: boolean;
  source?: string;
}

export default function WhatsAppButton({
  phoneNumber,
  message,
  children,
  className = "",
  variant = "green",
  fullWidth = false,
  source = "unknown",
}: WhatsAppButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium transition-colors";
  const variantStyles =
    variant === "green"
      ? "bg-green-500 hover:bg-green-600 text-white"
      : "bg-accent-primary hover:bg-accent-primary/90 text-fg-inverse";
  const widthStyles = fullWidth ? "w-full" : "";

  return (
    <a
      href={generateWhatsAppUrl(phoneNumber, message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseStyles} ${variantStyles} ${widthStyles} ${className}`}
      onClick={() => {
        trackEvent(EVENTS.WHATSAPP_CLICK, { source });
      }}
    >
      {children}
    </a>
  );
}
