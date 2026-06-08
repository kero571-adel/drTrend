interface Props {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}

export default function QuantityStepper({ value, onChange, min = 1, max = 99 }: Props) {
  return (
    <div className="inline-flex items-center border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        className="w-10 h-10 text-lg text-gray-700 hover:bg-gray-50 disabled:opacity-40"
        aria-label="Decrease"
      >
        −
      </button>
      <span className="w-10 text-center text-sm font-semibold">{value}</span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        className="w-10 h-10 text-lg text-gray-700 hover:bg-gray-50 disabled:opacity-40"
        aria-label="Increase"
      >
        +
      </button>
      <span className="sr-only">{value}</span>
    </div>
  );
}
