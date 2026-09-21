"use client";

import { useState } from "react";

interface Props {
  images: string[];
  mainImage?: string;
  videoUrl?: string;
}

function getYouTubeEmbedUrl(url?: string): string | null {
  if (!url) return null;
  const patterns = [
    /youtu\.be\/([a-zA-Z0-9_-]+)/,
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]+)/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return `https://www.youtube.com/embed/${m[1]}`;
  }
  return null;
}

export default function ImageGallery({ images, mainImage, videoUrl }: Props) {
  const [selected, setSelected] = useState(0);
  const all = mainImage
    ? [mainImage, ...images.filter((i) => i !== mainImage)]
    : images;

  const embedUrl = getYouTubeEmbedUrl(videoUrl);
  const videoIndex = embedUrl ? all.length : -1;
  const isVideoSelected = embedUrl !== null && selected === videoIndex;

  return (
    <div>
      <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden mb-4">
        {isVideoSelected && embedUrl ? (
          <iframe
            src={embedUrl}
            className="w-full h-full"
            title="Product video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <img
            src={all[selected] || all[0]}
            alt="Product"
            className="w-full h-full object-contain"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/2000'><rect width='100%' height='100%' fill='%231a7a6e'/><text x='50%25' y='50%25' font-family='sans-serif' fill='white' text-anchor='middle' font-size='80' dy='.3em'>Dr Trend</text></svg>";
            }}
          />
        )}
      </div>

      <div className="flex justify-between gap-3">
        {embedUrl && (
          <button
            onClick={() => setSelected(videoIndex)}
            className={`aspect-square w-24 rounded-lg overflow-hidden bg-black flex items-center justify-center ${
              isVideoSelected ? "ring-2 ring-primary" : ""
            }`}
          >
            <span className="text-white text-3xl">▶</span>
          </button>
        )}
        {all.slice(0, embedUrl ? 3 : 3).map((img, i) => (
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
              className="w-full h-full object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
