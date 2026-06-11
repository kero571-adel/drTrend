"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getProductBySlug } from "@/data/products";
import ImageGallery from "@/components/product/ImageGallery";
import Accordion from "@/components/product/Accordion";
import SizeGuideModal from "@/components/product/SizeGuideModal";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { formatEGP } from "@/lib/shipping";

export default function ProductDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const product = slug ? getProductBySlug(slug) : undefined;

  const { addItem } = useCart();
  const { showToast } = useToast();

  // key: size, value: quantity (0 = not selected)
  const [sizeQuantities, setSizeQuantities] = useState<Record<string, number>>({});
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mainImage = useMemo(() => {
    if (!product) return "";
    return product.colors[0]?.images[0] || product.images[0] || "";
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h1 className="font-heading font-bold text-3xl mb-3">
          Product Not Found
        </h1>
        <p className="text-gray-500 mb-8">
          The product you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/shop"
          className="inline-block px-6 py-3 bg-primary text-white rounded-full"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  const defaultColor = product.colors[0];
  const thumbImages = [
    ...(defaultColor.images.length > 1 ? defaultColor.images.slice(1) : []),
    ...product.images.filter((i) => i !== defaultColor.images[0]),
  ].slice(0, 3);

  const updateSizeQty = (size: string, qty: number) => {
    setSizeQuantities((prev) => ({ ...prev, [size]: Math.max(0, qty) }));
    setError(null);
  };

  const totalItems = Object.values(sizeQuantities).reduce(
    (sum, q) => sum + q,
    0
  );

  const handleAddToCart = () => {
    const selectedSizes = Object.entries(sizeQuantities).filter(
      ([, qty]) => qty > 0
    );

    if (selectedSizes.length === 0) {
      setError("Please select at least one size");
      return;
    }

    setError(null);

    selectedSizes.forEach(([size, qty]) => {
      addItem({
        productId: product.id,
        name: product.name,
        slug: product.slug,
        color: defaultColor.name,
        colorHex: defaultColor.hex,
        size,
        quantity: qty,
        unitPrice: product.price,
        image: defaultColor.images[0] || product.images[0] || "",
      });
    });

    showToast(`${product.name} added to cart`, "success");
    setSizeQuantities({}); // ← reset كل المقاسات لصفر
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-10 lg:gap-14">
        <ImageGallery images={thumbImages} mainImage={mainImage} />

        <div>
          <nav className="text-xs text-gray-500 mb-4 flex items-center gap-1.5">
            <Link href="/shop" className="hover:text-primary capitalize">
              {product.gender}
            </Link>
            <span>/</span>
            <span>Scrubs</span>
            <span>/</span>
            <span className="capitalize text-primary">{product.category}</span>
          </nav>

          <h1 className="font-heading font-bold text-2xl md:text-3xl text-gray-900 mb-3">
            {product.name}
          </h1>
          <p className="text-primary font-heading font-bold text-2xl md:text-3xl mb-5">
            {formatEGP(product.price)}
          </p>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8">
            {product.description}
          </p>

          {/* Size + per-size quantity */}
          <div className="mb-7">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                Size &amp; Quantity
              </span>
              <button
                onClick={() => setSizeGuideOpen(true)}
                className="text-xs text-primary font-semibold hover:underline"
              >
                Size Guide
              </button>
            </div>

            <div className="space-y-2">
              {product.sizes.map((s) => {
                const qty = sizeQuantities[s] ?? 0;
                const isActive = qty > 0;
                return (
                  <div
                    key={s}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg border transition-colors ${
                      isActive
                        ? "border-gray-900 bg-gray-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <span
                      className={`w-12 text-sm font-semibold ${
                        isActive ? "text-gray-900" : "text-gray-500"
                      }`}
                    >
                      {s}
                    </span>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateSizeQty(s, qty - 1)}
                        disabled={qty === 0}
                        className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 text-base leading-none hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      >
                        −
                      </button>
                      <span className="w-5 text-center text-sm font-semibold text-gray-900">
                        {qty}
                      </span>
                      <button
                        onClick={() => updateSizeQty(s, qty + 1)}
                        className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 text-base leading-none hover:border-primary hover:text-primary transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Add to cart */}
          <div className="mb-4">
            <button
              onClick={handleAddToCart}
              className="w-full bg-gray-900 hover:bg-black text-white font-semibold py-3.5 rounded-lg transition-colors"
            >
              {totalItems > 0
                ? `Add to Cart — ${totalItems} item${totalItems > 1 ? "s" : ""}`
                : "Add to Cart"}
            </button>
          </div>

          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          {/* Accordions */}
          <div>
            <Accordion title="Description" defaultOpen>
              <p className="mb-4">{product.longDescription}</p>
              <ul className="space-y-1.5">
                {product.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </Accordion>
        
            <Accordion title="Shipping & Returns">
              <p>
                Free shipping on orders over EGP 1,500. Standard delivery
                within 3–5 business days across Egypt.
              </p>
              <p className="mt-3">
                Hassle-free 30-day returns. If you&apos;re not satisfied,
                we&apos;ll make it right.
              </p>
            </Accordion>
          </div>

          {/* Trust badges */}
          <div className="mt-8 grid grid-cols-3 gap-3 pt-6 border-t border-gray-100">
            <TrustBadge icon="🚚" title="Free Shipping" sub="EGP 1,500+" />
            <TrustBadge icon="↩" title="30-Day Returns" sub="Hassle-free" />
            <TrustBadge icon="🔒" title="Secure Checkout" sub="Encrypted" />
          </div>
        </div>
      </div>

      <SizeGuideModal
        open={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
      />
    </div>
  );
}

function TrustBadge({
  icon,
  title,
  sub,
}: {
  icon: string;
  title: string;
  sub: string;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="text-xl mb-1">{icon}</div>
      <div className="text-xs font-semibold text-gray-900">{title}</div>
      <div className="text-[10px] text-gray-500 mt-0.5">{sub}</div>
    </div>
  );
}