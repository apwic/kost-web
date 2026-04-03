import type { SiteSetting } from "@/lib/types";

interface LocalBusinessSettings {
  kost_name?: string;
  address?: string;
  phone?: string;
  price_range?: string;
  latitude?: string;
  longitude?: string;
  image_url?: string;
}

function getSettingValue(
  settings: SiteSetting[],
  key: string,
  fallback: string
): string {
  const found = settings.find((s) => s.key === key);
  return found?.value || fallback;
}

export function buildLocalBusinessJsonLd(
  settings: SiteSetting[],
  avgRating: number,
  reviewCount: number
) {
  const name = getSettingValue(settings, "kost_name", "KostKu");
  const address = getSettingValue(
    settings,
    "address",
    "Jakarta Selatan, DKI Jakarta"
  );
  const phone = getSettingValue(settings, "phone", "+62-XXX-XXXX-XXXX");
  const priceRange = getSettingValue(settings, "price_range", "Rp 1.500.000 - Rp 3.500.000");
  const latitude = getSettingValue(settings, "latitude", "-6.2088");
  const longitude = getSettingValue(settings, "longitude", "106.8456");
  const imageUrl = getSettingValue(settings, "hero_image_url", "");

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name,
    address: {
      "@type": "PostalAddress",
      streetAddress: address,
      addressLocality: "Jakarta",
      addressCountry: "ID",
    },
    telephone: phone,
    geo: {
      "@type": "GeoCoordinates",
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    },
    priceRange,
  };

  if (imageUrl) {
    jsonLd.image = imageUrl;
  }

  if (reviewCount > 0) {
    jsonLd.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: avgRating.toFixed(1),
      reviewCount,
      bestRating: 5,
      worstRating: 1,
    };
  }

  return jsonLd;
}

export function buildBreadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
