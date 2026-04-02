const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["apartment", "house", "condo", "townhouse", "villa", "plot", "office", "shop", "studio", "warehouse", "farmhouse", "pg"],
      required: true,
      default: "apartment",
    },
    listingType: {
      type: String,
      enum: ["rent", "sale"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    priceUnit: {
      type: String,
      enum: ["per_month", "total"],
      required: true,
    },
    location: {
      address: { type: String },
      city:    { type: String },
      state:   { type: String },
      zipCode: { type: String },
      country: { type: String, default: "India" },
      coordinates: {
        type:        { type: String, default: "Point" },
        coordinates: { type: [Number] },
      },
    },
    details: {
      bedrooms:      { type: Number, default: 0 },
      bathrooms:     { type: Number, default: 0 },
      balconies:     { type: Number, default: 0 },
      area:          { type: Number },
      areaUnit:      { type: String, enum: ["sqft", "sqm"], default: "sqft" },
      floor:         { type: Number, default: 0 },
      totalFloors:   { type: Number, default: 0 },
      facing:        { type: String, enum: ["north", "south", "east", "west"] },
      furnishing:    { type: String, enum: ["furnished", "semi-furnished", "unfurnished"], default: "unfurnished" },
      parking:       { type: Boolean, default: false },
      ageOfProperty: { type: Number, default: 0 },
    },
    amenities: {
      type: [String],
      enum: ["gym", "pool", "playground", "security", "elevator", "power_backup", "lift", "intercom", "cctv", "garden", "clubhouse"],
      default: [],
    },
    images: [
      {
        url:       { type: String },
        public_id: { type: String },
      },
    ],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    agent: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["available", "pending", "sold"],
      default: "available",
    },
    isVerified: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Geo index
propertySchema.index({ "location.coordinates": "2dsphere" });

const Property = mongoose.model("Property", propertySchema);
module.exports = { Property };