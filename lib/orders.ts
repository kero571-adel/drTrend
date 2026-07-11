import { db } from "@/firebase";
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  getDocs,
  where,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import type { Order } from "@/types";

/** استدعيه من صفحة checkout بعد تأكيد الأوردر */
export async function saveOrder(uid: string, order: Order): Promise<void> {
  const ref = doc(collection(db, "orders"), order.orderId);

  await setDoc(ref, {
    ...order,
    userId: uid,
  });
}

export async function fetchOrders(uid: string): Promise<Order[]> {
  const q = query(
    collection(db, "orders"),
    where("userId", "==", uid),
    orderBy("createdAt", "desc")
  );

  const snap = await getDocs(q);

  const STATUS_MAP: Record<string, Order["status"]> = {
    pending: "pending",
    processing: "processing",
    shipped: "shipped",
    SHIPPED: "shipped",
    delivered: "delivered",
    DELIVERED: "delivered",
    CANCELLED: "delivered",
  };

  return snap.docs.map((d) => {
    const data = d.data();
    return {
      ...data,
      status: STATUS_MAP[data.status] ?? "pending",
    } as Order;
  });
}

/**
 * يجيب أوردر واحد بالـ orderId (الكود العشوائي اللي بيتولد في الـ checkout،
 * مش الـ Firestore document id — بس عندنا هما نفس القيمة أصلاً لأن saveOrder
 * بيستخدم order.orderId كـ document id، فهنستخدم doc() مباشرة، أسرع من query)
 */
export async function getOrderById(orderId: string): Promise<Order | null> {
  const ref = doc(collection(db, "orders"), orderId);
  const snap = await getDocs(
    query(collection(db, "orders"), where("orderId", "==", orderId), limit(1))
  );

  if (snap.empty) return null;

  return snap.docs[0].data() as Order;
}

/**
 * يحدّث حالة الدفع لأوردر معين بناءً على orderId
 * بتستخدمها جوا الـ webhook بعد التأكد من الـ HMAC
 */
export async function updateOrderPaymentStatus(
  orderId: string,
  updates: {
    paymentStatus: "paid" | "failed";
    transactionId?: string;
    paymobOrderId?: number;
  }
): Promise<void> {
  // بما إن order.orderId هو نفسه الـ document id (زي ما هو مستخدم في saveOrder)
  // نقدر نروح على الـ doc مباشرة من غير ما نعمل query
  const ref = doc(collection(db, "orders"), orderId);
  await updateDoc(ref, updates);
}