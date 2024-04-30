// course model
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    blogId: {
        type: Number,
    },
    title: {
        type: String,
        required: true
      },
      content: {
        type: String,
        required: true
      },
      sections: [{
        title: {
          type: String,
        },
        content: {
          type: String,
        },
        image: {
            type: String
        }
    }],
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    author: {
        type: String,
    },
    postDate: {
        type: String,
        default: Date.now
    },
    isPopular: {
        type: Boolean,
        default: false
    }
});

// courseId auto-increment

blogSchema.pre('save', async function (next) {
    if (this.isNew) {
      try {
        const count = await mongoose.model('blog').countDocuments().exec();
        this.blogId = count + 1;
      } catch (err) {
        return next(err);
      }
    }
    next();
  });

module.exports = mongoose.model('blog', blogSchema, 'blog');
