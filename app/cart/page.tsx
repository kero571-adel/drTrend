"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import QuantityStepper from "@/components/product/QuantityStepper";
import { formatEGP } from "@/lib/shipping";

export default function Cart() {
  const { items, updateQuantity, removeItem, subtotal, totalItems } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const handleCheckout = () => {
    if (!user) {
      router.push("/auth/login?returnUrl=/checkout");
    } else {
      router.push("/checkout");
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="font-heading font-bold text-3xl mb-3">
          Your cart is empty
        </h1>
        <p className="text-gray-500 mb-8">
          Looks like you haven&apos;t added anything yet.
        </p>
        <Link
          href="/shop"
          className="inline-block px-7 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-heading font-bold text-2xl md:text-3xl mb-8">
        Your Cart ({totalItems})
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-10">
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={`${item.productId}-${item.color}-${item.size}`}
              className="bg-white rounded-xl border border-gray-200 p-4 flex gap-4 relative"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded-lg object-cover bg-gray-100 flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {item.color} / {item.size}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      removeItem(item.productId, item.color, item.size)
                    }
                    className="text-gray-400 hover:text-red-500 p-1 self-start"
                    aria-label="Remove"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                      <path d="M10 11v6M14 11v6" />
                    </svg>
                  </button>
                </div>
                <div className="flex items-center justify-between mt-3 gap-3">
                  <QuantityStepper
                    value={item.quantity}
                    onChange={(v) =>
                      updateQuantity(item.productId, item.color, item.size, v)
                    }
                  />
                  <span className="font-semibold text-gray-900">
                    {formatEGP(item.unitPrice * item.quantity)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:sticky lg:top-24 h-fit">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 className="font-heading font-bold text-xl mb-5">
              Order Summary
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">{formatEGP(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-500">Calculated at checkout</span>
              </div>
            </div>
            <div className="border-t border-gray-100 my-5" />
            <div className="flex justify-between items-center mb-6">
              <span className="font-heading font-bold text-lg">Total</span>
              <span className="font-heading font-bold text-xl text-primary">
                {formatEGP(subtotal)}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3.5 rounded-full transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
