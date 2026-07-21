"use client";
import { Suspense, useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { fetchOrders } from "@/lib/orders";
import type { Order } from "@/types";
import { formatEGP } from "@/lib/shipping";

type FilterStatus = Order["status"] | "all";

const STATUS_CONFIG: Record<
  FilterStatus,
  { label: string; dot: string; badge: string }
> = {
  all: {
    label: "All",
    dot: "bg-gray-400",
    badge: "bg-gray-100 text-gray-700 border-gray-200",
  },
  pending: {
    label: "Pending",
    dot: "bg-yellow-400",
    badge: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },
  processing: {
    label: "Processing",
    dot: "bg-blue-400",
    badge: "bg-blue-50 text-blue-700 border-blue-200",
  },
  shipped: {
    label: "Shipped",
    dot: "bg-orange-400",
    badge: "bg-orange-50 text-orange-700 border-orange-200",
  },
  delivered: {
    label: "Delivered",
    dot: "bg-green-400",
    badge: "bg-green-50 text-green-700 border-green-200",
  },
};
const FILTERS: FilterStatus[] = [
  "all",
  "pending",
  "processing",
  "shipped",
  "delivered",
];

function OrderSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 md:p-6 animate-pulse">
      <div className="flex gap-4">
        <div className="w-16 h-16 rounded-lg bg-gray-200 flex-shrink-0" />
        <div className="flex-1 space-y-2.5 py-1">
          <div className="h-3 bg-gray-200 rounded w-24" />
          <div className="h-4 bg-gray-200 rounded w-36" />
          <div className="h-3 bg-gray-200 rounded w-48" />
        </div>
        <div className="flex flex-col items-end gap-2 py-1">
          <div className="h-5 bg-gray-200 rounded-full w-20" />
          <div className="h-4 bg-gray-200 rounded w-16" />
        </div>
      </div>
    </div>
  );
}

function OrdersContent() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToast();

  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterStatus>("all");

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.replace("/auth/login?returnUrl=/orders");
      return;
    }

    async function load() {
      try {
        const data = await fetchOrders(user!.uid);
        setOrders(data);
      } catch (err) {
        console.error("Failed to load orders:", err);
      } finally {
        setOrdersLoading(false);
      }
    }

    load();

    if (searchParams.get("success")) {
      showToast("Order placed successfully!", "success");
    }
  }, [user, authLoading, router, searchParams, showToast]);

  // ✅ النوع معرّف في الـ return type مش بـ "as" عشان نتجنب مشكلة TSX
  const counts = useMemo((): Record<FilterStatus, number> => {
    const c: Record<FilterStatus, number> = {
      all: orders.length,
      pending: 0,
      processing: 0,
      shipped: 0,
      delivered: 0,
    };
    orders.forEach((o) => {
      c[o.status]++;
    });
    return c;
  }, [orders]);

  const filteredOrders = useMemo(
    () =>
      activeFilter === "all"
        ? orders
        : orders.filter((o) => o.status === activeFilter),
    [orders, activeFilter]
  );

  if (authLoading || ordersLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="h-8 bg-gray-200 rounded w-44 mb-2 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-24 mb-8 animate-pulse" />
        <div className="flex gap-2 mb-6">
          {[80, 80, 104, 80, 96].map((w, i) => (
            <div
              key={i}
              className="h-9 bg-gray-200 rounded-full animate-pulse"
              style={{ width: w }}
            />
          ))}
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <OrderSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!user) return null;

  if (orders.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-5 text-4xl">
          📦
        </div>
        <h1 className="font-heading font-bold text-2xl mb-3">No orders yet</h1>
        <p className="text-gray-500 mb-8">
          Start shopping to see your orders here.
        </p>
        <Link
          href="/shop"
          className="inline-block px-7 py-3 bg-gray-900 text-white rounded-full font-semibold hover:bg-black transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-heading font-bold text-2xl md:text-3xl">
          My Orders
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {orders.length} order{orders.length !== 1 ? "s" : ""} total
        </p>
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        {FILTERS.map((f) => {
          const { label, dot } = STATUS_CONFIG[f];
          const isActive = activeFilter === f;
          const count = counts[f];
          if (f !== "all" && count === 0) return null;
          return (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                isActive
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
              }`}
            >
              {f !== "all" && (
                <span
                  className={`w-2 h-2 rounded-full ${
                    isActive ? "bg-white/70" : dot
                  }`}
                />
              )}
              {label}
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Empty filtered state */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-4xl mb-3">🔍</div>
          <p className="font-semibold text-gray-700">
            No {STATUS_CONFIG[activeFilter].label.toLowerCase()} orders
          </p>
          <button
            onClick={() => setActiveFilter("all")}
            className="mt-3 text-sm text-primary hover:underline"
          >
            View all orders
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredOrders.map((order) => {
            const isOpen = expanded === order.orderId;
            const cfg = STATUS_CONFIG[order.status];

            return (
              <div
                key={order.orderId}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-sm transition-shadow"
              >
                {/* Card header */}
                <div className="p-5 md:p-6">
                  <div className="flex gap-4">
                    {/* {order.items[0]?.image && (
                      <img
                        src={order.items[0].image}
                        alt={order.items[0].name}
                        className="w-16 h-16 md:w-20 md:h-20 rounded-lg object-cover bg-gray-100 flex-shrink-0"
                      />
                    )} */}

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <p className="text-xs text-gray-400 mb-0.5">
                            {new Date(order.createdAt).toLocaleDateString(
                              "en-GB",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </p>
                          <h3 className="font-heading font-bold">
                            #{order.orderId}
                          </h3>
                        </div>
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border flex-shrink-0 ${cfg.badge}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`}
                          />
                          {cfg.label}
                        </span>
                      </div>

                      <p className="text-sm text-gray-500 mt-2 truncate">
                        {order.items[0]?.name}
                        {order.items.length > 1 && (
                          <span className="text-gray-400">
                            {" "}
                            +{order.items.length - 1} more
                          </span>
                        )}
                      </p>

                      <div className="flex items-center justify-between mt-3">
                        <p className="font-heading font-bold text-primary text-lg">
                          {formatEGP(order.total)}
                        </p>
                        <button
                          onClick={() =>
                            setExpanded(isOpen ? null : order.orderId)
                          }
                          className="flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors"
                        >
                          {isOpen ? "Hide" : "Details"}
                          <svg
                            className={`transition-transform duration-200 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded details */}
                {isOpen && (
                  <div className="border-t border-gray-100 bg-gray-50 animate-fadeIn">
                    <div className="p-5 md:p-6">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                        Items
                      </p>
                      <div className="space-y-3">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex gap-3 items-center">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-14 h-14 rounded-lg object-cover bg-gray-100 flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold truncate">
                                {item.name}
                              </p>
                              <p className="text-xs text-gray-500 mt-0.5">
                                Size: {item.size} · Qty: {item.quantity}
                              </p>
                            </div>
                            <p className="text-sm font-semibold flex-shrink-0">
                              {formatEGP(item.totalPrice)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-gray-100 mx-5 md:mx-6" />

                    <div className="p-5 md:p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                          Delivery Address
                        </p>
                        <p className="font-semibold text-gray-900">
                          {order.address.fullName}
                        </p>
                        <p className="text-gray-500">{order.address.phone}</p>
                        <p className="text-gray-600 mt-1">
                          {order.address.governorate}, {order.address.city}
                        </p>
                        <p className="text-gray-500 text-xs mt-0.5">
                          {order.address.detailedAddress}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                          Cost Breakdown
                        </p>
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-gray-500">
                            <span>Subtotal</span>
                            <span>{formatEGP(order.subtotal)}</span>
                          </div>
                          <div className="flex justify-between text-gray-500">
                            <span>Shipping</span>
                            <span>{formatEGP(order.shipping)}</span>
                          </div>
                          <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-200">
                            <span>Total</span>
                            <span className="text-primary">
                              {formatEGP(order.total)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Orders() {
  return (
    <Suspense>
      <OrdersContent />
    </Suspense>
  );
}
