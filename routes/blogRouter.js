// routes/blogRoutes.js
const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// Route to create a new blog
router.post('/', blogController.createblog);

// Route to get all blogs
router.get('/', blogController.getAllblogs);

// Route to get a blog by ID
router.get('/id/:blogId', blogController.getblogById);

// Route to update a blog by ID
router.put('/id/:blogId', blogController.updateblog);

// Route to delete a blog by ID
router.delete('/id/:blogId', blogController.deleteblog);

// Route to get featured blogs
router.get('/popular', blogController.getFeaturedblogs);

module.exports = router;
