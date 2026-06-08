import { useEffect } from "react";

const SIZE_DATA = [
  { size: "XS", chest: "80–84", waist: "60–64", hip: "86–90", length: "62" },
  { size: "S", chest: "84–88", waist: "64–68", hip: "90–94", length: "63" },
  { size: "M", chest: "88–92", waist: "68–72", hip: "94–98", length: "64" },
  { size: "L", chest: "92–96", waist: "72–76", hip: "98–102", length: "65" },
  { size: "XL", chest: "96–100", waist: "76–80", hip: "102–106", length: "66" },
  { size: "XXL", chest: "100–104", waist: "80–84", hip: "106–110", length: "67" },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SizeGuideModal({ open, onClose }: Props) {
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
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 pr-4 font-semibold text-gray-500 uppercase text-xs">Size</th>
                <th className="text-left py-3 pr-4 font-semibold text-gray-500 uppercase text-xs">Chest</th>
                <th className="text-left py-3 pr-4 font-semibold text-gray-500 uppercase text-xs">Waist</th>
                <th className="text-left py-3 pr-4 font-semibold text-gray-500 uppercase text-xs">Hip</th>
                <th className="text-left py-3 font-semibold text-gray-500 uppercase text-xs">Length</th>
              </tr>
            </thead>
            <tbody>
              {SIZE_DATA.map((row) => (
                <tr key={row.size} className="border-b border-gray-100">
                <td className="py-3 pr-4 font-semibold">{row.size}</td>
                <td className="py-3 pr-4 text-gray-600">{row.chest}</td>
                <td className="py-3 pr-4 text-gray-600">{row.waist}</td>
                <td className="py-3 pr-4 text-gray-600">{row.hip}</td>
                <td className="py-3 text-gray-600">{row.length}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 text-xs text-gray-500 italic">
          <span className="font-semibold">Tip:</span> If you're between sizes, we recommend sizing up for a more comfortable fit.
        </p>
      </div>
    </div>
  );
}
