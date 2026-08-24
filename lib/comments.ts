import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase";
import type { Comment } from "@/types";

const COLLECTION = "comments";

export async function addComment(data: {
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  text: string;
}) {
  await addDoc(collection(db, COLLECTION), {
    ...data,
    createdAt: serverTimestamp(),
  });
}

export async function getProductComments(
  productId: string,
): Promise<Comment[]> {
  const q = query(
    collection(db, COLLECTION),
    where("productId", "==", productId),
    orderBy("createdAt", "desc"),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      productId: data.productId,
      userId: data.userId,
      userName: data.userName,
      rating: data.rating,
      text: data.text,
      createdAt: data.createdAt?.toDate
        ? data.createdAt.toDate().toISOString()
        : new Date().toISOString(),
    };
  });
}