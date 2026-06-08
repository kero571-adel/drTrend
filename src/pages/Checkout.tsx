import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { GOVERNORATES, getShippingCost, formatEGP } from "../lib/shipping";
import type { Order } from "../types";

const STORAGE_KEY = "drtrend_saved_address";

interface Address {
  fullName: string;
  phone: string;
  governorate: string;
  city: string;
  detailedAddress: string;
}

const emptyAddress: Address = {
  fullName: "",
  phone: "",
  governorate: "",
  city: "",
  detailedAddress: "",
};

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [address, setAddress] = useState<Address>(emptyAddress);
  const [saveAddress, setSaveAddress] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof Address, string>>>({});

  // Load saved address
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setAddress(JSON.parse(raw));
        setSaveAddress(true);
      } catch {}
    }
  }, []);

  // Auth gate
  useEffect(() => {
    if (!user) {
      navigate("/auth/login?returnUrl=/checkout", { replace: true });
    }
    if (items.length === 0) {
      navigate("/cart", { replace: true });
    }
  }, [user, items.length, navigate]);

  if (!user || items.length === 0) return null;

  const shipping = address.governorate ? getShippingCost(address.governorate) : null;
  const total = shipping !== null ? subtotal + shipping : subtotal;

  const update = (k: keyof Address, v: string) => {
    setAddress((prev) => ({ ...prev, [k]: v }));
    setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const validate = () => {
    const e: Partial<Record<keyof Address, string>> = {};
    if (!address.fullName.trim()) e.fullName = "Full name is required";
    if (!address.phone.trim()) e.phone = "Phone number is required";
    else if (!/^01[0-9]{9}$/.test(address.phone.replace(/\s/g, "")))
      e.phone = "Enter a valid Egyptian phone number (01X XXXX XXXX)";
    if (!address.governorate) e.governorate = "Please select a governorate";
    if (!address.city.trim()) e.city = "City / district is required";
    if (!address.detailedAddress.trim()) e.detailedAddress = "Detailed address is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast("Please fix the form errors", "error");
      return;
    }
    setSubmitting(true);
    try {
      if (saveAddress) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(address));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }

      const order: Order = {
        orderId: Math.random().toString(36).slice(2, 10).toUpperCase(),
        userId: user.uid,
        userEmail: user.email,
        items: items.map((i) => ({ ...i, totalPrice: i.unitPrice * i.quantity })),
        subtotal,
        shipping: shipping || 0,
        total,
        address,
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      // Save orders to localStorage (simulating Firestore)
      const ordersKey = `drtrend_orders_${user.uid}`;
      const prev = JSON.parse(localStorage.getItem(ordersKey) || "[]");
      localStorage.setItem(ordersKey, JSON.stringify([order, ...prev]));

      clearCart();
      showToast("Order placed successfully!", "success");
      navigate("/orders?success=1");
    } catch (err) {
      showToast("Something went wrong. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-heading font-bold text-2xl md:text-3xl mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-10">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 space-y-5">
          <Field label="Full Name" error={errors.fullName}>
            <input
              type="text"
              value={address.fullName}
              onChange={(e) => update("fullName", e.target.value)}
              placeholder="Ahmed Mohamed"
              className={inputCls(!!errors.fullName)}
            />
          </Field>

          <Field label="Phone Number" error={errors.phone}>
            <input
              type="tel"
              value={address.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="01X XXXX XXXX"
              className={inputCls(!!errors.phone)}
            />
          </Field>

          <Field label="Governorate" error={errors.governorate}>
            <select
              value={address.governorate}
              onChange={(e) => update("governorate", e.target.value)}
              className={inputCls(!!errors.governorate)}
            >
              <option value="">Select governorate</option>
              {GOVERNORATES.map((g) => (
                <option key={g.name} value={g.name}>
                  {g.name}
                </option>
              ))}
            </select>
            {shipping !== null && (
              <p className="mt-2 text-xs text-primary font-medium">
                Shipping: {formatEGP(shipping)}
              </p>
            )}
          </Field>

          <Field label="City / District" error={errors.city}>
            <input
              type="text"
              value={address.city}
              onChange={(e) => update("city", e.target.value)}
              placeholder="Heliopolis, Maadi"
              className={inputCls(!!errors.city)}
            />
          </Field>

          <Field label="Detailed Address" error={errors.detailedAddress}>
            <textarea
              value={address.detailedAddress}
              onChange={(e) => update("detailedAddress", e.target.value)}
              rows={3}
              placeholder="15 Hassan El-Ma'moun St., Building 3, Floor 2, Apt 7"
              className={inputCls(!!errors.detailedAddress)}
            />
          </Field>

          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={saveAddress}
              onChange={(e) => setSaveAddress(e.target.checked)}
              className="w-4 h-4 accent-primary"
            />
            Save this address for future orders
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-primary hover:bg-primary-dark disabled:opacity-60 text-white font-semibold py-4 rounded-full transition-colors flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12a9 9 0 11-6.2-8.6" />
                </svg>
                Placing Order...
              </>
            ) : (
              <>Place Order · {formatEGP(total)}</>
            )}
          </button>
        </form>

        <div className="lg:sticky lg:top-24 h-fit">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-heading font-bold text-lg mb-5">Order Summary</h2>
            <div className="space-y-3 max-h-72 overflow-y-auto mb-4">
              {items.map((i) => (
                <div key={`${i.productId}-${i.color}-${i.size}`} className="flex gap-3">
                  <img src={i.image} alt={i.name} className="w-14 h-14 rounded-lg object-cover bg-gray-100" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{i.name}</p>
                    <p className="text-xs text-gray-500">{i.color} / {i.size}</p>
                    <p className="text-xs text-gray-500 mt-0.5">Qty: {i.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold">{formatEGP(i.unitPrice * i.quantity)}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">{formatEGP(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold">
                  {shipping !== null ? formatEGP(shipping) : "—"}
                </span>
              </div>
            </div>
            <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between items-center">
              <span className="font-heading font-bold">Total</span>
              <span className="font-heading font-bold text-xl text-primary">
                {formatEGP(total)}
              </span>
            </div>
            <p className="text-center text-xs text-gray-500 mt-4">🔒 Secure Checkout</p>
          </div>
          <div className="mt-4 text-center">
            <Link to="/cart" className="text-sm text-primary hover:underline">
              ← Back to Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function inputCls(error: boolean) {
  return `w-full px-4 py-3 bg-white border ${
    error ? "border-red-400" : "border-gray-200"
  } rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors`;
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
        {label}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1.5">{error}</p>}
    </div>
  );
}
