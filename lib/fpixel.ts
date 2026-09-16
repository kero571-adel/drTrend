export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

declare global {
  interface Window {
    fbq: any;
  }
}

// بيتبع كل مرة يتغير فيها الـ route
export const pageview = () => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "PageView");
  }
};

// دالة عامة تبعت أي حدث قياسي لفيسبوك
const track = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", eventName, params);
  }
};

// ── الأحداث القياسية اللي فيسبوك بيحتاجها ──────────────────────────

/** لما العميل يفتح صفحة منتج معين */
export const viewContent = (product: {
  id: string;
  name: string;
  price: number;
  category?: string;
}) => {
  track("ViewContent", {
    content_ids: [product.id],
    content_name: product.name,
    content_type: "product",
    content_category: product.category,
    value: product.price,
    currency: "EGP",
  });
};

/** لما العميل يضيف منتج للسلة */
export const addToCart = (product: {
  id: string;
  name: string;
  price: number;
  quantity: number;
}) => {
  track("AddToCart", {
    content_ids: [product.id],
    content_name: product.name,
    content_type: "product",
    value: product.price * product.quantity,
    currency: "EGP",
  });
};

/** لما العميل يدخل صفحة الـ checkout */
export const initiateCheckout = (cart: {
  items: { id: string; quantity: number }[];
  subtotal: number;
  shipping: number;
  total: number;
}) => {
  track("InitiateCheckout", {
    content_ids: cart.items.map((i) => i.id),

    contents: cart.items.map((i) => ({
      id: i.id,
      quantity: i.quantity,
    })),

    num_items: cart.items.reduce((sum, item) => sum + item.quantity, 0),

    value: cart.subtotal,

    currency: "EGP",

    subtotal: cart.subtotal,
    shipping: cart.shipping,
  });
};

/** لما تتأكد عملية الدفع فعليًا (نجاح) */
export const purchase = (order: {
  orderId: string;
  items: { id: string; quantity: number }[];
  subtotal: number;
  shipping: number;
}) => {
  track("Purchase", {
    content_ids: order.items.map((i) => i.id),

    contents: order.items.map((i) => ({
      id: i.id,
      quantity: i.quantity,
    })),

    num_items: order.items.reduce((sum, item) => sum + item.quantity, 0),

    // قيمة المنتجات فقط بدون الشحن
    value: order.subtotal,

    currency: "EGP",

    // نحتفظ بهم كـ custom parameters
    subtotal: order.subtotal,
    shipping: order.shipping,

    order_id: order.orderId,
  });
};
