"use client";
import api from "@/lib/api";
import { useState } from "react"

// ─── Types ───────────────────────────────────────────────────────────────────
type FormData = {
  title: string
  description: string
  type: string
  listingType: string
  status: string
  address: string
  city: string
  state: string
  pincode: string
  bedrooms: number
  bathrooms: number
  balconies: number
  area: number
  areaUnit: string
  floor: number
  totalFloors: number
  facing: string
  furnishing: string
  parking: boolean
  ageOfProperty: number
  price: number
  priceUnit: string
  amenities: string[]
  images: File[]
}

const INITIAL: FormData = {
  title: "", description: "", type: "", listingType: "sale", status: "available", // ✅ fixed: "active" → "available"
  address: "", city: "", state: "", pincode: "",
  bedrooms: 0, bathrooms: 0, balconies: 0, area: 0, areaUnit: "sqft",
  floor: 0, totalFloors: 0, facing: "", furnishing: "unfurnished", parking: false, ageOfProperty: 0,
  price: 0, priceUnit: "total",
  amenities: [],
  images: [],
}

const AMENITY_LIST = [
  { key: "gym",                  label: "Gym" },
  { key: "pool",                 label: "Swimming Pool" },  // ✅ fixed: "swimming_pool" → "pool" (backend enum match)
  { key: "security",             label: "Security" },
  { key: "lift",                 label: "Lift" },
  { key: "power_backup",         label: "Power Backup" },
  { key: "clubhouse",            label: "Clubhouse" },
  { key: "garden",               label: "Garden" },
  { key: "cctv",                 label: "CCTV" },
  { key: "intercom",             label: "Intercom" },
  { key: "elevator",             label: "Elevator" },
  { key: "playground",           label: "Playground" },
]

const STEPS = [
  { id: 1, label: "Basic Info",  icon: "🏠" },
  { id: 2, label: "Location",    icon: "📍" },
  { id: 3, label: "Details",     icon: "📋" },
  { id: 4, label: "Pricing",     icon: "₹"  },
  { id: 5, label: "Amenities",   icon: "✨" },
  { id: 6, label: "Images",      icon: "🖼" },
]

// ─── Reusable Field Components ────────────────────────────────────────────────
const Label = ({ children }: { children: React.ReactNode }) => (
  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
    {children}
  </label>
)

const Input = ({ className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className={`w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 focus:bg-white transition-all ${className}`}
  />
)

const Select = ({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select
    {...props}
    className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 focus:bg-white transition-all cursor-pointer"
  >
    {children}
  </select>
)

const Textarea = ({ ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    {...props}
    rows={4}
    className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 focus:bg-white transition-all resize-none"
  />
)

function formatPrice(price: number, unit: string) {
  if (!price) return "—"
  if (unit === "per_month") return `₹${price.toLocaleString()}/mo`
  if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`
  if (price >= 100000)   return `₹${(price / 100000).toFixed(1)}L`
  return `₹${price.toLocaleString()}`
}

// ─── Step Components ──────────────────────────────────────────────────────────
function Step1({ data, set }: { data: FormData; set: (k: keyof FormData, v: any) => void }) {
  const types = ["apartment", "villa", "plot", "office", "shop", "studio", "warehouse", "farmhouse", "pg"]
  return (
    <div className="flex flex-col gap-5">
      <div>
        <Label>Property Title *</Label>
        <Input value={data.title} onChange={e => set("title", e.target.value)} placeholder="e.g. 3BHK Luxury Flat in Noida Sector 62" />
      </div>
      <div>
        <Label>Description</Label>
        <Textarea value={data.description} onChange={e => set("description", e.target.value)} placeholder="Describe the property — amenities, nearby landmarks, highlights..." />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Property Type *</Label>
          <Select value={data.type} onChange={e => set("type", e.target.value)}>
            <option value="">Select type</option>
            {types.map(t => <option key={t} value={t} className="capitalize">{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
          </Select>
        </div>
        <div>
          <Label>Listing Type *</Label>
          <div className="flex gap-2 mt-0.5">
            {["sale", "rent"].map(lt => (
              <button key={lt} type="button"
                onClick={() => set("listingType", lt)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                  data.listingType === lt
                    ? "bg-emerald-500 text-white border-emerald-500 shadow-sm"
                    : "bg-slate-50 text-slate-500 border-slate-200 hover:border-emerald-300"
                }`}
              >
                {lt === "sale" ? "For Sale" : "For Rent"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Step2({ data, set }: { data: FormData; set: (k: keyof FormData, v: any) => void }) {
  const states = ["Uttar Pradesh", "Delhi", "Maharashtra", "Karnataka", "Telangana", "Tamil Nadu", "Gujarat", "Rajasthan", "Punjab", "Haryana"]
  return (
    <div className="flex flex-col gap-5">
      <div>
        <Label>Full Address *</Label>
        <Input value={data.address} onChange={e => set("address", e.target.value)} placeholder="e.g. Plot 5, Sector 62" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>City *</Label>
          <Input value={data.city} onChange={e => set("city", e.target.value)} placeholder="e.g. Noida" />
        </div>
        <div>
          <Label>State *</Label>
          <Select value={data.state} onChange={e => set("state", e.target.value)}>
            <option value="">Select state</option>
            {states.map(s => <option key={s} value={s}>{s}</option>)}
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Pincode</Label>
          <Input
            value={data.pincode}
            onChange={e => {
              // ✅ Only allow numbers, max 6 digits
              const val = e.target.value.replace(/\D/g, "").slice(0, 6)
              set("pincode", val)
            }}
            placeholder="201309"
            maxLength={6}
          />
        </div>
        <div>
          <Label>Country</Label>
          <Input value="India" disabled className="opacity-60 cursor-not-allowed" />
        </div>
      </div>
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-700 flex items-start gap-2">
        <span className="text-base mt-0.5">📍</span>
        <span>Map pin aur coordinates baad mein property detail page se set kar sakte hain.</span>
      </div>
    </div>
  )
}

function Step3({ data, set }: { data: FormData; set: (k: keyof FormData, v: any) => void }) {
  const facings = ["north", "south", "east", "west"] // ✅ fixed: lowercase to match backend enum
  const isPlot = data.type === "plot"
  return (
    <div className="flex flex-col gap-5">
      {!isPlot && (
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Bedrooms",  key: "bedrooms"  as keyof FormData },
            { label: "Bathrooms", key: "bathrooms" as keyof FormData },
            { label: "Balconies", key: "balconies" as keyof FormData },
          ].map(f => (
            <div key={f.key}>
              <Label>{f.label}</Label>
              <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                <button type="button" onClick={() => set(f.key, Math.max(0, (data[f.key] as number) - 1))}
                  className="px-3 py-2.5 text-slate-500 hover:bg-slate-100 text-lg font-light transition-colors">−</button>
                <span className="flex-1 text-center text-sm font-semibold text-slate-700">{data[f.key] as number}</span>
                <button type="button" onClick={() => set(f.key, (data[f.key] as number) + 1)}
                  className="px-3 py-2.5 text-slate-500 hover:bg-slate-100 text-lg font-light transition-colors">+</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Area *</Label>
          <Input type="number" value={data.area || ""} onChange={e => set("area", Number(e.target.value))} placeholder="1450" min={0} />
        </div>
        <div>
          <Label>Unit</Label>
          <Select value={data.areaUnit} onChange={e => set("areaUnit", e.target.value)}>
            <option value="sqft">sqft</option>
            <option value="sqm">sqm</option>
            {/* ✅ removed sqyd — not in backend enum */}
          </Select>
        </div>
      </div>
      {!isPlot && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Floor No.</Label>
            <Input type="number" value={data.floor || ""} onChange={e => set("floor", Number(e.target.value))} placeholder="5" min={0} />
          </div>
          <div>
            <Label>Total Floors</Label>
            <Input type="number" value={data.totalFloors || ""} onChange={e => set("totalFloors", Number(e.target.value))} placeholder="12" min={0} />
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Facing</Label>
          <Select value={data.facing} onChange={e => set("facing", e.target.value)}>
            <option value="">Select facing</option>
            {facings.map(f => (
              <option key={f} value={f}>{f.charAt(0).toUpperCase() + f.slice(1)}</option>
            ))}
          </Select>
        </div>
        <div>
          <Label>Age of Property (yrs)</Label>
          <Input type="number" value={data.ageOfProperty || ""} onChange={e => set("ageOfProperty", Number(e.target.value))} placeholder="3" min={0} />
        </div>
      </div>
      {!isPlot && (
        <div>
          <Label>Furnishing</Label>
          <div className="flex gap-2">
            {["unfurnished", "semi-furnished", "furnished"].map(f => ( // ✅ fixed: "fully-furnished" → "furnished"
              <button key={f} type="button"
                onClick={() => set("furnishing", f)}
                className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all capitalize ${
                  data.furnishing === f
                    ? "bg-emerald-50 text-emerald-700 border-emerald-400"
                    : "bg-slate-50 text-slate-500 border-slate-200 hover:border-emerald-200"
                }`}
              >
                {f.replace("-", " ")}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
        <button type="button" onClick={() => set("parking", !data.parking)}
          className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${data.parking ? "bg-emerald-500" : "bg-slate-300"}`}>
          <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${data.parking ? "left-5" : "left-0.5"}`} />
        </button>
        <span className="text-sm font-medium text-slate-700">Parking Available</span>
      </div>
    </div>
  )
}

function Step4({ data, set }: { data: FormData; set: (k: keyof FormData, v: any) => void }) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <Label>Price Unit</Label>
        <div className="flex gap-2">
          {[
            { val: "total",     label: "Total Price", hint: "For Sale" },
            { val: "per_month", label: "Per Month",   hint: "For Rent" },
          ].map(opt => (
            <button key={opt.val} type="button"
              onClick={() => set("priceUnit", opt.val)}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold border transition-all text-left ${
                data.priceUnit === opt.val
                  ? "bg-emerald-500 text-white border-emerald-500 shadow-sm"
                  : "bg-slate-50 text-slate-500 border-slate-200 hover:border-emerald-300"
              }`}
            >
              <span className="block">{opt.label}</span>
              <span className={`text-xs font-normal ${data.priceUnit === opt.val ? "text-emerald-100" : "text-slate-400"}`}>{opt.hint}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label>Price (₹) *</Label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-sm">₹</span>
          <Input
            type="number"
            value={data.price || ""}
            onChange={e => set("price", Number(e.target.value))}
            placeholder="e.g. 8500000"
            min={0}
            className="pl-8"
          />
        </div>
      </div>

      {data.price > 0 && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center">
          <p className="text-xs text-emerald-600 font-semibold uppercase tracking-widest mb-1">Listing Price</p>
          <p className="text-4xl font-bold text-emerald-700">{formatPrice(data.price, data.priceUnit)}</p>
          {/* ✅ fixed: data.details?.area → data.area */}
          {data.priceUnit === "total" && data.area > 0 && (
            <p className="text-xs text-emerald-500 mt-1">
              ≈ ₹{Math.round(data.price / data.area).toLocaleString()} per sqft
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "25L",    val: 2500000  },
          { label: "50L",    val: 5000000  },
          { label: "1 Cr",   val: 10000000 },
          { label: "2 Cr",   val: 20000000 },
          { label: "5 Cr",   val: 50000000 },
          { label: "10K/mo", val: 10000    },
        ].map(q => (
          <button key={q.label} type="button"
            onClick={() => set("price", q.val)}
            className="py-2 text-xs font-semibold border border-slate-200 rounded-xl text-slate-500 hover:border-emerald-300 hover:text-emerald-600 transition-all bg-slate-50">
            {q.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function Step5({ data, set }: { data: FormData; set: (k: keyof FormData, v: any) => void }) {
  const toggle = (key: string) => {
    const cur = data.amenities
    set("amenities", cur.includes(key) ? cur.filter(a => a !== key) : [...cur, key])
  }
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-slate-500">Property mein kya kya available hai? ({data.amenities.length} selected)</p>
      <div className="grid grid-cols-2 gap-2.5">
        {AMENITY_LIST.map(a => {
          const active = data.amenities.includes(a.key)
          return (
            <button key={a.key} type="button" onClick={() => toggle(a.key)}
              className={`flex items-center gap-2.5 p-3 rounded-xl border text-sm font-medium transition-all ${
                active
                  ? "bg-emerald-50 border-emerald-400 text-emerald-700"
                  : "bg-slate-50 border-slate-200 text-slate-500 hover:border-emerald-200"
              }`}
            >
              <div className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-all ${
                active ? "bg-emerald-500" : "border border-slate-300"
              }`}>
                {active && (
                  <svg width="10" height="10" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                )}
              </div>
              {a.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function Step6({ data, set }: { data: FormData; set: (k: keyof FormData, v: any) => void }) {
  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      set("images", [...data.images, ...files])
    }
  }
  const removeImg = (idx: number) => {
    set("images", data.images.filter((_, i) => i !== idx))
  }
  return (
    <div className="flex flex-col gap-4">
      <label
        className="border-2 border-dashed border-slate-300 hover:border-emerald-400 rounded-2xl p-8 text-center cursor-pointer transition-all bg-slate-50 hover:bg-emerald-50/30"
        htmlFor="img-upload"
      >
        <div className="text-3xl mb-2">🖼</div>
        <p className="text-sm font-semibold text-slate-600">Click to upload images</p>
        <p className="text-xs text-slate-400 mt-1">JPG, PNG, WEBP — max 5MB each</p>
        <input id="img-upload" type="file" accept="image/*" multiple className="hidden" onChange={handleFiles} />
      </label>

      {data.images.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {data.images.map((file, idx) => (
            <div key={idx} className="relative rounded-xl overflow-hidden border border-slate-200 aspect-square bg-slate-100">
              <img src={URL.createObjectURL(file)} alt="" className="w-full h-full object-cover" />
              {idx === 0 && (
                <span className="absolute bottom-1 left-1 bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                  PRIMARY
                </span>
              )}
              <button type="button" onClick={() => removeImg(idx)}
                className="absolute top-1 right-1 w-5 h-5 bg-black/60 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-500 transition-colors">
                ×
              </button>
            </div>
          ))}
        </div>
      )}
      <p className="text-xs text-slate-400 text-center">
        {data.images.length} image{data.images.length !== 1 ? "s" : ""} selected · First image = primary
      </p>
    </div>
  )
}

// ─── Review Summary ───────────────────────────────────────────────────────────
function ReviewSummary({ data }: { data: FormData }) {
  const rows: [string, string][] = [
    ["Title",      data.title],
    ["Type",       `${data.type} — ${data.listingType}`],
    ["Location",   [data.address, data.city, data.state, data.pincode].filter(Boolean).join(", ")],
    ["Area",       `${data.area} ${data.areaUnit}`],
    ["BHK",        data.bedrooms > 0 ? `${data.bedrooms}B / ${data.bathrooms}Ba` : "—"],
    ["Furnishing", data.furnishing],
    ["Price",      formatPrice(data.price, data.priceUnit)],
    ["Amenities",  data.amenities.length > 0 ? data.amenities.join(", ") : "None"],
    ["Images",     `${data.images.length} uploaded`],
  ]
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-slate-500">Please review before submitting.</p>
      <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-200">
        {rows.map(([k, v]) => (
          <div key={k} className="flex px-4 py-2.5 gap-4">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide w-24 flex-shrink-0 pt-0.5">{k}</span>
            <span className="text-sm text-slate-700 capitalize">{v}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Validation ───────────────────────────────────────────────────────────────
function validateStep(step: number, data: FormData): string | null {
  if (step === 1) {
    if (!data.title.trim()) return "Title is required"
    if (data.title.trim().length < 5) return "Title must be at least 5 characters" // ✅ added min length
    if (!data.type)         return "Property type is required"
    if (!data.listingType)  return "Listing type is required"
  }
  if (step === 2) {
    if (!data.address.trim()) return "Address is required"
    if (!data.city.trim())    return "City is required"
    if (!data.state)          return "State is required"  // ✅ added
  }
  if (step === 3) {
    if (!data.area || data.area <= 0) return "Area is required and must be greater than 0"
  }
  if (step === 4) {
    if (!data.price || data.price <= 0) return "Price is required and must be greater than 0"
  }
  return null
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AddPropertyForm() {
  const [step, setStep]           = useState(1)
  const [data, setData]           = useState<FormData>(INITIAL)
  const [error, setError]         = useState<string | null>(null)
  const [loading, setLoading]     = useState(false)       // ✅ added loading state
  const [submitted, setSubmitted] = useState(false)

  const TOTAL = STEPS.length + 1 // 6 steps + review

  const set = (key: keyof FormData, val: any) => {
    setData(prev => ({ ...prev, [key]: val }))
    setError(null)
  }

  const next = () => {
    const err = validateStep(step, data) // ✅ fixed: renamed to avoid conflict with validate import
    if (err) { setError(err); return }
    setError(null)
    setStep(s => Math.min(s + 1, TOTAL))
  }

  const prev = () => {
    setError(null)
    setStep(s => Math.max(s - 1, 1))
  }

  const handleSubmit = async () => {
    setLoading(true)    // ✅ added
    setError(null)      // ✅ added

    try {
      const form = new FormData()
      form.append("title",       data.title)
      form.append("description", data.description)
      form.append("type",        data.type)
      form.append("listingType", data.listingType)
      form.append("status",      data.status)
      form.append("price",       String(data.price))
      form.append("priceUnit",   data.priceUnit)

      // ✅ fixed: pincode → zipCode to match backend field name
      form.append("location", JSON.stringify({
        address: data.address,
        city:    data.city,
        state:   data.state,
        zipCode: data.pincode,  // ✅ backend uses zipCode
        country: "India",
      }))

      form.append("details", JSON.stringify({
        bedrooms:      data.bedrooms,
        bathrooms:     data.bathrooms,
        balconies:     data.balconies,
        area:          data.area,
        areaUnit:      data.areaUnit,
        floor:         data.floor,
        totalFloors:   data.totalFloors,
        facing:        data.facing,
        furnishing:    data.furnishing,
        parking:       data.parking,
        ageOfProperty: data.ageOfProperty,
      }))

      form.append("amenities", JSON.stringify(data.amenities))
      data.images.forEach(img => form.append("images", img))
      console.log("Submitting form with data:", {
        ...data,
        location: {
          address: data.address,
          city:    data.city,
          state:   data.state,
          zipCode: data.pincode, // ✅ backend uses zipCode
          country: "India",
        },
        details: {
          bedrooms:      data.bedrooms,
          bathrooms:     data.bathrooms,
          balconies:     data.balconies,
          area:          data.area,
          areaUnit:      data.areaUnit,
          floor:         data.floor,
          totalFloors:   data.totalFloors,
          facing:        data.facing,
          furnishing:    data.furnishing,   
          parking:       data.parking,
          ageOfProperty: data.ageOfProperty,
        },
      })
      
      await api.post("/properties", form, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      setSubmitted(true)
    } catch (err: any) {
      // ✅ added: show API error message to user
      const message = err?.response?.data?.errors?.[0]?.message
        || err?.response?.data?.message
        || "Something went wrong. Please try again."
      setError(message)
    } finally {
      setLoading(false) // ✅ added
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-12 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <svg width="28" height="28" fill="none" stroke="#10b981" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Property Submitted!</h2>
          <p className="text-slate-500 text-sm mb-6">Your listing has been submitted for review. It will go live after verification.</p>
          <button onClick={() => { setSubmitted(false); setStep(1); setData(INITIAL) }}
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors text-sm">
            Add Another Property
          </button>
        </div>
      </div>
    )
  }

  const isReview = step === TOTAL

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800">List Your Property</h1>
          <p className="text-slate-500 text-sm mt-1">Step {step} of {TOTAL} — {isReview ? "Review & Submit" : STEPS[step - 1].label}</p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center gap-0 mb-4 overflow-x-auto pb-1">
            {STEPS.map((s, idx) => {
              const done    = step > s.id
              const current = step === s.id
              return (
                <div key={s.id} className="flex items-center flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => step > s.id && setStep(s.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      current ? "bg-emerald-500 text-white shadow-sm" :
                      done    ? "bg-emerald-100 text-emerald-700 cursor-pointer hover:bg-emerald-200" :
                                "bg-slate-100 text-slate-400 cursor-default"
                    }`}
                  >
                    {done
                      ? <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
                      : <span className="text-[10px]">{s.id}</span>
                    }
                    <span className="hidden sm:inline">{s.label}</span>
                  </button>
                  {idx < STEPS.length - 1 && (
                    <div className={`w-4 h-0.5 mx-0.5 flex-shrink-0 transition-colors ${step > s.id ? "bg-emerald-400" : "bg-slate-200"}`} />
                  )}
                </div>
              )
            })}
          </div>
          <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${((step - 1) / (TOTAL - 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-7 mb-5">
          <h2 className="text-base font-bold text-slate-700 mb-6 flex items-center gap-2">
            {isReview ? "📝 Review & Submit" : `${STEPS[step - 1].icon} ${STEPS[step - 1].label}`}
          </h2>

          {isReview
            ? <ReviewSummary data={data} />
            : step === 1 ? <Step1 data={data} set={set} />
            : step === 2 ? <Step2 data={data} set={set} />
            : step === 3 ? <Step3 data={data} set={set} />
            : step === 4 ? <Step4 data={data} set={set} />
            : step === 5 ? <Step5 data={data} set={set} />
            : <Step6 data={data} set={set} />
          }

          {error && (
            <div className="mt-4 flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          {step > 1 && (
            <button type="button" onClick={prev}
              className="flex items-center gap-2 px-6 py-3 border border-slate-200 hover:border-slate-300 bg-white text-slate-600 font-semibold rounded-xl transition-all text-sm">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
              Back
            </button>
          )}
          <button
            type="button"
            onClick={isReview ? handleSubmit : next}
            disabled={loading} // ✅ disable during loading
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] text-white font-semibold rounded-xl transition-all text-sm shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {/* ✅ loading spinner */}
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Submitting...
              </>
            ) : isReview ? (
              <>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
                Submit Property
              </>
            ) : (
              <>
                {step === STEPS.length ? "Review" : "Continue"}
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  )
}