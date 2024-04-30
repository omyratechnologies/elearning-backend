// routes/courseRoutes.js
const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Route to create a new course
router.post('/', courseController.createCourse);

// Route to get all courses
router.get('/', courseController.getAllCourses);

// Route to get a course by ID
router.get('/id/:courseId', courseController.getCourseById);

// Route to update a course by ID
router.put('/id/:courseId', courseController.updateCourse);

// Route to delete a course by ID
router.delete('/id/:courseId', courseController.deleteCourse);

// Route to get featured courses
router.get('/featured', courseController.getFeaturedCourses);

// Route to get upcoming courses
router.get('/upcoming', courseController.getUpcomingCourses);

module.exports = router;
