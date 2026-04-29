"use client";
import { useState } from "react";

const AMENITIES = [
  "gym", "pool", "playground", "security", "elevator",
  "power_backup", "lift", "intercom", "cctv", "garden", "clubhouse",
];

const AMENITY_LABELS = {
  gym: "Gym", pool: "Pool", playground: "Playground", security: "Security",
  elevator: "Elevator", power_backup: "Power Backup", lift: "Lift",
  intercom: "Intercom", cctv: "CCTV", garden: "Garden", clubhouse: "Clubhouse",
};

const STEPS = ["Basic", "Location", "Details", "Amenities", "Images", "Review"];

const initialForm = {
  title: "", slug: "", description: "",
  type: "apartment", listingType: "", price: "", priceUnit: "",
  address: "", city: "", state: "", zipCode: "", country: "India",
  lat: "", lng: "",
  bedrooms: 0, bathrooms: 0, balconies: 0,
  area: "", areaUnit: "sqft", floor: 0, totalFloors: 0,
  facing: "", furnishing: "unfurnished", parking: false, ageOfProperty: 0,
  amenities: [],
  status: "available", isVerified: false, isFeatured: false,
};

function toSlug(str) {
  return str.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function AddPropertyForm({ onSubmit }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const handleTitle = (val) => {
    set("title", val);
    set("slug", toSlug(val));
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    const urls = files.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
  };

  const toggleAmenity = (a) => {
    set("amenities",
      form.amenities.includes(a)
        ? form.amenities.filter((x) => x !== a)
        : [...form.amenities, a]
    );
  };

  const validateStep0 = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.description.trim()) e.description = "Description is required";
    if (!form.type) e.type = "Select property type";
    if (!form.listingType) e.listingType = "Select listing type";
    if (!form.price || Number(form.price) <= 0) e.price = "Enter a valid price";
    if (!form.priceUnit) e.priceUnit = "Select price unit";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const nextStep = () => {
    if (step === 0 && !validateStep0()) return;
    setStep((s) => s + 1);
  };

  const prevStep = () => setStep((s) => s - 1);

  const buildPayload = () => ({
    title: form.title,
    slug: form.slug,
    description: form.description,
    type: form.type,
    listingType: form.listingType,
    price: Number(form.price),
    priceUnit: form.priceUnit,
    location: {
      address: form.address,
      city: form.city,
      state: form.state,
      zipCode: form.zipCode,
      country: form.country,
      ...(form.lat && form.lng && {
        coordinates: {
          type: "Point",
          coordinates: [Number(form.lng), Number(form.lat)],
        },
      }),
    },
    details: {
      bedrooms: Number(form.bedrooms),
      bathrooms: Number(form.bathrooms),
      balconies: Number(form.balconies),
      area: Number(form.area),
      areaUnit: form.areaUnit,
      floor: Number(form.floor),
      totalFloors: Number(form.totalFloors),
      facing: form.facing || undefined,
      furnishing: form.furnishing,
      parking: form.parking,
      ageOfProperty: Number(form.ageOfProperty),
    },
    amenities: form.amenities,
    status: form.status,
    isVerified: form.isVerified,
    isFeatured: form.isFeatured,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async () => {
    setIsLoading(true);
    setSubmitError("");

    try {
      const payload = buildPayload();

      // FormData banao — images + JSON data dono saath bhejne ke liye
      const formData = new FormData();

      // Property data ko JSON string ke roop mein attach karo
      formData.append("data", JSON.stringify(payload));

      // Har image ko alag alag attach karo
      images.forEach((img) => {
        formData.append("images", img);
      });

      const res = await fetch("/api/properties", {
        method: "POST",
        // Content-Type header mat lagao — browser khud multipart/form-data set karega
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const msg = errorData.message || res.statusText || "Unknown error";
        setSubmitError(msg);
        return;
      }

      const result = await res.json();
      console.log("Property created:", result);
      setSubmitted(true);
    } catch (err) {
      console.error("Network error:", err);
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setForm(initialForm);
    setImages([]);
    setPreviews([]);
    setErrors({});
    setStep(0);
    setSubmitted(false);
  };

  // ─── Style tokens — pure Black & White ──────────────────────────
  const inp =
    "w-full border border-black rounded-lg px-3 py-2 text-sm text-black placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1";
  const lbl = "block text-xs font-semibold text-black mb-1 uppercase tracking-widest";
  const err = (k) =>
    errors[k] ? (
      <p className="text-black text-xs mt-1 font-medium">⚠ {errors[k]}</p>
    ) : null;

  // ─── Toggle component ────────────────────────────────────────────
  const Toggle = ({ id }) => (
    <button
      type="button"
      onClick={() => set(id, !form[id])}
      className={`w-11 h-6 rounded-full relative border border-black transition-colors ${
        form[id] ? "bg-black" : "bg-white"
      }`}
    >
      <span
        className={`absolute top-0.5 w-4 h-4 rounded-full border border-black transition-all ${
          form[id] ? "left-5 bg-white" : "left-0.5 bg-black"
        }`}
      />
    </button>
  );

  // ─── Success ─────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center bg-white min-h-screen">
        <div className="w-16 h-16 border-2 border-black rounded-full flex items-center justify-center text-2xl mb-6">
          ✓
        </div>
        <h2 className="text-2xl font-semibold text-black mb-2">Property submitted!</h2>
        <p className="text-gray-500 text-sm mb-8">Your listing has been created successfully.</p>
        <button
          onClick={reset}
          className="px-6 py-2.5 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
        >
          Add another property
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 bg-white min-h-screen">

      {/* ── Step tabs ─────────────────────────────────────────────── */}
      <div className="flex rounded-xl overflow-hidden border border-black mb-4">
        {STEPS.map((s, i) => (
          <button
            key={s}
            onClick={() => { if (i < step) setStep(i); }}
            className={`flex-1 py-2.5 text-xs font-semibold border-r border-black last:border-r-0 transition-colors tracking-wide
              ${i === step
                ? "bg-black text-white"
                : i < step
                ? "bg-white text-black"
                : "bg-white text-gray-300 cursor-default"}`}
          >
            {i < step ? "✓ " : ""}{s}
          </button>
        ))}
      </div>

      {/* Progress bar */}
      <div className="h-px bg-gray-200 mb-6">
        <div
          className="h-px bg-black transition-all duration-300"
          style={{ width: `${(step / (STEPS.length - 1)) * 100}%` }}
        />
      </div>

      <div className="bg-white border border-black rounded-2xl p-6">

        {/* ── Step 0: Basic ─────────────────────────────────────── */}
        {step === 0 && (
          <div className="space-y-4">
            <h2 className="text-base font-semibold text-black border-b border-gray-100 pb-3">
              Basic information
            </h2>

            <div>
              <label className={lbl}>Title *</label>
              <input
                className={inp}
                value={form.title}
                placeholder="e.g. 2BHK Apartment in Noida Sector 62"
                onChange={(e) => handleTitle(e.target.value)}
              />
              {err("title")}
            </div>

            <div>
              <label className={lbl}>Slug</label>
              <input
                className={inp + " bg-gray-50 text-gray-400 cursor-not-allowed"}
                value={form.slug}
                readOnly
              />
            </div>

            <div>
              <label className={lbl}>Description *</label>
              <textarea
                className={inp}
                rows={3}
                value={form.description}
                placeholder="Describe the property..."
                onChange={(e) => set("description", e.target.value)}
              />
              {err("description")}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={lbl}>Property type *</label>
                <select className={inp} value={form.type} onChange={(e) => set("type", e.target.value)}>
                  {["apartment","house","condo","townhouse","villa","plot","office","shop","studio","warehouse","farmhouse","pg"]
                    .map((t) => (
                      <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                    ))}
                </select>
                {err("type")}
              </div>
              <div>
                <label className={lbl}>Listing type *</label>
                <select className={inp} value={form.listingType} onChange={(e) => set("listingType", e.target.value)}>
                  <option value="">-- Select --</option>
                  <option value="rent">Rent</option>
                  <option value="sale">Sale</option>
                </select>
                {err("listingType")}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={lbl}>Price (₹) *</label>
                <input
                  className={inp}
                  type="number"
                  min="0"
                  value={form.price}
                  placeholder="e.g. 25000"
                  onChange={(e) => set("price", e.target.value)}
                />
                {err("price")}
              </div>
              <div>
                <label className={lbl}>Price unit *</label>
                <select className={inp} value={form.priceUnit} onChange={(e) => set("priceUnit", e.target.value)}>
                  <option value="">-- Select --</option>
                  <option value="per_month">Per Month</option>
                  <option value="total">Total</option>
                </select>
                {err("priceUnit")}
              </div>
            </div>
          </div>
        )}

        {/* ── Step 1: Location ──────────────────────────────────── */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-base font-semibold text-black border-b border-gray-100 pb-3">Location</h2>
            <div>
              <label className={lbl}>Full address</label>
              <input className={inp} value={form.address} placeholder="Plot 45, Sector 62"
                onChange={(e) => set("address", e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={lbl}>City</label>
                <input className={inp} value={form.city} placeholder="Noida"
                  onChange={(e) => set("city", e.target.value)} />
              </div>
              <div>
                <label className={lbl}>State</label>
                <input className={inp} value={form.state} placeholder="Uttar Pradesh"
                  onChange={(e) => set("state", e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={lbl}>ZIP / PIN code</label>
                <input className={inp} value={form.zipCode} placeholder="201301"
                  onChange={(e) => set("zipCode", e.target.value)} />
              </div>
              <div>
                <label className={lbl}>Country</label>
                <input className={inp} value={form.country}
                  onChange={(e) => set("country", e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={lbl}>
                  Latitude{" "}
                  <span className="normal-case font-normal tracking-normal text-gray-400">(optional)</span>
                </label>
                <input className={inp} type="number" step="any" value={form.lat}
                  placeholder="28.6139" onChange={(e) => set("lat", e.target.value)} />
              </div>
              <div>
                <label className={lbl}>
                  Longitude{" "}
                  <span className="normal-case font-normal tracking-normal text-gray-400">(optional)</span>
                </label>
                <input className={inp} type="number" step="any" value={form.lng}
                  placeholder="77.2090" onChange={(e) => set("lng", e.target.value)} />
              </div>
            </div>
          </div>
        )}

        {/* ── Step 2: Details ───────────────────────────────────── */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-base font-semibold text-black border-b border-gray-100 pb-3">Property details</h2>
            <div className="grid grid-cols-3 gap-3">
              {[["bedrooms","Bedrooms"],["bathrooms","Bathrooms"],["balconies","Balconies"]].map(([k, l]) => (
                <div key={k}>
                  <label className={lbl}>{l}</label>
                  <input className={inp} type="number" min="0" value={form[k]}
                    onChange={(e) => set(k, e.target.value)} />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={lbl}>Area</label>
                <input className={inp} type="number" min="0" value={form.area}
                  placeholder="e.g. 1200" onChange={(e) => set("area", e.target.value)} />
              </div>
              <div>
                <label className={lbl}>Area unit</label>
                <select className={inp} value={form.areaUnit} onChange={(e) => set("areaUnit", e.target.value)}>
                  <option value="sqft">sq ft</option>
                  <option value="sqm">sq m</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={lbl}>Floor number</label>
                <input className={inp} type="number" min="0" value={form.floor}
                  onChange={(e) => set("floor", e.target.value)} />
              </div>
              <div>
                <label className={lbl}>Total floors</label>
                <input className={inp} type="number" min="0" value={form.totalFloors}
                  onChange={(e) => set("totalFloors", e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={lbl}>Facing direction</label>
                <select className={inp} value={form.facing} onChange={(e) => set("facing", e.target.value)}>
                  <option value="">-- Not specified --</option>
                  <option value="north">North</option>
                  <option value="south">South</option>
                  <option value="east">East</option>
                  <option value="west">West</option>
                </select>
              </div>
              <div>
                <label className={lbl}>Furnishing</label>
                <select className={inp} value={form.furnishing} onChange={(e) => set("furnishing", e.target.value)}>
                  <option value="unfurnished">Unfurnished</option>
                  <option value="semi-furnished">Semi-furnished</option>
                  <option value="furnished">Furnished</option>
                </select>
              </div>
            </div>
            <div>
              <label className={lbl}>Age of property (years)</label>
              <input className={inp} type="number" min="0" value={form.ageOfProperty}
                onChange={(e) => set("ageOfProperty", e.target.value)} />
            </div>
            <div className="flex items-center justify-between border border-black rounded-lg px-4 py-3">
              <span className="text-sm font-medium text-black">Parking available</span>
              <Toggle id="parking" />
            </div>
          </div>
        )}

        {/* ── Step 3: Amenities ─────────────────────────────────── */}
        {step === 3 && (
          <div>
            <h2 className="text-base font-semibold text-black border-b border-gray-100 pb-3 mb-1">Amenities</h2>
            <p className="text-xs text-gray-400 mb-4 uppercase tracking-widest">Select all that apply</p>
            <div className="grid grid-cols-2 gap-2">
              {AMENITIES.map((a) => {
                const selected = form.amenities.includes(a);
                return (
                  <button
                    key={a}
                    onClick={() => toggleAmenity(a)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-medium transition-colors
                      ${selected
                        ? "bg-black text-white border-black"
                        : "bg-white text-black border-black hover:bg-gray-50"}`}
                  >
                    <span
                      className={`w-4 h-4 rounded border flex items-center justify-center text-xs flex-shrink-0
                        ${selected ? "bg-white border-white text-black" : "border-black"}`}
                    >
                      {selected && "✓"}
                    </span>
                    {AMENITY_LABELS[a]}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Step 4: Images ────────────────────────────────────── */}
        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-base font-semibold text-black border-b border-gray-100 pb-3">Images & settings</h2>
            <label className="block border-2 border-dashed border-black rounded-xl p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors">
              <input type="file" accept="image/*" multiple className="hidden" onChange={handleImages} />
              <div className="text-3xl font-light text-black mb-2">+</div>
              <p className="text-sm font-medium text-black">Click to upload images</p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP — multiple files allowed</p>
            </label>
            {previews.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {previews.map((src, i) => (
                  <img key={i} src={src} alt=""
                    className="w-20 h-20 object-cover rounded-lg border border-black" />
                ))}
              </div>
            )}

            <div className="border border-black rounded-xl overflow-hidden mt-2">
              {[["isFeatured","Mark as featured listing"],["isVerified","Verified property"]].map(([k, l]) => (
                <div key={k} className="flex items-center justify-between px-4 py-3 border-b border-black">
                  <span className="text-sm font-medium text-black">{l}</span>
                  <Toggle id={k} />
                </div>
              ))}
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-sm font-medium text-black">Status</span>
                <select
                  className="border border-black rounded-lg px-3 py-1.5 text-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-black"
                  value={form.status}
                  onChange={(e) => set("status", e.target.value)}
                >
                  <option value="available">Available</option>
                  <option value="pending">Pending</option>
                  <option value="sold">Sold</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* ── Step 5: Review ────────────────────────────────────── */}
        {step === 5 && (
          <div>
            <h2 className="text-base font-semibold text-black border-b border-gray-100 pb-3 mb-4">
              Review & submit
            </h2>
            <div className="border border-black rounded-xl overflow-hidden">
              {[
                ["Title", form.title],
                ["Type", `${form.type} / ${form.listingType}`],
                ["Price", `₹${Number(form.price).toLocaleString("en-IN")} (${form.priceUnit?.replace("_", " ")})`],
                ["Location", [form.address, form.city, form.state, form.zipCode, form.country].filter(Boolean).join(", ") || "—"],
                ["Coordinates", form.lat && form.lng ? `${form.lat}, ${form.lng}` : "—"],
                ["Bedrooms / Bathrooms", `${form.bedrooms} / ${form.bathrooms}`],
                ["Area", form.area ? `${form.area} ${form.areaUnit}` : "—"],
                ["Floor", `${form.floor} of ${form.totalFloors}`],
                ["Furnishing", form.furnishing],
                ["Parking", form.parking ? "Yes" : "No"],
                ["Amenities", form.amenities.length ? form.amenities.map((a) => AMENITY_LABELS[a]).join(", ") : "None"],
                ["Images", `${images.length} file(s) selected`],
                ["Status", form.status],
                ["Featured", form.isFeatured ? "Yes" : "No"],
                ["Verified", form.isVerified ? "Yes" : "No"],
              ].map(([k, v], i, arr) => (
                <div
                  key={k}
                  className={`flex gap-4 px-4 py-2.5 text-sm ${i % 2 === 0 ? "bg-white" : "bg-gray-50"} ${
                    i < arr.length - 1 ? "border-b border-gray-200" : ""
                  }`}
                >
                  <span className="text-gray-400 w-40 flex-shrink-0 text-xs uppercase tracking-widest pt-0.5">{k}</span>
                  <span className="text-black font-medium">{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Navigation ───────────────────────────────────────── */}
        {submitError && (
          <div className="mt-4 px-4 py-3 border border-black rounded-lg bg-gray-50 text-sm text-black font-medium">
            ⚠ {submitError}
          </div>
        )}
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
          <button
            onClick={prevStep}
            disabled={step === 0}
            className="px-5 py-2 text-sm font-medium border border-black text-black rounded-lg disabled:opacity-25 hover:bg-gray-50 transition-colors"
          >
            ← Back
          </button>
          {step < STEPS.length - 1 ? (
            <button
              onClick={nextStep}
              className="px-6 py-2 text-sm font-medium bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-6 py-2 text-sm font-medium bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit property ↗"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}