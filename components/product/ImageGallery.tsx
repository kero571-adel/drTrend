"use client";

import { useState } from "react";

interface Props {
  images: string[];
  mainImage?: string;
}

export default function ImageGallery({ images, mainImage }: Props) {
  const [selected, setSelected] = useState(0);
  const all = mainImage
    ? [mainImage, ...images.filter((i) => i !== mainImage)]
    : images;

  return (
    <div>
      <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden mb-4">
        <img
          src={all[selected] || all[0]}
          alt="Product"
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/2000'><rect width='100%' height='100%' fill='%231a7a6e'/><text x='50%25' y='50%25' font-family='sans-serif' fill='white' text-anchor='middle' font-size='80' dy='.3em'>Dr Trend</text></svg>";
          }}
        />
      </div>
      <div className="flex justify-between gap-3">
        {all.slice(0, 3).map((img, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`aspect-square w-24 rounded-lg overflow-hidden bg-gray-100 ${
              selected === i ? "ring-2 ring-primary" : ""
            }`}
          >
            <img
              src={img}
              alt={`Thumbnail ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
