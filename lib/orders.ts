import { db } from "@/firebase";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  where,
  query,
  orderBy,
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