import crypto from "crypto";
import { adminDb } from "@/lib/firebase-admin";

export async function POST(req: Request) {
  const body = await req.json();
  const receivedHmac = new URL(req.url).searchParams.get("hmac");

  const data = body.obj;

  // بناء الـ string بالترتيب المحدد في دوكيومنتيشن Paymob بالظبط
  const concatenatedString = [
    data.amount_cents,
    data.created_at,
    data.currency,
    data.error_occured,
    data.has_parent_transaction,
    data.id,
    data.integration_id,
    data.is_3d_secure,
    data.is_auth,
    data.is_capture,
    data.is_refunded,
    data.is_standalone_payment,
    data.is_voided,
    data.order.id,
    data.owner,
    data.pending,
    data.source_data.pan,
    data.source_data.sub_type,
    data.source_data.type,
    data.success,
  ].join("");

  const calculatedHmac = crypto
    .createHmac("sha512", process.env.PAYMOB_HMAC_SECRET!)
    .update(concatenatedString)
    .digest("hex");

  if (calculatedHmac !== receivedHmac) {
    // مهم جدًا: لو الـ HMAC مش متطابق، ممكن يكون حد بيحاول يزور طلب دفع
    return new Response("Invalid HMAC", { status: 401 });
  }

  // merchant_order_id هو الـ orderId بتاعك اللي بعتّه وقت إنشاء الأوردر في Paymob
  const merchantOrderId = data.order.merchant_order_id;

  try {
    const orderRef = adminDb.collection("orders").doc(merchantOrderId);

    if (data.success === true && data.pending === false) {
      await orderRef.update({
        paymentStatus: "paid",
        transactionId: String(data.id),
        paymobOrderId: data.order.id,
      });
    } else if (data.success === false) {
      await orderRef.update({
        paymentStatus: "failed",
        transactionId: String(data.id),
      });
    }
    // لو data.pending === true بس، سيبها من غير تحديث - لسه العملية شغالة
  } catch (err) {
    console.error("Failed to update order from webhook:", err);
    // برضو رجّع 200 لـ Paymob عشان ميعديش يعيد المحاولة بلا داعي،
    // بس سجّل الخطأ عندك عشان تراجعه يدويًا
  }

  return new Response("OK", { status: 200 });
}
