const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const { verifyApiKey } = require('../Middlewares/apiKeyMiddleware');

// Route to create a new comment with API key verification
router.post('/', verifyApiKey, commentController.createComment);

// Route to get all comments for a specific blog post with API key verification
router.get('/blog/:blogId', verifyApiKey, commentController.getCommentsByBlogId);

// Route to get a specific comment by its ID with API key verification
router.get('/:commentId', verifyApiKey, commentController.getCommentById);

// Route to delete a specific comment by its ID with API key verification
router.delete('/:commentId', verifyApiKey, commentController.deleteCommentById);



module.exports = router;
