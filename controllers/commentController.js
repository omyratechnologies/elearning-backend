const Comment = require('../models/comment');

// Controller to create a new comment
exports.createComment = async (req, res) => {
    try {
        const { blogId, name, email, message, parentCommentId } = req.body;
        
        // Create a new comment instance
        const newComment = new Comment({
            blogId,
            name,
            email,
            message,
            parentCommentId
        });

        // Save the new comment to the database
        const comment = await newComment.save();

        res.status(201).json(comment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Controller to get all comments for a specific blog post
exports.getCommentsByBlogId = async (req, res) => {
    try {
        const { blogId } = req.params;

        // Find all comments associated with the specified blogId
        const comments = await Comment.find({ blogId });

        res.json(comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Controller to get a specific comment by its ID
exports.getCommentById = async (req, res) => {
    try {
        const { commentId } = req.params;

        // Find the comment by its ID
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ msg: 'Comment not found' });
        }

        res.json(comment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Controller to delete a specific comment by its ID
exports.deleteCommentById = async (req, res) => {
    try {
        const { commentId } = req.params;

        // Find and delete the comment by its ID
        const comment = await Comment.findByIdAndDelete(commentId);

        if (!comment) {
            return res.status(404).json({ msg: 'Comment not found' });
        }

        res.json({ msg: 'Comment deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Add other controllers as needed, such as updating a comment, etc.
