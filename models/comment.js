const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    commentId: {
        type: Number,
    },
    blogId: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    parentCommentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }
});

commentSchema.pre('save', async function (next) {
    if (this.isNew) {
      try {
        const count = await mongoose.model('Comment').countDocuments().exec();
        this.blogId = count + 1;
      } catch (err) {
        return next(err);
      }
    }
    next();
  });

module.exports = mongoose.model('Comment', commentSchema);
