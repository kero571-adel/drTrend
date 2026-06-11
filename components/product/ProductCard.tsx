"use client";

import Link from "next/link";
import type { Product } from "@/types";
import { formatEGP } from "@/lib/shipping";

interface Props {
  product: Product;
  onAddToCart?: () => void;
}

export default function ProductCard({ product, onAddToCart }: Props) {
  const firstColor = product.colors[0];
  const image = firstColor?.images[0] || product.images[0] || "";

  return (
    <div className="group flex flex-col">
      <Link
        href={`/shop/${product.slug}`}
        className="relative aspect-[4/5] rounded-lg overflow-hidden bg-gray-100 mb-3 block"
      >
        <img
          src={image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        {product.isNewArrival && (
          <span className="absolute top-3 left-3 bg-primary text-white text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
            New
          </span>
        )}
        {product.isBestSeller && !product.isNewArrival && (
          <span className="absolute top-3 left-3 bg-gray-900 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
            Best Seller
          </span>
        )}
      </Link>
      <div className="flex-1">
        <p className="text-[11px] uppercase tracking-widest text-gray-500 mb-1">
          {product.category}
        </p>
        <Link href={`/shop/${product.slug}`} className="block">
          <h3 className="font-semibold text-gray-900 text-sm md:text-base leading-tight line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-primary font-semibold text-sm mt-1">
          {formatEGP(product.price)}
        </p>
        <Link href={`/shop/${product.slug}`} className="block">
          <button className="mt-3 w-full bg-gray-900 hover:bg-black text-white text-xs font-semibold py-2.5 rounded-md transition-colors cursor-pointer">
            Show Details
          </button>
        </Link>
      </div>
    </div>
  );
}
