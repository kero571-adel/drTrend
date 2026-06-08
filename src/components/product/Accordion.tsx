import { useState, ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export default function Accordion({ title, children, defaultOpen = false }: Props) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-5 text-left"
        aria-expanded={open}
      >
        <h3 className="font-heading font-bold text-sm tracking-widest uppercase text-gray-900">
          {title}
        </h3>
        <span
          className={`text-primary text-xl transition-transform ${open ? "rotate-45" : ""}`}
        >
          +
        </span>
      </button>
      {open && (
        <div className="pb-6 text-gray-600 text-sm leading-relaxed animate-fadeIn">
          {children}
        </div>
      )}
    </div>
  );
}
