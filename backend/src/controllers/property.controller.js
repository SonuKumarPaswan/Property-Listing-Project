
const { cloudinary } = require("../config/cloudinary");
const slugify = require("slugify");
const { Property } = require("../models/Property");

// GET /api/properties
const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find({ status: "available" })
      .populate("owner", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: properties.length, data: properties });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



// GET /api/properties/:id
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate("owner", "name email")
      .populate("agent", "name email");

    if (!property)
      return res.status(404).json({ success: false, message: "Property not found" });

    res.status(200).json({ success: true, data: property });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



// POST /api/properties  (with image upload)

// const createProperty = async (req, res) => {
//   try {

//     console.log("Received property data:", req.body);
//         console.log("Files:", req.files); 
//     // Auto-generate slug
//     req.body.slug = slugify(req.body.title, { lower: true, strict: true });

//     // Attach uploaded images from Cloudinary
//     if (req.files && req.files.length > 0) {
//       req.body.images = req.files.map((file) => ({
//         url:       file.path,
//         public_id: file.filename,
//       }));
//     }

//     const property = await Property.create(req.body);
//     res.status(201).json({ success: true, data: property });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

const createProperty = async (req, res) => {
  try {
    console.log("📦 Body:", req.body);
    console.log("📁 Files:", req.files);

    // ✅ multipart/form-data mein JSON strings parse karne padte hain
    if (typeof req.body.location === "string") {
      req.body.location = JSON.parse(req.body.location);
    }
    if (typeof req.body.details === "string") {
      req.body.details = JSON.parse(req.body.details);
    }
    if (typeof req.body.amenities === "string") {
      req.body.amenities = JSON.parse(req.body.amenities);
    }

    // ✅ slug generate
    req.body.slug = slugify(req.body.title, { lower: true, strict: true });

    // ✅ images attach
    if (req.files && req.files.length > 0) {
      req.body.images = req.files.map((file) => ({
        url:       file.path,
        public_id: file.filename,
      }));
    }

    const property = await Property.create(req.body);
    res.status(201).json({ success: true, data: property });

  } catch (err) {
    console.error("❌ Full Error:", err.message); // ✅ terminal mein dikhega
    res.status(500).json({
      success: false,
      message: err.message,
      details: err.errors  // ✅ validation error details
    });
  }
};



// PUT /api/properties/:id
const updateProperty = async (req, res) => {
  try {
    console.log("📦 Body:", req.body);      // ✅ add karo
    console.log("📁 Files:", req.files);    
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!property)
      return res.status(404).json({ success: false, message: "Property not found" });

    res.status(200).json({ success: true, data: property });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// DELETE /api/properties/:id  (also deletes images from Cloudinary)
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property)
      return res.status(404).json({ success: false, message: "Property not found" });

    // Delete images from Cloudinary
    for (const img of property.images) {
      if (img.public_id) await cloudinary.uploader.destroy(img.public_id);
    }

    await property.deleteOne();
    res.status(200).json({ success: true, message: "Property deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/properties/search
const searchProperties = async (req, res) => {
  try {
    const {
      keyword, type, status, city,
      minPrice, maxPrice, minArea, maxArea,
      bedrooms, bathrooms, listingType,
      sortBy, order, page, limit,
    } = req.query;

    const query = {};

    if (keyword)     query.$or = [
      { title:       { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
    ];
    if (type)        query.type        = type;
    if (status)      query.status      = status;
    if (listingType) query.listingType = listingType;
    if (city)        query["location.city"] = { $regex: city, $options: "i" };
    if (minPrice || maxPrice) query.price = {
      ...(minPrice && { $gte: Number(minPrice) }),
      ...(maxPrice && { $lte: Number(maxPrice) }),
    };
    if (minArea || maxArea) query["details.area"] = {
      ...(minArea && { $gte: Number(minArea) }),
      ...(maxArea && { $lte: Number(maxArea) }),
    };
    if (bedrooms)  query["details.bedrooms"]  = { $gte: Number(bedrooms) };
    if (bathrooms) query["details.bathrooms"] = { $gte: Number(bathrooms) };

    const sortOrder  = order === "desc" ? -1 : 1;
    const sortField  = sortBy || "createdAt";
    const pageNum    = parseInt(page)  || 1;
    const limitNum   = parseInt(limit) || 10;
    const skip       = (pageNum - 1) * limitNum;

    const [properties, total] = await Promise.all([
      Property.find(query).sort({ [sortField]: sortOrder }).skip(skip).limit(limitNum),
      Property.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      pagination: {
        total,
        totalPages: Math.ceil(total / limitNum),
        currentPage: pageNum,
        itemsPerPage: limitNum,
        hasNextPage: pageNum < Math.ceil(total / limitNum),
        hasPrevPage: pageNum > 1,
      },
      data: properties,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getAllProperties, getPropertyById,
  createProperty,   updateProperty,
  deleteProperty,  searchProperties,
};