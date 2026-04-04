import type { SiteSettings } from "@/lib/types";

export function buildLocalBusinessJsonLd(
  settings: SiteSettings,
  avgRating: number,
  reviewCount: number
) {
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: settings.site_name,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address,
      addressLocality: settings.city,
      addressCountry: "ID",
    },
    telephone: settings.phone_number,
    geo: {
      "@type": "GeoCoordinates",
      latitude: parseFloat(settings.latitude) || -6.2088,
      longitude: parseFloat(settings.longitude) || 106.8456,
    },
    priceRange: "$$",
  };

  if (settings.hero_image_url) {
    jsonLd.image = settings.hero_image_url;
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
