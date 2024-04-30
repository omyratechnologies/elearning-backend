// routes/testimonialRouter.js

const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');

// Route to create a new testimonial
router.post('/', testimonialController.createTestimonial);

// Route to get all testimonials
router.get('/', testimonialController.getAllTestimonials);

// Route to delete a testimonial by ID
router.delete('/id/:testimonialId', testimonialController.deleteTestimonial);

module.exports = router;
