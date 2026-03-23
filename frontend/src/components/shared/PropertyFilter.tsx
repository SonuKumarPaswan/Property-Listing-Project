"use client"
import React, { useState } from 'react'

const PropertyFilter = () => {
  const [priceRange, setPriceRange] = useState([0, 10000000])
  const [location, setLocation] = useState('')
  const [propertyType, setPropertyType] = useState('')
  const [bhk, setBhk] = useState('')
  const [listingType, setListingType] = useState('all')
  const [furnishing, setFurnishing] = useState('')
  const [areaRange, setAreaRange] = useState([0, 5000])
  const [amenities, setAmenities] = useState<string[]>([])

  const toggleAmenity = (a: string) => {
    setAmenities(prev =>
      prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]
    )
  }

  const formatPrice = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)}Cr`
    if (val >= 100000) return `₹${(val / 100000).toFixed(0)}L`
    return `₹${val.toLocaleString()}`
  }

  const handleReset = () => {
    setPriceRange([0, 10000000])
    setLocation('')
    setPropertyType('')
    setBhk('')
    setListingType('all')
    setFurnishing('')
    setAreaRange([0, 5000])
    setAmenities([])
  }

  const handleApply = () => {
    const filters = { priceRange, location, propertyType, bhk, listingType, furnishing, areaRange, amenities }
    console.log('Applied Filters:', filters)
    // Call your filter callback here: onApply(filters)
  }

  const amenityList = ['Gym', 'Pool', 'Parking', 'Security', 'Lift', 'Garden', 'Clubhouse', 'Power Backup']

  return (
    <div
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="w-72 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden flex flex-col"
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center">
            <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2.2" viewBox="0 0 24 24">
              <line x1="4" y1="6" x2="20" y2="6" /><line x1="8" y1="12" x2="16" y2="12" /><line x1="11" y1="18" x2="13" y2="18" />
            </svg>
          </div>
          <span className="font-semibold text-slate-800 text-sm tracking-tight">Filters</span>
        </div>
        <button onClick={handleReset} className="text-xs text-emerald-600 hover:text-emerald-700 font-medium transition-colors">
          Reset all
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-5">

        {/* Listing Type */}
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Listing Type</p>
          <div className="flex gap-2">
            {['all', 'sale', 'rent'].map(t => (
              <button
                key={t}
                onClick={() => setListingType(t)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  listingType === t
                    ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm'
                    : 'bg-white text-slate-500 border-slate-200 hover:border-emerald-300'
                }`}
              >
                {t === 'all' ? 'All' : t === 'sale' ? 'Buy' : 'Rent'}
              </button>
            ))}
          </div>
        </div>

        {/* Location */}
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Location</p>
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
            </svg>
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="City, locality, area…"
              className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Property Type */}
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Property Type</p>
          <div className="grid grid-cols-3 gap-1.5">
            {['Apartment', 'Villa', 'Plot', 'Office', 'Shop', 'Studio'].map(t => (
              <button
                key={t}
                onClick={() => setPropertyType(prev => prev === t ? '' : t)}
                className={`py-1.5 px-1 rounded-lg text-xs font-medium border transition-all ${
                  propertyType === t
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-400 font-semibold'
                    : 'bg-white text-slate-500 border-slate-200 hover:border-emerald-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* BHK */}
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">BHK</p>
          <div className="flex gap-1.5">
            {['1', '2', '3', '4', '4+'].map(b => (
              <button
                key={b}
                onClick={() => setBhk(prev => prev === b ? '' : b)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  bhk === b
                    ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm'
                    : 'bg-white text-slate-500 border-slate-200 hover:border-emerald-300'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Price Range</p>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              {formatPrice(priceRange[0])} – {formatPrice(priceRange[1])}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <input
              type="range" min={0} max={10000000} step={100000}
              value={priceRange[0]}
              onChange={e => setPriceRange([Math.min(+e.target.value, priceRange[1] - 100000), priceRange[1]])}
              className="w-full accent-emerald-500 h-1.5 cursor-pointer"
            />
            <input
              type="range" min={0} max={10000000} step={100000}
              value={priceRange[1]}
              onChange={e => setPriceRange([priceRange[0], Math.max(+e.target.value, priceRange[0] + 100000)])}
              className="w-full accent-emerald-500 h-1.5 cursor-pointer"
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-slate-400">₹0</span>
            <span className="text-[10px] text-slate-400">₹1 Cr+</span>
          </div>
        </div>

        {/* Area Range */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Area (sqft)</p>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              {areaRange[0]} – {areaRange[1]} sqft
            </span>
          </div>
          <input
            type="range" min={0} max={5000} step={100}
            value={areaRange[1]}
            onChange={e => setAreaRange([areaRange[0], +e.target.value])}
            className="w-full accent-emerald-500 h-1.5 cursor-pointer"
          />
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-slate-400">0 sqft</span>
            <span className="text-[10px] text-slate-400">5000 sqft</span>
          </div>
        </div>

        {/* Furnishing */}
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Furnishing</p>
          <div className="flex gap-1.5">
            {['Furnished', 'Semi', 'Unfurnished'].map(f => (
              <button
                key={f}
                onClick={() => setFurnishing(prev => prev === f ? '' : f)}
                className={`flex-1 py-1.5 rounded-lg text-[11px] font-semibold border transition-all ${
                  furnishing === f
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-400'
                    : 'bg-white text-slate-500 border-slate-200 hover:border-emerald-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Amenities</p>
          <div className="flex flex-wrap gap-1.5">
            {amenityList.map(a => (
              <button
                key={a}
                onClick={() => toggleAmenity(a)}
                className={`px-3 py-1 rounded-full text-[11px] font-medium border transition-all ${
                  amenities.includes(a)
                    ? 'bg-emerald-500 text-white border-emerald-500'
                    : 'bg-white text-slate-500 border-slate-200 hover:border-emerald-300'
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Footer CTA */}
      <div className="px-5 py-4 border-t border-slate-100 bg-slate-50">
        <button
          onClick={handleApply}
          className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] text-white text-sm font-semibold rounded-xl shadow-sm transition-all duration-150 flex items-center justify-center gap-2"
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          Apply Filters
        </button>
      </div>
    </div>
  )
}

export default PropertyFilter