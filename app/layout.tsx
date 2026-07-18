import type { Metadata } from "next";
import type { Viewport } from "next";
import { Urbanist, DM_Sans } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import PixelPageView from "@/components/PixelPageView";
import { FB_PIXEL_ID } from "@/lib/fpixel";
import { Suspense } from "react";

// ─── Fonts (self-hosted via next/font — removes render-blocking CDN request) ─
const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
  variable: "--font-urbanist",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-dm-sans",
});

// ─── Constants ────────────────────────────────────────────────────────────────
const SITE_URL = "https://dr-trend.vercel.app";
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1920&q=80";

// ─── SEO Keywords ─────────────────────────────────────────────────────────────
// Covers every realistic search variation (Arabic / English / mixed / misspelled)
// that a doctor or nurse in Egypt would type.
const SEO_KEYWORDS = [
  // English — primary
  "medical scrubs Egypt",
  "doctor scrubs Egypt",
  "nurse scrubs Egypt",
  "scrub suit Egypt",
  "surgical scrubs Egypt",
  "hospital scrubs Egypt",
  "medical uniform Egypt",
  "scrub set Egypt",
  "premium scrubs Egypt",
  "lab coat Egypt",
  "white coat doctor Egypt",
  "doctor coat Egypt",
  "medical coat Egypt",
  "scrubs Cairo",
  "scrubs Alexandria",
  // English — secondary / long-tail
  "buy scrubs online Egypt",
  "medical apparel Egypt",
  "healthcare uniform Egypt",
  "Dr Trend scrubs",
  "dr trend medical",
  "drtrend",
  // Arabic transliterated (how Arabs type Arabic words in English letters)
  "skrab tibbi",
  "skrab doctor",
  "skrab masry",
  "balta doctor",
  "ملابس طبية",
  "سكراب طبي",
  "سكراب دكتور",
  "سكراب ممرضة",
  "سكراب ممرض",
  "بالطو دكتور",
  "يونيفورم طبي",
  "يونيفورم مستشفى",
  "بدلة طبية",
  "جاكيت طبي",
  "سكراب مصر",
  "اسكراب طبي",
  "سكرب طبي",
  // Common misspellings (English)
  "scrab egypt",
  "scurb egypt",
  "skrub egypt",
  "scrub tabby egypt",
  "medical scurbs egypt",
].join(", ");

// ─── Page Metadata ────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  // Title template used by child pages: "Shop | Dr Trend", "Cart | Dr Trend", etc.
  title: {
    default: "Dr Trend — سكراب طبي | Medical Scrubs & Coats Egypt",
    template: "%s | Dr Trend",
  },

  description:
    "Dr Trend — أفضل سكراب طبي وبالطو دكتور في مصر. Premium medical scrubs, doctor coats & nurse uniforms for Egypt's healthcare professionals. سكراب ممرضة، يونيفورم طبي، ملابس طبية بجودة عالية. Fast delivery across Egypt.",

  keywords: SEO_KEYWORDS,

  // Canonical + alternates
  alternates: {
    canonical: SITE_URL,
    languages: {
      "en-EG": SITE_URL,
    },
  },

  // Open Graph (WhatsApp, Facebook, LinkedIn)
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Dr Trend",
    title: "Dr Trend — سكراب طبي | Medical Scrubs & Coats Egypt",
    description:
      "Premium medical scrubs & doctor coats for Egypt's healthcare heroes. سكراب طبي وبالطو دكتور بجودة عالية وشحن سريع.",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Dr Trend Medical Scrubs Egypt — سكراب طبي مصر",
      },
    ],
    locale: "ar_EG",
    alternateLocale: "en_EG",
  },

  // Twitter / X card
  twitter: {
    card: "summary_large_image",
    title: "Dr Trend — سكراب طبي | Medical Scrubs Egypt",
    description:
      "Premium medical scrubs & doctor coats for Egypt's healthcare heroes.",
    images: ["/images/hero.jpg"],
  },

  // Indexing + crawling
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Google verification (replace with your actual token)
  verification: {
    google: "X9IzHqOQ4S-f7N9QRJGzWXIOZTXCg5-dgr9i_3JFjL0",
  },

  // App metadata
  applicationName: "Dr Trend",
  authors: [{ name: "Dr Trend", url: SITE_URL }],
  creator: "Dr Trend",
  publisher: "Dr Trend",
  category: "Medical Apparel",
};

export const viewport: Viewport = {
  themeColor: "#1a7a6e",
};

// ─── JSON-LD Structured Data ──────────────────────────────────────────────────
// Tells Google exactly what this business is → enables rich results
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Dr Trend",
  alternateName: ["دكتور ترند", "Dr. Trend", "DrTrend"],
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  description:
    "Premium medical scrubs, doctor coats and nurse uniforms for healthcare professionals in Egypt. سكراب طبي وبالطو دكتور عالي الجودة للأطباء والتمريض في مصر.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "EG",
    addressLocality: "Cairo",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: ["Arabic", "English"],
  },
  sameAs: [
    // Add your actual social media URLs here:
    "https://www.facebook.com/share/1HQVqpvV7q/",
    // "https://www.facebook.com/drtrend",
    // "https://www.instagram.com/drtrend",
  ],
};

// WebSite schema enables Google Sitelinks Searchbox in results
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Dr Trend",
  url: SITE_URL,
  inLanguage: ["ar", "en"],
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/shop?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

// ─── Root Layout ──────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ar"
      dir="ltr"
      className={`${urbanist.variable} ${dmSans.variable}`}
    >
      {/*
        lang="ar" → signals to Google this targets Arabic speakers (Egypt)
        dir="ltr" → keep LTR since the site UI is in English
        Update tailwind.config fontFamily to use var(--font-urbanist) / var(--font-dm-sans)
      */}
      <head>
        {/* ── Preconnects ──────────────────────────────────────────────────────
            Lighthouse flagged these as missing — each costs 300-310 ms penalty */}
        <link rel="preconnect" href="https://drtrend-3b1f8.firebaseapp.com" />
        <link rel="dns-prefetch" href="https://drtrend-3b1f8.firebaseapp.com" />
        <link rel="preconnect" href="https://fastly.picsum.photos" />
        <meta
          name="google-site-verification"
          content="X9IzHqOQ4S-f7N9QRJGzWXIOZTXCg5-dgr9i_3JFjL0"
        />
        <link rel="dns-prefetch" href="https://fastly.picsum.photos" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />

        {/* ── Hero / LCP image preload ──────────────────────────────────────── */}
        <link
          rel="preload"
          as="image"
          href={HERO_IMAGE}
          // @ts-ignore — fetchPriority valid in modern browsers; TS types lag
          fetchPriority="high"
        />

        {/* ── JSON-LD Structured Data ───────────────────────────────────────── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body>
        {/* Meta Pixel Code */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${FB_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}

        <Suspense fallback={null}>
          <PixelPageView />
        </Suspense>
        <ToastProvider>
          <AuthProvider>
            <CartProvider>
              <div className="min-h-screen flex flex-col bg-background">
                <Navbar />
                <ScrollToTop />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            </CartProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
