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

        {/* <div className="relative z-10 text-center px-4 max-w-4xl">
          <Link
            href="/shop"
            className="inline-block mt-10 px-8 py-3.5 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition-colors"
          >
            Shop Now
          </Link>
        </div> */}
        <div
          className="absolute bottom-15 md:bottom-15 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/80 cursor-pointer hover:text-white transition-colors"
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
    </>
  );
}
