export const GOVERNORATES: { name: string; shipping: number }[] = [
  { name: "القاهرة", shipping: 95 },
  { name: "الجيزة", shipping: 95 },
  { name: "قليوبية", shipping: 95 },
  { name: "الإسكندرية", shipping: 95 },
  { name: "البحيرة", shipping: 95 },
  { name: "الغربية", shipping: 95 },
  { name: "المنوفية", shipping: 95 },
  { name: "الدقهلية", shipping: 95 },
  { name: "الشرقية", shipping: 55 },
  { name: "كفر الشيخ", shipping: 95 },
  { name: "دمياط", shipping: 95 },
  { name: "الإسماعيلية", shipping: 95 },
  { name: "الفيوم", shipping: 115 },
  { name: "بني سويف", shipping: 115 },
  { name: "المنيا", shipping: 115 },
  { name: "أسيوط", shipping: 115 },
  { name: "سوهاج", shipping: 115 },
  { name: "قنا", shipping: 115 },
  { name: "الأقصر", shipping: 115 },
  { name: "أسوان", shipping: 115 },
  { name: "بورسعيد", shipping: 95 },
  { name: "السويس", shipping: 95 },
  { name: "شمال سيناء", shipping: 75 },
  { name: "جنوب سيناء", shipping: 165 },
  { name: "البحر الأحمر", shipping: 165 },
  { name: "مطروح", shipping: 165 },
  { name: "الوادي الجديد", shipping: 165 },
  { name: "الغردقة", shipping: 165 },
  { name: "شرم الشيخ", shipping: 165 },
  { name: "الساحل الشمالي", shipping: 165 },
];

export const getShippingCost = (governorate: string): number | null => {
  const g = GOVERNORATES.find((x) => x.name === governorate);
  return g ? g.shipping : null;
};

export const formatEGP = (amount: number) =>
  "EGP " + amount.toLocaleString("en-EG");