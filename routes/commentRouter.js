const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Route to create a new comment
router.post('/', commentController.createComment);

// Route to get all comments for a specific blog post
router.get('/blog/:blogId', commentController.getCommentsByBlogId);

// Route to get a specific comment by its ID
router.get('/:commentId', commentController.getCommentById);

// Route to delete a specific comment by its ID
router.delete('/:commentId', commentController.deleteCommentById);

// Add other routes as needed, such as updating comments, etc.

module.exports = router;
