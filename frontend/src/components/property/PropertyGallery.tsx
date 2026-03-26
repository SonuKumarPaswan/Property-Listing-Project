import { useState } from "react";

// ── Types ────────────────────────────────────────────────────────────────────
export interface PropertyGalleryProps {
  images: string[];
  title?: string;
  price?: string;
  location?: string;
  size?: string;
}

// ── Location Pin Icon ────────────────────────────────────────────────────────
const LocationIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-blue-500 shrink-0"
    aria-hidden="true"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

// ── Chevron Button ───────────────────────────────────────────────────────────
const ChevronBtn = ({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className="w-7 h-7 rounded-full bg-white/80 hover:bg-white shadow-md flex items-center justify-center transition-all duration-150 hover:scale-110"
    aria-label={direction === "left" ? "Previous image" : "Next image"}
  >
    {direction === "left" ? (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6" />
      </svg>
    ) : (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    )}
  </button>
);

// ── Main Component ───────────────────────────────────────────────────────────
export default function PropertyGallery({
  images = [],
  title = "House For Sale",
  price = "1.05 Crore",
  location = "F-11 Markaz, Islamabad",
  size = "10 Marla",
}: PropertyGalleryProps) {
  const [mainIndex, setMainIndex] = useState(0);
  const [activeThumb, setActiveThumb] = useState<number | null>(null);

  const totalImages = images.length;

  const prev = () => setMainIndex((i) => (i - 1 + totalImages) % totalImages);
  const next = () => setMainIndex((i) => (i + 1) % totalImages);

  // top-right side images: indices 1 and 2
  const sideImages = totalImages > 1 ? [1, 2].filter((i) => i < totalImages) : [];
  // bottom thumbnails: indices 3 onwards
  const thumbImages = totalImages > 3 ? images.slice(3) : [];

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-slate-100 w-full max-w-2xl mx-auto font-sans">

      {/* ── Gallery Grid ── */}
      <div className="flex gap-1.5 p-2">

        {/* Main large image */}
        <div className="relative flex-[2] min-h-[220px] rounded-xl overflow-hidden group">
          {totalImages > 0 ? (
            <img
              src={images[mainIndex]}
              alt={`Property image ${mainIndex + 1}`}
              className="w-full h-full object-cover transition-all duration-300"
              style={{ minHeight: "220px" }}
            />
          ) : (
            <div className="w-full h-full min-h-[220px] bg-slate-100 flex items-center justify-center text-slate-400 text-sm rounded-xl">
              No Image
            </div>
          )}

          {/* Carousel controls */}
          {totalImages > 1 && (
            <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <ChevronBtn direction="left" onClick={prev} />
              <ChevronBtn direction="right" onClick={next} />
            </div>
          )}

          {/* Image counter badge */}
          {totalImages > 1 && (
            <span className="absolute bottom-2 right-2 bg-black/50 text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
              {mainIndex + 1} / {totalImages}
            </span>
          )}
        </div>

        {/* Right side: 2 stacked images */}
        {sideImages.length > 0 && (
          <div className="flex flex-col gap-1.5 flex-1">
            {sideImages.map((imgIdx) => (
              <button
                key={imgIdx}
                type="button"
                onClick={() => setMainIndex(imgIdx)}
                className={[
                  "relative flex-1 rounded-xl overflow-hidden transition-all duration-150",
                  "ring-2 ring-offset-1",
                  mainIndex === imgIdx ? "ring-blue-500" : "ring-transparent hover:ring-slate-300",
                ].join(" ")}
                style={{ minHeight: "104px" }}
                aria-label={`View image ${imgIdx + 1}`}
              >
                <img
                  src={images[imgIdx]}
                  alt={`Property image ${imgIdx + 1}`}
                  className="w-full h-full object-cover"
                  style={{ minHeight: "104px" }}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Thumbnail strip ── */}
      {thumbImages.length > 0 && (
        <div className="flex gap-1.5 px-2 pb-2 overflow-x-auto scrollbar-hide">
          {thumbImages.map((src, i) => {
            const realIdx = i + 3;
            return (
              <button
                key={realIdx}
                type="button"
                onClick={() => {
                  setMainIndex(realIdx);
                  setActiveThumb(realIdx);
                }}
                className={[
                  "shrink-0 w-[88px] h-14 rounded-lg overflow-hidden transition-all duration-150",
                  "ring-2 ring-offset-1",
                  mainIndex === realIdx ? "ring-blue-500" : "ring-transparent hover:ring-slate-300",
                ].join(" ")}
                aria-label={`Thumbnail ${realIdx + 1}`}
              >
                <img
                  src={src}
                  alt={`Thumbnail ${realIdx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* ── Property Info ── */}
      <div className="flex items-start justify-between px-4 py-3 border-t border-slate-100">

        {/* Left: Title + Location */}
        <div className="flex flex-col gap-1">
          <h2 className="text-[15px] font-bold text-blue-600 leading-tight m-0">
            {title}
          </h2>
          <div className="flex items-center gap-1">
            <LocationIcon />
            <span className="text-[12px] text-slate-500">{location}</span>
          </div>
        </div>

        {/* Right: Price + Size */}
        <div className="flex flex-col items-end gap-1">
          <span className="text-[15px] font-bold text-blue-600 leading-tight">
            {price}
          </span>
          <span className="text-[12px] text-slate-500">{size}</span>
        </div>
      </div>
    </div>
  );
}