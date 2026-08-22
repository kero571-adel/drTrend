"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const SCRUB_SIZE_DATA = [
  {
    size: "M",
    chest: "54 cm",
    topLength: "70 cm",
    waist: "38–48 cm",
    pantsLength: "100 cm",
  },
  {
    size: "L",
    chest: "57 cm",
    topLength: "72 cm",
    waist: "40–50 cm",
    pantsLength: "102 cm",
  },
  {
    size: "XL",
    chest: "60 cm",
    topLength: "74 cm",
    waist: "42–52 cm",
    pantsLength: "104 cm",
  },
  {
    size: "XXL",
    chest: "63 cm",
    topLength: "76 cm",
    waist: "44–54 cm",
    pantsLength: "106 cm",
  },
];

const COAT_SIZE_DATA = [
  {
    size: "S",
    chestWidth: "58 cm",
    coatCircumference: "116 cm",
    suitableHeight: "160–170 cm",
    approximateWeight: "50–65 kg",
  },
  {
    size: "M",
    chestWidth: "60 cm",
    coatCircumference: "120 cm",
    suitableHeight: "165–175 cm",
    approximateWeight: "60–75 kg",
  },
  {
    size: "L",
    chestWidth: "65 cm",
    coatCircumference: "130 cm",
    suitableHeight: "170–180 cm",
    approximateWeight: "75–95 kg",
  },
  {
    size: "XL",
    chestWidth: "70 cm",
    coatCircumference: "140 cm",
    suitableHeight: "175–190 cm",
    approximateWeight: "90–115 kg",
  },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SizeGuideModal({ open, onClose }: Props) {
  const pathname = usePathname();
  const isCoat = pathname.toLowerCase().includes("coat");
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl p-6 md:p-8 max-w-xl w-full animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-600"
          aria-label="Close"
        >
          ✕
        </button>
        <h2 className="font-heading font-bold text-2xl mb-2">Size Guide</h2>
        <p className="text-gray-500 text-sm mb-6">
          All measurements are in centimeters (cm)
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              {isCoat ? (
                <tr>
                  <th>Size</th>
                  <th>Chest Width</th>
                  <th>Coat Circumference</th>
                  <th>Suitable Height</th>
                  <th>Approx. Weight</th>
                </tr>
              ) : (
                <tr>
                  <th>Size</th>
                  <th>Chest</th>
                  <th>Waist</th>
                  <th>Top Length</th>
                  <th>Pants Length</th>
                </tr>
              )}
            </thead>
            <tbody>
              {isCoat
                ? COAT_SIZE_DATA.map((row) => (
                    <tr key={row.size} className="border-b border-gray-100">
                      <td className="py-3 pr-4 font-semibold text-center">
                        {row.size}
                      </td>

                      <td className="py-3 pr-4 text-gray-600 text-center">
                        {row.chestWidth}
                      </td>

                      <td className="py-3 pr-4 text-gray-600 text-center">
                        {row.coatCircumference}
                      </td>

                      <td className="py-3 pr-4 text-gray-600 text-center">
                        {row.suitableHeight}
                      </td>

                      <td className="py-3 text-gray-600 text-center">
                        {row.approximateWeight}
                      </td>
                    </tr>
                  ))
                : SCRUB_SIZE_DATA.map((row) => (
                    <tr key={row.size} className="border-b border-gray-100">
                      <td className="py-3 pr-4 font-semibold text-center">
                        {row.size}
                      </td>
                      <td className="py-3 pr-4 text-gray-600 text-center">
                        {row.chest}
                      </td>
                      <td className="py-3 pr-4 text-gray-600 text-center">
                        {row.waist}
                      </td>
                      <td className="py-3 pr-4 text-gray-600 text-center">
                        {row.topLength}
                      </td>
                      <td className="py-3 text-gray-600 text-center">
                        {row.pantsLength}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 text-xs text-gray-500 italic">
          <span className="font-semibold">Tip:</span> If you're between sizes,
          we recommend sizing up for a more comfortable fit.
        </p>
      </div>
    </div>
  );
}
