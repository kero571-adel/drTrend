import type { Metadata } from "next";
import type { Viewport } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";

export const metadata: Metadata = {
  title: "Dr Trend — Premium Medical Apparel",
  description:
    "Dr Trend — Premium medical scrubs, apparel and accessories for doctors, nurses, and healthcare heroes in Egypt.",
  openGraph: {
    title: "Dr Trend — Premium Medical Apparel",
    description: "Dress like a professional. Feel like one too.",
    images: ["/images/hero.jpg"],
  },
  themeColor: "#1a7a6e",
};

export const viewport: Viewport = {
  themeColor: "#1a7a6e",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Urbanist:wght@600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
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
