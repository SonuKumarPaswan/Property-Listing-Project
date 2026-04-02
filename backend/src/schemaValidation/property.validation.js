const Joi = require("joi");

const propertyValidationSchema = Joi.object({
  title: Joi.string().min(5).max(150).required().messages({
    "string.min": "Title must be at least 5 characters",
    "string.max": "Title must not exceed 150 characters",
    "any.required": "Title is required",
  }),

  slug: Joi.string().lowercase().replace(/ /g, "-").max(200),

  description: Joi.string().min(20).max(2000).required().messages({
    "string.min": "Description must be at least 20 characters",
    "any.required": "Description is required",
  }),

  type: Joi.string()
    .valid("apartment", "house", "condo", "townhouse", "villa")
    .required(),

  listingType: Joi.string().valid("rent", "sale").required(),

  price: Joi.number().positive().required().messages({
    "number.positive": "Price must be a positive number",
    "any.required": "Price is required",
  }),

  priceUnit: Joi.string().valid("per_month", "total").required(),

  location: Joi.object({
    address: Joi.string().max(200),
    city: Joi.string().max(100),
    state: Joi.string().max(100),
    zipCode: Joi.string().max(20),
    country: Joi.string().max(100),
    coordinates: Joi.object({
      type: Joi.string().default("Point"),
      coordinates: Joi.array().items(Joi.number()).length(2),
    }),
  }),

  details: Joi.object({
    bedrooms: Joi.number().integer().min(0).max(20),
    bathrooms: Joi.number().integer().min(0).max(20),
    balconies: Joi.number().integer().min(0),
    area: Joi.number().positive(),
    areaUnit: Joi.string().valid("sqft", "sqm"),
    floor: Joi.number().integer().min(0),
    totalFloors: Joi.number().integer().min(1),
    facing: Joi.string().valid("north", "south", "east", "west"),
    furnishing: Joi.string().valid(
      "furnished",
      "semi-furnished",
      "unfurnished",
    ),
    parking: Joi.boolean(),
    ageOfProperty: Joi.number().integer().min(0),
  }),

  amenities: Joi.array().items(
    Joi.string().valid(
      "gym",
      "pool",
      "playground",
      "security",
      "elevator",
      "power_backup",
      "lift",
      "intercom",
      "cctv",
      "garden",
      "clubhouse",
    ),
  ),
  status: Joi.string().valid("available", "pending", "sold"),
  isVerified: Joi.boolean(),
  isFeatured: Joi.boolean(),
  owner: Joi.string().hex().length(24), 
  agent: Joi.string().hex().length(24),
});

module.exports = {propertyValidationSchema};
