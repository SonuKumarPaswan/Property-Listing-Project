const express = require('express');
const router = express.Router();
const userRoutes = require('./user.routes');
const propertyRoutes = require('./property.routes');
const { route } = require('../app');

// user routes
router.use('/api/users', userRoutes);
router.use('/api/properties', propertyRoutes);


module.exports = router;
