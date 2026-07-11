"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { getOrderById } from "@/lib/orders";
import { formatEGP } from "@/lib/shipping";
import { purchase } from "@/lib/fpixel";
import type { Order } from "@/types";
// ← الكومبوننت الرئيسي اللي بيتصدّر لازم يلف الجزء اللي فيه useSearchParams بـ Suspense
export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <p className="text-gray-500 text-sm">Loading...</p>
        </div>
      }
    >
      <CheckoutSuccess />
    </Suspense>
  );
}

// ← ده نفس الكومبوننت بتاعك بالظبط، بس دلوقتي مش هو المُصدَّر مباشرة
function CheckoutSuccess() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { clearCart } = useCart();

  // Paymob بيرجع الـ merchant_order_id في query params بعد الـ redirect
  const orderId =
    searchParams.get("merchant_order_id") || searchParams.get("orderId");

  const [order, setOrder] = useState<Order | null>(null);
  const [status, setStatus] = useState<
    "checking" | "paid" | "pending" | "failed" | "not_found"
  >("checking");

  useEffect(() => {
    if (!orderId) {
      setStatus("not_found");
      return;
    }

    let attempts = 0;
    const maxAttempts = 6; // نحاول لمدة تقريبًا 12 ثانية (الـ webhook ممكن ياخد شوية وقت يوصل)

    const checkOrderStatus = async () => {
      try {
        const fetchedOrder = await getOrderById(orderId);

        if (!fetchedOrder) {
          setStatus("not_found");
          return;
        }

        setOrder(fetchedOrder);

        if (fetchedOrder.paymentStatus === "paid") {
          setStatus("paid");
          clearCart(); // نمسح السلة بس بعد التأكد الفعلي من نجاح الدفع

          // ← ضيف السطور دي - أهم حدث لفيسبوك، بيقيس عائد الإعلانات فعليًا
          purchase({
            orderId: fetchedOrder.orderId,
            items: fetchedOrder.items.map((i) => ({
              id: i.productId,
              quantity: i.quantity,
            })),
            value: fetchedOrder.total,
          });

          return;
        }

        if (fetchedOrder.paymentStatus === "failed") {
          setStatus("failed");
          return;
        }

        // لسه pending - الـ webhook ممكن يكون لسه موصلش، نعيد المحاولة
        attempts += 1;
        if (attempts < maxAttempts) {
          setTimeout(checkOrderStatus, 2000);
        } else {
          // بعد كل المحاولات لسه pending - نسيبها pending ونوضح للعميل
          setStatus("pending");
        }
      } catch {
        setStatus("not_found");
      }
    };

    checkOrderStatus();
  }, [orderId, clearCart]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      {status === "checking" && (
        <>
          <div className="mx-auto w-16 h-16 mb-6">
            <svg
              className="animate-spin text-primary"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 12a9 9 0 11-6.2-8.6" />
            </svg>
          </div>
          <h1 className="font-heading font-bold text-2xl mb-2">
            Confirming your payment...
          </h1>
          <p className="text-gray-500 text-sm">
            Please wait while we confirm your transaction with Paymob.
          </p>
        </>
      )}

      {status === "paid" && order && (
        <>
          <div className="mx-auto w-16 h-16 mb-6 rounded-full bg-green-100 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-green-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h1 className="font-heading font-bold text-2xl mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mb-1">
            Order <span className="font-semibold">#{order.orderId}</span> has
            been confirmed.
          </p>
          <p className="text-gray-500 text-sm mb-8">
            {order.amountDueOnDelivery > 0
              ? `Please prepare ${formatEGP(
                  order.amountDueOnDelivery,
                )} for the courier upon delivery.`
              : "Your order is fully paid. No amount due on delivery."}
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              href="/orders"
              className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-full transition-colors"
            >
              View My Orders
            </Link>
            <Link
              href="/"
              className="border border-gray-200 hover:border-gray-300 font-semibold py-3 px-6 rounded-full transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </>
      )}

      {status === "pending" && (
        <>
          <div className="mx-auto w-16 h-16 mb-6 rounded-full bg-yellow-100 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-yellow-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 8v4l3 3" />
              <circle cx="12" cy="12" r="9" />
            </svg>
          </div>
          <h1 className="font-heading font-bold text-2xl mb-2">
            Payment Still Processing
          </h1>
          <p className="text-gray-600 mb-8 text-sm">
            We're still confirming your payment with the bank. This can take a
            few minutes. You can check your order status later from your orders
            page — you don't need to pay again.
          </p>
          <Link
            href="/orders"
            className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-full transition-colors"
          >
            Check My Orders
          </Link>
        </>
      )}

      {status === "failed" && (
        <>
          <div className="mx-auto w-16 h-16 mb-6 rounded-full bg-red-100 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </div>
          <h1 className="font-heading font-bold text-2xl mb-2">
            Payment Failed
          </h1>
          <p className="text-gray-600 mb-8 text-sm">
            Your payment could not be completed. Your order has not been
            confirmed and no amount was charged.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => router.push("/checkout")}
              className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-full transition-colors"
            >
              Try Again
            </button>
            <Link
              href="/cart"
              className="border border-gray-200 hover:border-gray-300 font-semibold py-3 px-6 rounded-full transition-colors"
            >
              Back to Cart
            </Link>
          </div>
        </>
      )}

      {status === "not_found" && (
        <>
          <h1 className="font-heading font-bold text-2xl mb-2">
            Order Not Found
          </h1>
          <p className="text-gray-600 mb-8 text-sm">
            We couldn't find this order. If you completed a payment, please
            check your orders page or contact support.
          </p>
          <Link
            href="/orders"
            className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-full transition-colors"
          >
            View My Orders
          </Link>
        </>
      )}
    </div>
  );
}
