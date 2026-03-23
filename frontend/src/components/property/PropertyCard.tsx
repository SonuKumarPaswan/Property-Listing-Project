"use client"
import { useState } from "react"
import Link from "next/link"
import { PROPERTIES } from "@/data/properties"

function formatPrice(price: number, listingType: "sale" | "rent") {
  if (listingType === "rent") {
    if (price >= 1000) return `₹${(price / 1000).toFixed(0)}K/mo`
    return `₹${price}/mo`
  }
  if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`
  if (price >= 100000) return `₹${(price / 100000).toFixed(0)}L`
  return `₹${price.toLocaleString()}`
}

const typeColors: Record<string, string> = {
  apartment: "bg-blue-50 text-blue-700",
  villa:     "bg-purple-50 text-purple-700",
  plot:      "bg-yellow-50 text-yellow-700",
  office:    "bg-red-50 text-red-700",
  shop:      "bg-pink-50 text-pink-700",
  studio:    "bg-teal-50 text-teal-700",
}

function SingleCard({ property }: { property: (typeof PROPERTIES)[0] }) {
  const [liked, setLiked] = useState(false)
  const primaryImage =
    property.images.find((i) => i.isPrimary)?.url ?? property.images[0]?.url

  return (
    <Link href={`/properties/${property.slug}`} className="group block">
      <div className="bg-white rounded-md overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">

        {/* Image */}
        <div className="relative h-52 overflow-hidden">
          <img
            src={primaryImage}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide shadow-sm ${
              property.listingType === "sale" ? "bg-emerald-500 text-white" : "bg-blue-500 text-white"
            }`}>
              {property.listingType === "sale" ? "For Sale" : "For Rent"}
            </span>
            {property.isVerified && (
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white text-emerald-600 shadow-sm flex items-center gap-1">
                <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Verified
              </span>
            )}
          </div>

          {/* Featured */}
          {property.isFeatured && (
            <div className="absolute top-3 right-12 bg-amber-400 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
              ★ Featured
            </div>
          )}

          {/* Wishlist */}
          <button
            onClick={(e) => { e.preventDefault(); setLiked((p) => !p) }}
            className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all duration-200 ${
              liked
                ? "bg-rose-500 text-white scale-110"
                : "bg-white/80 text-slate-400 hover:bg-white hover:text-rose-400 backdrop-blur-sm"
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>

          {/* Price overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 pt-6 pb-3">
            <p className="text-white font-bold text-xl leading-tight">
              {formatPrice(property.price, property.listingType)}
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="p-4 flex flex-col gap-2.5 flex-1">

          {/* Title + type */}
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-slate-800 font-semibold text-sm leading-snug line-clamp-2 flex-1">
              {property.title}
            </h2>
            <span className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-md capitalize ${
              typeColors[property.type] ?? "bg-slate-100 text-slate-600"
            }`}>
              {property.type}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-slate-500 text-xs">
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="truncate">{property.location}, {property.city}</span>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-3 pt-2.5 border-t border-slate-100 mt-auto">
            {property.details.bedrooms > 0 && (
              <div className="flex items-center gap-1 text-slate-500 text-xs">
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                {property.details.bedrooms} BHK
              </div>
            )}
            <div className="flex items-center gap-1 text-slate-500 text-xs">
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="2" />
              </svg>
              {property.details.area} sqft
            </div>
            <div className="flex items-center gap-1 text-slate-500 text-xs capitalize">
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                <line x1="7" y1="7" x2="7.01" y2="7" />
              </svg>
              {property.details.furnishing ?? "—"}
            </div>

            {/* Arrow */}
            <div className="ml-auto w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all duration-200 shrink-0">
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

// ─── Main exported component: renders ALL properties from static data ───
const PropertyCard = () => {
  return (
    <section className="min-h-screen bg-slate-50  py-1">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-2">
          <h1 className="text-3xl font-bold text-slate-800">All Properties</h1>
          <p className="text-slate-500 text-sm mt-1">{PROPERTIES.length} listings available</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {PROPERTIES.map((property) => (
            <SingleCard key={property._id} property={property} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default PropertyCard
