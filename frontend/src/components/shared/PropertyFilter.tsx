"use client";
import React, { useState } from 'react';

const PropertyFilter = () => {
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [bhk, setBhk] = useState('');
  const [listingType, setListingType] = useState('all');
  const [furnishing, setFurnishing] = useState('');
  const [areaRange, setAreaRange] = useState([0, 5000]);
  const [amenities, setAmenities] = useState<string[]>([]);

  const toggleAmenity = (a: string) => {
    setAmenities(prev =>
      prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]
    );
  };

  const formatPrice = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)}Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(0)}L`;
    return `₹${val.toLocaleString()}`;
  };

  const handleReset = () => {
    setPriceRange([0, 10000000]);
    setLocation('');
    setPropertyType('');
    setBhk('');
    setListingType('all');
    setFurnishing('');
    setAreaRange([0, 5000]);
    setAmenities([]);
  };

  const handleApply = () => {
    const filters = { priceRange, location, propertyType, bhk, listingType, furnishing, areaRange, amenities };
    console.log('Applied Filters:', filters);
    // onApply(filters) → yahan apna filter logic daal dena
  };

  const amenityList = ['Gym', 'Pool', 'Parking', 'Security', 'Lift', 'Garden', 'Clubhouse', 'Power Backup'];

  return (
    <div className="w-80 bg-[#0f172a] border border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-fit">
      {/* Header */}
      <div className="px-6 py-5 border-b border-slate-700 flex items-center justify-between bg-[#0a1428]">
        <div className="flex items-center gap-3">
          <div className=" flex items-center justify-center">
            {/* <span className="text-white text-lg"></span> */}
          </div>
          <span className="font-semibold text-white text-lg tracking-tight">Filters</span>
        </div>
        <button
          onClick={handleReset}
          className="text-sm text-slate-400 hover:text-white font-medium transition-colors"
        >
          Reset All
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6 text-sm">

        {/* Listing Type */}
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Listing Type</p>
          <div className="flex gap-2">
            {['all', 'sale', 'rent'].map(t => (
              <button
                key={t}
                onClick={() => setListingType(t)}
                className={`flex-1 py-3 rounded-2xl text-sm font-medium border transition-all ${
                  listingType === t
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-[#1e2937] text-slate-300 border-slate-600 hover:border-slate-500'
                }`}
              >
                {t === 'all' ? 'All' : t === 'sale' ? 'Buy' : 'Rent'}
              </button>
            ))}
          </div>
        </div>

        {/* Location */}
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Location</p>
          <div className="relative">
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="City, locality, area..."
              className="w-full pl-4 pr-4 py-3.5 bg-[#1e2937] border border-slate-600 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:bg-[#25344a] transition-all"
            />
          </div>
        </div>

        {/* Property Type */}
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Property Type</p>
          <div className="grid grid-cols-3 gap-2">
            {['Apartment', 'Villa', 'Plot', 'Office', 'Shop', 'Studio'].map(t => (
              <button
                key={t}
                onClick={() => setPropertyType(prev => prev === t ? '' : t)}
                className={`py-2.5 rounded-2xl text-xs font-medium border transition-all ${
                  propertyType === t
                    ? 'bg-emerald-500/10 text-blue-400 border-blue-500'
                    : 'bg-[#1e2937] text-slate-300 border-slate-600 hover:border-slate-500'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* BHK */}
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">BHK</p>
          <div className="flex gap-2">
            {['1', '2', '3', '4', '4+'].map(b => (
              <button
                key={b}
                onClick={() => setBhk(prev => prev === b ? '' : b)}
                className={`flex-1 py-3 rounded-2xl text-sm font-medium border transition-all ${
                  bhk === b
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-[#1e2937] text-slate-300 border-slate-600 hover:border-slate-500'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Price Range</p>
            <span className="text-blue-400 font-medium text-sm">
              {formatPrice(priceRange[0])} — {formatPrice(priceRange[1])}
            </span>
          </div>
          <div className="space-y-4">
            <input
              type="range"
              min={0}
              max={10000000}
              step={50000}
              value={priceRange[0]}
              onChange={e => setPriceRange([+e.target.value, priceRange[1]])}
              className="w-full accent-blue-500"
            />
            <input
              type="range"
              min={0}
              max={10000000}
              step={50000}
              value={priceRange[1]}
              onChange={e => setPriceRange([priceRange[0], +e.target.value])}
              className="w-full accent-blue-500"
            />
          </div>
        </div>

        {/* Area Range */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Area (sqft)</p>
            <span className="text-blue-400 font-medium text-sm">
              {areaRange[0]} — {areaRange[1]} sqft
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={5000}
            step={50}
            value={areaRange[1]}
            onChange={e => setAreaRange([areaRange[0], +e.target.value])}
            className="w-full accent-blue-500"
          />
        </div>

        {/* Furnishing */}
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Furnishing</p>
          <div className="flex gap-2">
            {['Furnished', 'Semi', 'Unfurnished'].map(f => (
              <button
                key={f}
                onClick={() => setFurnishing(prev => prev === f ? '' : f)}
                className={`flex-1 py-3 rounded-2xl text-xs font-medium border transition-all ${
                  furnishing === f
                    ? 'bg-emerald-500/10 text-blue-400 border-blue-500'
                    : 'bg-[#1e2937] text-slate-300 border-slate-600 hover:border-slate-500'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Amenities</p>
          <div className="flex flex-wrap gap-2">
            {amenityList.map(a => (
              <button
                key={a}
                onClick={() => toggleAmenity(a)}
                className={`px-4 py-2 rounded-2xl text-xs font-medium border transition-all ${
                  amenities.includes(a)
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-[#1e2937] text-slate-300 border-slate-600 hover:border-slate-500'
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Apply Button */}
      <div className="p-6 border-t border-slate-700 bg-[#0a1428]">
        <button
          onClick={handleApply}
          className="w-full py-4 bg-blue-500 hover:bg-blue-600 active:scale-95 text-white font-semibold rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 text-base"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default PropertyFilter;