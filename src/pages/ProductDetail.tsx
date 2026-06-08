import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductBySlug } from "../data/products";
import ImageGallery from "../components/product/ImageGallery";
import Accordion from "../components/product/Accordion";
import QuantityStepper from "../components/product/QuantityStepper";
import SizeGuideModal from "../components/product/SizeGuideModal";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { formatEGP } from "../lib/shipping";

export default function ProductDetail() {
  const { slug } = useParams();
  const product = slug ? getProductBySlug(slug) : undefined;

  const { addItem } = useCart();
  const { showToast } = useToast();

  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mainImage = useMemo(() => {
    if (!product) return "";
    return product.colors[selectedColorIdx]?.images[0] || product.images[0] || "";
  }, [product, selectedColorIdx]);

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h1 className="font-heading font-bold text-3xl mb-3">Product Not Found</h1>
        <p className="text-gray-500 mb-8">The product you're looking for doesn't exist.</p>
        <Link to="/shop" className="inline-block px-6 py-3 bg-primary text-white rounded-full">
          Back to Shop
        </Link>
      </div>
    );
  }

  const selectedColor = product.colors[selectedColorIdx];
  const thumbImages = [
    ...(selectedColor.images.length > 1 ? selectedColor.images.slice(1) : []),
    ...product.images.filter((i) => i !== selectedColor.images[0]),
  ].slice(0, 3);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError("Please select a size");
      return;
    }
    setError(null);
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      color: selectedColor.name,
      colorHex: selectedColor.hex,
      size: selectedSize,
      quantity,
      unitPrice: product.price,
      image: selectedColor.images[0] || product.images[0] || "",
    });
    showToast(`${product.name} added to cart`, "success");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-10 lg:gap-14">
        <ImageGallery images={thumbImages} mainImage={mainImage} />

        <div>
          <nav className="text-xs text-gray-500 mb-4 flex items-center gap-1.5">
            <Link to="/shop" className="hover:text-primary capitalize">{product.gender}</Link>
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

          {/* Color */}
          <div className="mb-7">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                Color: <span className="text-gray-900 ml-1">{selectedColor.name.toUpperCase()}</span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              {product.colors.map((c, i) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColorIdx(i)}
                  aria-label={c.name}
                  className={`w-8 h-8 rounded-full transition-all ${
                    selectedColorIdx === i ? "ring-2 ring-primary ring-offset-2" : ""
                  }`}
                  style={{ background: c.hex }}
                />
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mb-7">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                Size
              </span>
              <button
                onClick={() => setSizeGuideOpen(true)}
                className="text-xs text-primary font-semibold hover:underline"
              >
                Size Guide
              </button>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setSelectedSize(s);
                    setError(null);
                  }}
                  className={`py-2.5 text-sm font-semibold rounded-md border transition-colors ${
                    selectedSize === s
                      ? "bg-gray-900 text-white border-gray-900"
                      : "border-gray-200 text-gray-700 hover:border-primary hover:text-primary"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity + Add to cart */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <QuantityStepper value={quantity} onChange={setQuantity} />
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-gray-900 hover:bg-black text-white font-semibold py-3.5 rounded-lg transition-colors"
            >
              Add to Cart
            </button>
          </div>

          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <button
            onClick={() => showToast("Added to wishlist", "success")}
            className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-primary transition-colors mb-10"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
            Add to Wishlist
          </button>

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
            <Accordion title="Fabric & Care">
              <p>{product.fabricAndCare}</p>
            </Accordion>
            <Accordion title="Shipping & Returns">
              <p>Free shipping on orders over EGP 1,500. Standard delivery within 3–5 business days across Egypt.</p>
              <p className="mt-3">Hassle-free 30-day returns. If you're not satisfied, we'll make it right.</p>
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

      <SizeGuideModal open={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
    </div>
  );
}

function TrustBadge({ icon, title, sub }: { icon: string; title: string; sub: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="text-xl mb-1">{icon}</div>
      <div className="text-xs font-semibold text-gray-900">{title}</div>
      <div className="text-[10px] text-gray-500 mt-0.5">{sub}</div>
    </div>
  );
}
