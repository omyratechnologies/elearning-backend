// routes/courseRoutes.js
const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { verifyApiKey } = require('../Middlewares/apiKeyMiddleware');

// Route to create a new course with API key verification
router.post('/', verifyApiKey, courseController.createCourse);

// Route to get all courses with API key verification
router.get('/', verifyApiKey, courseController.getAllCourses);

// Route to get a course by ID with API key verification
router.get('/id/:courseId', verifyApiKey, courseController.getCourseById);

// Route to update a course by ID with API key verification
router.put('/id/:courseId', verifyApiKey, courseController.updateCourse);

// Route to delete a course by ID with API key verification
router.delete('/id/:courseId', verifyApiKey, courseController.deleteCourse);

// Route to get featured courses with API key verification
router.get('/featured', verifyApiKey, courseController.getFeaturedCourses);

// Route to get upcoming courses with API key verification
router.get('/upcoming', verifyApiKey, courseController.getUpcomingCourses);

module.exports = router;

