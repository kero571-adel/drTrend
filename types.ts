export type ProductCategory = "tops" | "bottoms" | "sets" | "accessories";
export type Gender = "men" | "women" | "unisex";

export interface ProductColor {
  name: string;
  hex: string;
  images: string[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  gender: Gender;
  price: number;
  description: string;
  longDescription: string;
  features: string[];
  fabricAndCare: string;
  colors: ProductColor[];
  sizes: string[];
  images: string[];
  isBestSeller: boolean;
  isNewArrival: boolean;
  stock: number;
  createdAt: string;
}

export interface CartItem {
  productId: string;
  name: string;
  slug: string;
  color: string;
  colorHex: string;
  size: string;
  quantity: number;
  unitPrice: number;
  image: string;
}

export interface Order {
  orderId: string;
  userId: string;
  userEmail: string;
  items: (CartItem & { totalPrice: number })[];
  subtotal: number;
  shipping: number;
  total: number;

  paymobOrderId?: number;
  transactionId?: string;
  grandTotal: number;
  placedAt: string;

  // ← ضيف الفيلدز دي الجديدة
  productPaymentMethod: "cash" | "online";
  amountDueOnline: number;
  amountDueOnDelivery: number;
  paymentStatus: "pending" | "paid" | "failed";

  address: {
    fullName: string;
    phone: string;
    governorate: string;
    city: string;
    detailedAddress: string;
  };
  customer: {
    name: string;
    phone: string;
    governorate: string;
    govLabel: string;
    city: string;
    address: string;
  };
  status: "pending" | "processing" | "shipped" | "delivered";
  createdAt: string;
}

export interface User {
  uid: string;
  name: string;
  email: string;
  photoURL?: string | null;
  createdAt: string;
}
