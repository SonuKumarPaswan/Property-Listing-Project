const express= require('express');
const router = express.Router();
const { getAllUsers, registerUser, loginUser, getUserProfile, updateUserProfile, deleteUserProfile } = require('../controllers/user.controller');
const authMiddleware = require("../middlewares/auth.middleware");

// public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// protected routes
router.get("/", getAllUsers);
router.get("/profile", authMiddleware, getUserProfile);
router.put("/profile", authMiddleware, updateUserProfile);
router.delete("/profile", authMiddleware, deleteUserProfile);

module.exports = router;