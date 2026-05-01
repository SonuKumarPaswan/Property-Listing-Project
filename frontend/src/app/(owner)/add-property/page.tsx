"use client";
import api from "@/lib/api";
import React, {useState} from "react";

const AMENITY_OPTIONS = [
  {key: "gym", label: "Gym", icon: "🏋️"},
  {key: "pool", label: "Pool", icon: "🏊"},
  {key: "playground", label: "Playground", icon: "🛝"},
  {key: "security", label: "Security", icon: "🔒"},
  {key: "elevator", label: "Elevator", icon: "🛗"},
  {key: "power_backup", label: "Power Backup", icon: "⚡"},
  {key: "lift", label: "Lift", icon: "🔼"},
  {key: "intercom", label: "Intercom", icon: "📞"},
  {key: "cctv", label: "CCTV", icon: "📹"},
  {key: "garden", label: "Garden", icon: "🌿"},
  {key: "clubhouse", label: "Clubhouse", icon: "🏛️"},
];

const STEPS = ["Basic", "Location", "Details", "Amenities", "Images", "Review"];

const initialForm = {
  title: "",
  slug: "",
  description: "",
  type: "",
  listingType: "",
  price: "",
  priceUnit: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  country: "India",
  lat: "",
  lng: "",
  details: {
    bedrooms: 0,
    bathrooms: 0,
    balconies: 0,
    area: "",
    areaUnit: "sqft",
    floor: 0,
    totalFloors: 0,
    facing: "",
    furnishing: "unfurnished",
    parking: false,
    ageOfProperty: 0,
  },
  amenities: [] as string[],
  images: [] as File[],
  status: "",
  isVerified: false,
  isFeatured: false,
};

// ─── Reusable Field Wrapper ───────────────────────────────────────────────────
const Field = ({
  label,
  children,
  full = false,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) => (
  <div className={`flex flex-col gap-1.5 ${full ? "col-span-2" : ""}`}>
    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
      {label}
    </label>
    {children}
  </div>
);

// ─── Shared input / select className ─────────────────────────────────────────
const inputCls =
  "w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg outline-none focus:border-gray-900 transition-colors placeholder:text-gray-400 bg-white";

const PropertyListing = () => {
  const [step, setStep] = useState(1);
  const [propertyData, setPropertyData] = useState(initialForm);

  const nextStep = () => setStep((p) => Math.min(p + 1, STEPS.length));
  const prevStep = () => setStep((p) => Math.max(p - 1, 1));

  // ─── Handlers ──────────────────────────────────────────────────────────────
  const DETAIL_FIELDS = [
    "bedrooms",
    "bathrooms",
    "balconies",
    "area",
    "areaUnit",
    "floor",
    "totalFloors",
    "facing",
    "furnishing",
    "parking",
    "ageOfProperty",
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const {name, value, type} = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    const val = type === "checkbox" ? checked : value;

    if (DETAIL_FIELDS.includes(name)) {
      setPropertyData((p) => ({
        ...p,
        details: {...p.details, [name]: val},
      }));
    } else {
      setPropertyData((p) => ({...p, [name]: val}));
    }
  };

  // handleImageUpload hatao, yeh simple handler lagao

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;
    const newFiles = [...files].filter((f) => f.type.startsWith("image/"));
    setPropertyData((p) => ({...p, images: [...p.images, ...newFiles]}));
  };

  const removeImage = (index: number) =>
    setPropertyData((p) => ({
      ...p,
      images: p.images.filter((_, i) => i !== index),
    }));

  // handleSubmit mein FormData use karo
  const handleSubmit = async () => {
    const fd = new FormData();

    // Simple fields
    fd.append("title", propertyData.title);
    fd.append("slug", propertyData.slug);
    fd.append("description", propertyData.description);
    fd.append("type", propertyData.type);
    fd.append("listingType", propertyData.listingType);
    fd.append("price", propertyData.price);
    fd.append("priceUnit", propertyData.priceUnit);
    fd.append("status", propertyData.status);

    // Location
    fd.append("address", propertyData.address);
    fd.append("city", propertyData.city);
    fd.append("state", propertyData.state);
    fd.append("zipCode", propertyData.zipCode);
    fd.append("country", propertyData.country);
    fd.append("lat", propertyData.lat);
    fd.append("lng", propertyData.lng);

    // Nested objects — JSON string ke roop mein

    fd.append("details", JSON.stringify(propertyData.details));
    fd.append("amenities", JSON.stringify(propertyData.amenities));

    // Images — har file alag append
    propertyData.images.forEach((file) => {
      fd.append("images", file);
    });
    console.log("Submitting form with data:", propertyData);
    const res = await api.post("/properties", fd, {
      headers: {"Content-Type": "multipart/form-data"},
    });
    if (res.status === 201) {
      alert("Property listing created successfully!");
      setPropertyData(initialForm);
      setStep(1);
    } else {
      alert("Failed to create property listing. Please try again.");
    }
    console.log("Created:", res.data);
  }; 

  // ─── Step counter for bedrooms/bathrooms/balconies ────────────────────────

  const Counter = ({
    name,
    label,
  }: {
    name: keyof typeof propertyData.details;
    label: string;
  }) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
        {label}
      </label>
      <div className="flex border border-gray-300 rounded-lg overflow-hidden">
        <button
          type="button"
          onClick={() =>
            setPropertyData((p) => ({
              ...p,
              details: {
                ...p.details,
                [name]: Math.max(0, (p.details[name] as number) - 1),
              },
            }))
          }
          className="w-9 flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-500 text-lg transition-colors"
        >
          −
        </button>
        <input
          type="number"
          name={name}
          min={0}
          value={(propertyData.details[name] as number) || 0}
          onChange={handleChange}
          className="flex-1 text-center text-sm py-2.5 border-none outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <button
          type="button"
          onClick={() =>
            setPropertyData((p) => ({
              ...p,
              details: {
                ...p.details,
                [name]: (p.details[name] as number) + 1,
              },
            }))
          }
          className="w-9 flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-500 text-lg transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white text-black p-6 rounded-2xl shadow-sm max-w-2xl mx-auto my-10">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Add Property
        </h1>

        {/* ── Step 1: Basic ─────────────────────────────────────────────── */}
        {step === 1 && (
          <>
            <h2 className="text-xl font-medium text-gray-900 mb-6 pb-4 border-b border-gray-200">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Title" full>
                <input
                  name="title"
                  type="text"
                  placeholder="e.g. 3BHK Apartment in Sector 62"
                  value={propertyData.title}
                  onChange={handleChange}
                  className={inputCls}
                />
              </Field>

              <Field label="Description" full>
                <textarea
                  name="description"
                  rows={3}
                  placeholder="Describe the property — location highlights, amenities..."
                  value={propertyData.description}
                  onChange={handleChange}
                  className={`${inputCls} resize-y`}
                />
              </Field>

              <Field label="Property Type">
                <select
                  name="type"
                  value={propertyData.type}
                  onChange={handleChange}
                  className={`${inputCls} appearance-none`}
                >
                  <option value="">Select type</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="villa">Villa</option>
                  <option value="plot">Plot</option>
                  <option value="office">Office</option>
                  <option value="shop">Shop</option>
                  <option value="studio">Studio</option>
                  <option value="pg">PG</option>
                  <option value="farmhouse">Farmhouse</option>
                  <option value="warehouse">Warehouse</option>
                </select>
              </Field>

              <Field label="Listing Type">
                <select
                  name="listingType"
                  value={propertyData.listingType}
                  onChange={handleChange}
                  className={`${inputCls} appearance-none`}
                >
                  <option value="">Select listing</option>
                  <option value="sale">For Sale</option>
                  <option value="rent">For Rent</option>
                </select>
              </Field>

              <Field label="Price" full>
                <div className="flex gap-2">
                  <input
                    name="price"
                    type="number"
                    placeholder="e.g. 4500000"
                    value={propertyData.price}
                    onChange={handleChange}
                    className={`${inputCls}  appearance-none`}
                  />
                  <select
                    name="priceUnit"
                    value={propertyData.priceUnit}
                    onChange={handleChange}
                    className={`${inputCls}  appearance-none`}
                  >
                    <option value="">Unit</option>
                    <option value="total">Total</option>
                    <option value="per_month">Per Month</option>
                  </select>
                </div>
              </Field>
            </div>
          </>
        )}

        {/* ── Step 2: Location ──────────────────────────────────────────── */}
        {step === 2 && (
          <>
            <h2 className="text-xl font-medium text-gray-900 mb-6 pb-4 border-b border-gray-200">
              Location
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Address" full>
                <input
                  name="address"
                  type="text"
                  placeholder="Street address, building, floor..."
                  value={propertyData.address}
                  onChange={handleChange}
                  className={inputCls}
                />
              </Field>

              <Field label="City">
                <input
                  name="city"
                  type="text"
                  placeholder="e.g. Noida"
                  value={propertyData.city}
                  onChange={handleChange}
                  className={inputCls}
                />
              </Field>

              <Field label="State">
                <input
                  name="state"
                  type="text"
                  placeholder="e.g. Uttar Pradesh"
                  value={propertyData.state}
                  onChange={handleChange}
                  className={inputCls}
                />
              </Field>

              <Field label="ZIP Code">
                <input
                  name="zipCode"
                  type="text"
                  placeholder="e.g. 201301"
                  value={propertyData.zipCode}
                  onChange={handleChange}
                  className={inputCls}
                />
              </Field>

              <Field label="Country">
                <select
                  name="country"
                  value={propertyData.country}
                  onChange={handleChange}
                  className={`${inputCls} appearance-none`}
                >
                  <option>India</option>
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>UAE</option>
                </select>
              </Field>

              {/* Coordinates */}
              <div className="col-span-2 bg-gray-50 border border-gray-200 rounded-xl p-4">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                  📍 Coordinates{" "}
                  <span className="normal-case font-normal text-gray-400">
                    — optional
                  </span>
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Latitude">
                    <input
                      name="lat"
                      type="number"
                      placeholder="e.g. 28.6139"
                      step="any"
                      value={propertyData.lat}
                      onChange={handleChange}
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Longitude">
                    <input
                      name="lng"
                      type="number"
                      placeholder="e.g. 77.2090"
                      step="any"
                      value={propertyData.lng}
                      onChange={handleChange}
                      className={inputCls}
                    />
                  </Field>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ── Step 3: Details ───────────────────────────────────────────── */}
        {step === 3 && (
          <>
            <h2 className="text-xl font-medium text-gray-900 mb-6 pb-4 border-b border-gray-200">
              Property Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Counters */}
              <div className="col-span-2 grid grid-cols-3 gap-4">
                <Counter name="bedrooms" label="Bedrooms" />
                <Counter name="bathrooms" label="Bathrooms" />
                <Counter name="balconies" label="Balconies" />
              </div>

              {/* Area */}
              <Field label="Area" full>
                <div className="flex gap-2">
                  <input
                    name="area"
                    type="number"
                    placeholder="e.g. 1200"
                    min={0}
                    value={propertyData.details.area}
                    onChange={handleChange}
                    className={`${inputCls} appearance-none`}
                  />
                  <select
                    name="areaUnit"
                    value={propertyData.details.areaUnit}
                    onChange={handleChange}
                    className={`${inputCls} w-24 appearance-none`}
                  >
                    <option value="sqft">sq ft</option>
                    <option value="sqm">sq m</option>
                  </select>
                </div>
              </Field>

              {/* Floor */}
              <Field label="Floor">
                <input
                  name="floor"
                  type="number"
                  placeholder="e.g. 3"
                  min={0}
                  value={propertyData.details.floor}
                  onChange={handleChange}
                  className={inputCls}
                />
              </Field>

              <Field label="Total Floors">
                <input
                  name="totalFloors"
                  type="number"
                  placeholder="e.g. 12"
                  min={0}
                  value={propertyData.details.totalFloors}
                  onChange={handleChange}
                  className={inputCls}
                />
              </Field>

              {/* Facing */}
              <Field label="Facing" full>
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  {["north", "south", "east", "west"].map((dir) => (
                    <button
                      key={dir}
                      type="button"
                      onClick={() =>
                        setPropertyData((p) => ({
                          ...p,
                          details: {...p.details, facing: dir},
                        }))
                      }
                      className={`flex-1 py-2.5 text-sm font-medium capitalize transition-colors border-r border-gray-300 last:border-0
                        ${propertyData.details.facing === dir ? "bg-gray-900 text-white" : "bg-white text-gray-500 hover:bg-gray-50"}`}
                    >
                      {dir}
                    </button>
                  ))}
                </div>
              </Field>

              {/* Furnishing */}
              <Field label="Furnishing" full>
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  {["unfurnished", "semi-furnished", "furnished"].map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() =>
                        setPropertyData((p) => ({
                          ...p,
                          details: {...p.details, furnishing: f},
                        }))
                      }
                      className={`flex-1 py-2.5 text-sm font-medium capitalize transition-colors border-r border-gray-300 last:border-0
                        ${propertyData.details.furnishing === f ? "bg-gray-900 text-white" : "bg-white text-gray-500 hover:bg-gray-50"}`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </Field>

              {/* Parking */}
              <Field label="Parking" full>
                <div className="flex items-center justify-between px-3 py-2.5 border border-gray-300 rounded-lg">
                  <span className="text-sm text-gray-700">
                    Parking available
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setPropertyData((p) => ({
                        ...p,
                        details: {...p.details, parking: !p.details.parking},
                      }))
                    }
                    className={`relative w-10 h-[22px] pr-9 rounded-full transition-colors ${propertyData.details.parking ? "bg-gray-900" : "bg-gray-300"}`}
                  >
                    <span
                      className={`absolute top-[3px] w-4 h-4 bg-white rounded-full shadow transition-transform
                      ${propertyData.details.parking ? "translate-x-[19px]" : "translate-x-[3px]"}`}
                    />
                  </button>
                </div>
              </Field>

              {/* Age */}
              <Field label="Age of Property (years)" full>
                <input
                  name="ageOfProperty"
                  type="number"
                  placeholder="e.g. 5"
                  min={0}
                  value={propertyData.details.ageOfProperty}
                  onChange={handleChange}
                  className={inputCls}
                />
              </Field>
            </div>
          </>
        )}

        {/*  Step 4: Amenities  */}
        {step === 4 && (
          <>
            <h2 className="text-xl font-medium text-gray-900 mb-1">
              Amenities
            </h2>
            <p className="text-sm text-gray-400 mb-6 pb-4 border-b border-gray-200">
              Property mein available suvidhaayein select karein
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {AMENITY_OPTIONS.map(({key, label, icon}) => {
                const isChecked = propertyData.amenities.includes(key);
                return (
                  <label
                    key={key}
                    className={`flex items-center gap-2.5 px-4 py-3 rounded-lg border cursor-pointer transition-all select-none
                      ${isChecked ? "bg-gray-900 border-gray-900" : "bg-white border-gray-300 hover:border-gray-900"}`}
                  >
                    <input
                      type="checkbox"
                      name="amenities"
                      value={key}
                      checked={isChecked}
                      onChange={(e) => {
                        const {checked, value} = e.target;
                        setPropertyData((p) => ({
                          ...p,
                          amenities: checked
                            ? [...p.amenities, value]
                            : p.amenities.filter((a) => a !== value),
                        }));
                      }}
                      className="sr-only"
                    />
                    <span className="text-base leading-none">{icon}</span>
                    <span
                      className={`text-sm font-medium flex-1 ${isChecked ? "text-white" : "text-gray-700"}`}
                    >
                      {label}
                    </span>
                    <span
                      className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors
                      ${isChecked ? "bg-white border-white" : "border-gray-300"}`}
                    >
                      {isChecked && (
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path
                            d="M1 4l2 2 4-4"
                            stroke="black"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                  </label>
                );
              })}
            </div>
            {propertyData.amenities.length > 0 && (
              <p className="mt-4 text-sm text-gray-400">
                <span className="font-medium text-gray-900">
                  {propertyData.amenities.length}
                </span>{" "}
                {propertyData.amenities.length === 1 ? "amenity" : "amenities"}{" "}
                selected
              </p>
            )}
          </>
        )}

        {/* ── Step 5: Images ────────────────────────────────────────────── */}
        {step === 5 && (
          <>
            <h2 className="text-xl font-medium text-gray-900 mb-1">Images</h2>
            <p className="text-sm text-gray-400 mb-6 pb-4 border-b border-gray-200">
              Property ki photos add karein — pehli image cover photo hogi
            </p>

            <label
              className="flex flex-col items-center gap-3 p-10 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-gray-900 hover:bg-gray-50 transition-all"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                handleFileSelect(e.dataTransfer.files);
              }}
            >
              <input
                type="file"
                accept="image/*"
                multiple
                className="sr-only"
                onChange={(e) => handleFileSelect(e.target.files)}
              />
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M9 12V4M9 4L6 7M9 4l3 3"
                    stroke="#374151"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 14h12"
                    stroke="#374151"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-900">
                Photos drag karein ya browse karein
              </p>
              <p className="text-xs text-gray-400">
                JPG, PNG, WEBP — max 5MB each
              </p>
            </label>

            {propertyData.images.length > 0 && (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                  {propertyData.images.map((file, i) => (
                    <div
                      key={i}
                      className="relative aspect-[4/3] rounded-lg overflow-hidden border border-gray-200 bg-gray-100"
                    >
                      {/* ✅ File object se preview */}
                      <img
                        src={URL.createObjectURL(file)}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      {i === 0 && (
                        <span className="absolute bottom-2 left-2 text-[10px] font-medium bg-black/60 text-white px-2 py-0.5 rounded-full">
                          Cover
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center hover:bg-black/80 transition-colors"
                      >
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                        >
                          <path
                            d="M2 2l6 6M8 2L2 8"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-3">
                  <p className="text-sm text-gray-400">
                    <span className="font-medium text-gray-900">
                      {propertyData.images.length}
                    </span>{" "}
                    images added
                  </p>
                  <button
                    type="button"
                    onClick={() => setPropertyData((p) => ({...p, images: []}))}
                    className="text-sm text-gray-400 underline hover:text-gray-700"
                  >
                    Sab hatao
                  </button>
                </div>
              </>
            )}
          </>
        )}

        {/* ── Step 6: Review ────────────────────────────────────────────── */}
        {step === 6 && (
          <>
            <h2 className="text-xl font-medium text-gray-900 mb-1">
              Review & Submit
            </h2>
            <p className="text-sm text-gray-400 mb-6 pb-4 border-b border-gray-200">
              Data check karo aur submit karo
            </p>
            <pre className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-xs text-gray-500 leading-relaxed overflow-x-auto mb-6">
              {JSON.stringify(propertyData, null, 2)}
            </pre>
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full py-3 text-sm font-medium bg-gray-900 text-white rounded-xl hover:opacity-85 transition-opacity"
            >
              Submit Property Listing
            </button>
          </>
        )}

        {/* ── Navigation ────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-200">
          {step > 1 ? (
            <button
              onClick={prevStep}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
            >
              ← Previous
            </button>
          ) : (
            <div />
          )}

          <div className="flex gap-1.5">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className="h-1.5 rounded-full transition-all duration-200"
                style={{
                  width: i + 1 === step ? "18px" : "6px",
                  background: i + 1 === step ? "#111827" : "#D1D5DB",
                }}
              />
            ))}
          </div>

          {step < STEPS.length ? (
            <button
              onClick={nextStep}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-gray-900 text-white rounded-lg hover:opacity-85 transition-opacity"
            >
              Next →
            </button>
          ) : (
            <div />
          )}
        </div>
      </div>
    </main>
  );
};

export default PropertyListing;








// "use client";

// import React, { useState } from "react";
// import api from "@/lib/api"; 

// const Page = () => {
//   const [images, setImages] = useState<File[]>([]);

//   // 📸 select images
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
//     setImages(Array.from(e.target.files || []));
//   };

//   // 🚀 submit
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (images.length === 0) {
//       alert("Please select images");
//       return;
//     }

//     const fd = new FormData();

//     images.forEach((file) => {
//       fd.append("images", file); // backend same hona chahiye
//     });

//     try {
//       console.log("Submitting form with images:", images);
//       const res = await api.post("/properties", fd);
//       console.log(res.data);
//       alert("Uploaded successfully");
//     } catch (err) {
//       console.error(err);
//       alert("Upload failed");
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-lg font-bold mb-4">Upload Images</h2>

//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         {/* file input */}
//         <input
//           type="file"
//           multiple
//           onChange={handleChange}
//           className="mb-4"
//         />

//         {/* button */}
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Upload
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Page;