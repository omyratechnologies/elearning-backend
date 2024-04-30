// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to register a new user
router.post('/register', userController.registerUser);

// Other user-related routes can be added here

module.exports = router;
