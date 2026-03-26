const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  title: {
    typse: String,
    required: true,
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
    enmum: ["apartment", "house", "condo", "townhouse", "villa"],
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
    address: {
      type: String,
    },
    city: {
      typse: String,
    },
    state: {
      type: String,
    },

    zipCode: {
      type: String,
    },
    country: {
      type: String,
    },
    coordinates: {
      type: "Point",
      coordinates: [Number], // [longitude, latitude]
    },
  },
  details: {
    bedrooms: {
      type: Number,
    },
    bathrooms: {
      type: Number,
    },
    balconies: {
      type: Number,
    },
    area: {
      type: Number,
    },
    areaUnit: {
      type: String,
      enum: ["sqft", "sqm"],
    },
    floor: {
      type: Number,
    },
    totalFloors: {
      type: Number,
    },
    facing: {
      type: String,
      enum: ["north", "south", "east", "west"],
    },
    furnishing: {
      type: Sting,
      enum: ["furnished", "semi-furnished", "unfurnished"],
    },
    parking: {
      type: Boolean,
    },
    ageOfProperty: {
      type: Number,
    },
  },
  amenities: {
    type: [String],
    enum: [
      "gym",
      "pool",
      "playground",
      "security",
      "elevator",
      "power_backup",
      "lift",
      "security",
      "intercom",
      "cctv",
      "garden",
      "clubhouse",
    ],
  },
  images: [
    {
      type: String,
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  status: {
    type: String,
    enum: ["available", "pending", "sold"],
    default: "available",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Property = mongoose.model("Property", propertySchema);

module.exports = {Property};