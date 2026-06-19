"use client";

import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { getBestSellers } from "@/data/products";
import Image from "next/image";
export default function Home() {
  const bestSellers = getBestSellers();
  const { addItem } = useCart();
  const { showToast } = useToast();

  const handleAdd = (product: (typeof bestSellers)[number]) => {
    const firstColor = product.colors[0];
    const size = product.sizes.find((s) => s === "M") || product.sizes[0];
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      color: firstColor.name,
      colorHex: firstColor.hex,
      size,
      quantity: 1,
      unitPrice: product.price,
      image: firstColor.images[0] || product.images[0] || "",
    });
    showToast(`${product.name} added to cart`, "success");
  };

  const handleScrollDown = () => {
    const nextSection = document.querySelector(".py-16");
    nextSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/hero/imageHero.png"
          alt="hero"
          width={1920}
          height={1080}
          priority
          className="md:hidden absolute inset-0 w-full h-full object-cover"
        />
        <Image
          src="/hero/imageHeroDesktop.png"
          alt="hero"
          width={1920}
          height={1080}
          priority
          className="hidden md:block absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 to-black/30" />

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <span className="inline-block text-[#0fffe1] font-semibold text-xs md:text-sm tracking-[0.3em] uppercase mb-4">
            You Save Lives.
          </span>
          <h1 className="font-heading font-bold text-white text-3xl lg:text-7xl leading-[1.05]">
            Look the Part.
            <br />
            Premium scrubs and medical coats,
          </h1>
          <p className="mt-6 text-white/90 text-base md:text-lg max-w-2xl mx-auto">
            crafted for Egypt&apos;s finest doctors and nurses.
          </p>
          <Link
            href="/shop"
            className="inline-block mt-8 px-8 py-3.5 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition-colors"
          >
            Shop Now
          </Link>
        </div>

        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/80 cursor-pointer hover:text-white transition-colors"
          onClick={handleScrollDown}
        >
          <span className="text-xs uppercase tracking-widest">
            Scroll to explore
          </span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="animate-bounceDown"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </section>

      {/* Best Sellers ─────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-heading font-bold text-2xl md:text-4xl text-gray-900">
                Our Best Sellers
              </h2>
            </div>
            <Link
              href="/shop"
              className=" sm:inline-flex items-center px-5 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-full hover:border-primary hover:text-primary transition-colors"
            >
              Shop All
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {bestSellers.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onAddToCart={() => handleAdd(p)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features ─────────────────────────────────────────────────────────── */}
      <section className="bg-dark-section text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0">
            <Feature
              icon={
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2l8 4v6c0 5-3.5 9.3-8 10-4.5-.7-8-5-8-10V6l8-4z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
              }
              title="Premium Fabric"
              description="Advanced moisture-wicking and anti-microbial technology."
              border
            />
            <Feature
              icon={
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="1" y="3" width="15" height="13" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              }
              title="Free Delivery"
              description="Complimentary shipping on all orders over EGP 1,500."
              border
            />
            <Feature
              icon={
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="1 4 1 10 7 10" />
                  <path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
                  <polyline points="23 20 23 14 17 14" />
                  <path d="M20.49 9A9 9 0 1018.36 18.36L23 14" />
                </svg>
              }
              title="Easy Returns"
              description="Hassle-free 14-day return policy for peace of mind."
            />
          </div>
        </div>
      </section>
    </>
  );
}

function Feature({
  icon,
  title,
  description,
  border,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  border?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center text-center px-4 md:px-8 ${
        border ? "md:border-r md:border-white/10" : ""
      }`}
    >
      <div className="w-12 h-12 text-primary flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-heading font-bold text-lg md:text-xl mb-2">
        {title}
      </h3>
      <p className="text-gray-400 text-sm max-w-xs">{description}</p>
    </div>
  );
}
