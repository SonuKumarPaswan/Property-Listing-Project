const express = require("express");
const router = express.Router();
const {upload} = require("../config/cloudinary");
const {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  searchProperties,
} = require("../controllers/property.controller");
const validate = require("../middlewares/validate.middleware");
const {
  propertyValidationSchema,
} = require("../schemaValidation/property.validation");

router.get("/search", searchProperties);
router.get("/", getAllProperties);
router.get("/:id", getPropertyById);

router.post("/",  createProperty);

router.put("/:id", upload.array("images", 10), updateProperty);
router.delete("/:id", deleteProperty);

module.exports = router;
