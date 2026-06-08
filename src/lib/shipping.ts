export const GOVERNORATES: { name: string; shipping: number }[] = [
  { name: "القاهرة", shipping: 35 },
  { name: "الجيزة", shipping: 35 },
  { name: "قليوبية", shipping: 35 },
  { name: "الإسكندرية", shipping: 45 },
  { name: "البحيرة", shipping: 45 },
  { name: "الغربية", shipping: 55 },
  { name: "المنوفية", shipping: 55 },
  { name: "الدقهلية", shipping: 55 },
  { name: "الشرقية", shipping: 55 },
  { name: "كفر الشيخ", shipping: 55 },
  { name: "دمياط", shipping: 55 },
  { name: "الإسماعيلية", shipping: 55 },
  { name: "الفيوم", shipping: 65 },
  { name: "بني سويف", shipping: 65 },
  { name: "المنيا", shipping: 65 },
  { name: "أسيوط", shipping: 65 },
  { name: "سوهاج", shipping: 65 },
  { name: "قنا", shipping: 65 },
  { name: "الأقصر", shipping: 65 },
  { name: "أسوان", shipping: 65 },
  { name: "بورسعيد", shipping: 75 },
  { name: "السويس", shipping: 75 },
  { name: "شمال سيناء", shipping: 75 },
  { name: "جنوب سيناء", shipping: 75 },
  { name: "البحر الأحمر", shipping: 75 },
  { name: "مطروح", shipping: 75 },
  { name: "الوادي الجديد", shipping: 75 },
];

export const getShippingCost = (governorate: string): number | null => {
  const g = GOVERNORATES.find((x) => x.name === governorate);
  return g ? g.shipping : null;
};

export const formatEGP = (amount: number) =>
  "EGP " + amount.toLocaleString("en-EG");
