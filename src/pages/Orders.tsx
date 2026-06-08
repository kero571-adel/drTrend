import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import type { Order } from "../types";
import { formatEGP } from "../lib/shipping";

const statusColors: Record<Order["status"], string> = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-orange-100 text-orange-800",
  delivered: "bg-green-100 text-green-800",
};

export default function Orders() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { showToast } = useToast();

  const [orders, setOrders] = useState<Order[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      navigate("/auth/login?returnUrl=/orders", { replace: true });
      return;
    }
    const ordersKey = `drtrend_orders_${user.uid}`;
    const raw = localStorage.getItem(ordersKey);
    setOrders(raw ? JSON.parse(raw) : []);
    if (params.get("success")) {
      showToast("Order placed successfully!", "success");
    }
  }, [user, navigate, params, showToast]);

  if (!user) return null;

  if (orders.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <div className="text-6xl mb-4">📦</div>
        <h1 className="font-heading font-bold text-3xl mb-3">You haven't placed any orders yet.</h1>
        <p className="text-gray-500 mb-8">Start shopping to see your orders here.</p>
        <Link
          to="/shop"
          className="inline-block px-7 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-heading font-bold text-2xl md:text-3xl mb-8">My Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => {
          const isOpen = expanded === order.orderId;
          return (
            <div key={order.orderId} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="p-5 md:p-6">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 justify-between">
                  <div className="flex items-center gap-4 flex-wrap">
                    <h3 className="font-heading font-bold text-lg">Order #{order.orderId}</h3>
                    <span className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="font-heading font-bold text-primary">
                    {formatEGP(order.total)}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {order.items[0]?.name}
                  {order.items.length > 1 && ` and ${order.items.length - 1} more items`}
                </p>
                <button
                  onClick={() => setExpanded(isOpen ? null : order.orderId)}
                  className="mt-3 text-sm text-primary font-semibold hover:underline"
                >
                  {isOpen ? "Hide Details ↑" : "View Details ↓"}
                </button>
              </div>
              {isOpen && (
                <div className="border-t border-gray-100 p-5 md:p-6 bg-gray-50 animate-fadeIn">
                  <h4 className="font-semibold text-sm mb-3 uppercase tracking-wider text-gray-500">Items</h4>
                  <div className="space-y-3 mb-5">
                    {order.items.map((i, idx) => (
                      <div key={idx} className="flex gap-3 items-center">
                        <img src={i.image} alt={i.name} className="w-16 h-16 rounded-lg object-cover bg-gray-100" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold truncate">{i.name}</p>
                          <p className="text-xs text-gray-500">{i.color} / {i.size}</p>
                          <p className="text-xs text-gray-500">Qty: {i.quantity}</p>
                        </div>
                        <p className="text-sm font-semibold">{formatEGP(i.totalPrice)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Shipping</p>
                      <p className="font-semibold">{formatEGP(order.shipping)}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Delivery Address</p>
                      <p className="text-gray-800">
                        {order.address.fullName} — {order.address.phone}
                      </p>
                      <p className="text-gray-600">
                        {order.address.governorate}, {order.address.city}
                      </p>
                      <p className="text-gray-600 text-xs mt-1">{order.address.detailedAddress}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
