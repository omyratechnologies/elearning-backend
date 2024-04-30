// routes/blogRoutes.js
const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const { verifyApiKey } = require('../Middlewares/apiKeyMiddleware');


// Route to create a new blog with API key verification
router.post('/', verifyApiKey, blogController.createblog);

// Route to get all blogs with API key verification
router.get('/', verifyApiKey, blogController.getAllblogs);

// Route to get a blog by ID with API key verification
router.get('/id/:blogId', verifyApiKey, blogController.getblogById);

// Route to update a blog by ID with API key verification
router.put('/id/:blogId', verifyApiKey, blogController.updateblog);

// Route to delete a blog by ID with API key verification
router.delete('/id/:blogId', verifyApiKey, blogController.deleteblog);

// Route to get featured blogs with API key verification
router.get('/popular', verifyApiKey, blogController.getFeaturedblogs);

module.exports = router;
