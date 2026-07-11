// components/seo/ProductJsonLd.tsx
// Use this on each product page to get Google rich results (price, availability stars)
// Usage: <ProductJsonLd product={product} />

const SITE_URL = "https://dr-trend.vercel.app";

interface ProductJsonLdProps {
  product: {
    id: string;
    name: string;
    slug: string;
    description?: string;
    price: number;
    images: string[];
    inStock?: boolean;
  };
}

export default function ProductJsonLd({ product }: ProductJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    // Arabic name helps Google match Arabic searches to your product
    alternateName: product.name, // Add Arabic product name here if you have it
    description:
      product.description ||
      `${product.name} — Premium medical scrub / سكراب طبي عالي الجودة من Dr Trend مصر.`,
    image: product.images.map((img) =>
      img.startsWith("http") ? img : `${SITE_URL}${img}`
    ),
    url: `${SITE_URL}/shop/${product.slug}`,
    brand: {
      "@type": "Brand",
      name: "Dr Trend",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "EGP",
      price: product.price,
      availability: product.inStock !== false
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `${SITE_URL}/shop/${product.slug}`,
      seller: {
        "@type": "Organization",
        name: "Dr Trend",
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "EG",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          businessDays: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday", "Tuesday", "Wednesday", "Thursday", "Sunday",
            ],
          },
          cutoffTime: "16:00:00+02:00",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 1,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 3,
            unitCode: "DAY",
          },
        },
      },
    },
    // Add this block if you collect reviews
    // aggregateRating: {
    //   "@type": "AggregateRating",
    //   ratingValue: "4.8",
    //   reviewCount: "124",
    // },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}