// routes/testimonialRouter.js

const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');
const { verifyApiKey } = require('../Middlewares/apiKeyMiddleware');


// Route to create a new testimonial with API key verification
router.post('/', verifyApiKey, testimonialController.createTestimonial);

// Route to get all testimonials with API key verification
router.get('/', verifyApiKey, testimonialController.getAllTestimonials);

// Route to delete a testimonial by ID with API key verification
router.delete('/id/:testimonialId', verifyApiKey, testimonialController.deleteTestimonial);

module.exports = router;
