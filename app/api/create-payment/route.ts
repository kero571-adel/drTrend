
import { getOrderById } from "@/lib/orders";
export async function POST(req: Request) {
  const { orderId, amount, customer } = await req.json();

  // 1) هات الأوردر الحقيقي من Firestore
  const order = await getOrderById(orderId);
  if (!order) {
    return Response.json({ error: "Order not found" }, { status: 404 });
  }

  // 2) احسب المبلغ الصح بنفسك من بيانات الأوردر المحفوظة، ومتصدقش الـ amount الجاي من الفرونت
  const realAmountDueOnline = order.amountDueOnline;

  if (Math.abs(realAmountDueOnline - amount) > 0.01) {
    // فيه تلاعب أو خطأ في الحساب - نرفض الطلب
    return Response.json({ error: "Amount mismatch" }, { status: 400 });
  }

  // 3) Authentication
  const authRes = await fetch("https://accept.paymob.com/api/auth/tokens", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ api_key: process.env.PAYMOB_API_KEY }),
  });
  const { token } = await authRes.json();

  // 4) Order Registration
  const orderRes = await fetch(
    "https://accept.paymob.com/api/ecommerce/orders",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        auth_token: token,
        delivery_needed: false,
        amount_cents: Math.round(realAmountDueOnline * 100),
        currency: "EGP",
        merchant_order_id: orderId, // ده أهم فيلد - بيربط عملية الدفع بالأوردر بتاعك
        items: [],
      }),
    }
  );
  const { id: paymobOrderId } = await orderRes.json();

  // 5) Payment Key Request
  const paymentKeyRes = await fetch(
    "https://accept.paymob.com/api/acceptance/payment_keys",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        auth_token: token,
        amount_cents: Math.round(realAmountDueOnline * 100),
        expiration: 3600,
        order_id: paymobOrderId,
        billing_data: {
          first_name: customer.firstName,
          last_name: customer.lastName,
          email: customer.email,
          phone_number: customer.phone,
          city: "NA",
          country: "NA",
          state: "NA",
          apartment: "NA",
          floor: "NA",
          street: "NA",
          building: "NA",
        },
        currency: "EGP",
        integration_id: process.env.PAYMOB_INTEGRATION_ID,
      }),
    }
  );
  const { token: paymentToken } = await paymentKeyRes.json();

  const iframeId = process.env.PAYMOB_IFRAME_ID; // من Paymob Dashboard > Payment Integrations
  const iframeUrl = `https://accept.paymob.com/api/acceptance/iframes/${iframeId}?payment_token=${paymentToken}`;

  return Response.json({ iframeUrl });
}
