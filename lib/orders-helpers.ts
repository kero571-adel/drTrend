// ضيف الدالة دي في lib/orders.ts (جنب دالة saveOrder الموجودة عندك)

import { collectionGroup, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase"; // عدّل المسار حسب مكان إعداد firebase عندك
import type { Order } from "@/types";

/**
 * يجيب أوردر واحد بالـ orderId (مش الـ Firestore document id بتاع Firebase،
 * ده الـ orderId العشوائي اللي بنولده في الـ checkout)
 *
 * ملحوظة: بيستخدم collectionGroup عشان لو الأوردرات متخزنة تحت
 * users/{uid}/orders/{docId} مش في collection واحدة على مستوى الـ root.
 * لو عندك الأوردرات في collection واحدة اسمها "orders" في الـ root،
 * استبدل الجزء ده بـ: query(collection(db, "orders"), where("orderId", "==", orderId))
 */
export async function getOrderById(orderId: string): Promise<Order | null> {
  const ordersQuery = query(
    collectionGroup(db, "orders"),
    where("orderId", "==", orderId)
  );

  const snapshot = await getDocs(ordersQuery);

  if (snapshot.empty) return null;

  const docSnap = snapshot.docs[0];
  return { ...(docSnap.data() as Order), _docRef: docSnap.ref } as Order & {
    _docRef: typeof docSnap.ref;
  };
}

/**
 * يحدّث حالة الدفع لأوردر معين بناءً على orderId
 * دي اللي هتستخدمها جوا الـ webhook بعد التأكد من الـ HMAC
 */
export async function updateOrderPaymentStatus(
  orderId: string,
  updates: {
    paymentStatus: "paid" | "failed";
    transactionId?: string;
    paymobOrderId?: number;
  }
) {
  const order = await getOrderById(orderId);
  if (!order) {
    throw new Error(`Order ${orderId} not found`);
  }

  const docRef = (order as any)._docRef;
  await updateDoc(docRef, updates);
}