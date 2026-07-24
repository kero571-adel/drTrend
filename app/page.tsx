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
      <section className="relative w-full h-[calc(100svh-4rem)] overflow-hidden bg-[#f5ede6]">
        {/* Mobile */}
        <Image
          src="/hero/imageHero.png"
          alt="Hero"
          fill
          priority
          sizes="100vw"
          className="md:hidden object-contain object-center"
        />

        {/* Desktop */}
        <Image
          src="/hero/imageHeroDesktop.png"
          alt="Hero"
          fill
          priority
          sizes="100vw"
          className="hidden md:block object-contain object-center"
        />

        {/* Scroll */}
        <button
          onClick={handleScrollDown}
          className="
      absolute
      bottom-9
      md:bottom-4
      left-1/2
      -translate-x-1/2
      z-20
      flex
      flex-col
      items-center
      text-gray-700
      hover:text-black
      transition
    "
        >
          <span
            className="text-[11px] md:text-xs uppercase tracking-[0.3em]"
            style={{ fontWeight: "bold" }}
          >
            Scroll to explore
          </span>

          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="mt-1 animate-bounceDown"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
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
              className="sm:inline-flex items-center px-5 py-2 text-white text-sm font-medium rounded-full hover:border-primary transition-colors bg-primary"
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
    </>
  );
}
