// Testimonial model
const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    testimonialId: {
        type: Number,
    },
    whatTheySay: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    course: {
        type: String,
    },
    postDate: {
        type: Date,
        default: Date.now
    },
});

// courseId auto-increment

testimonialSchema.pre('save', async function (next) {
    if (this.isNew) {
      try {
        const count = await mongoose.model('testimonial').countDocuments().exec();
        this.testimonialId = count + 1;
      } catch (err) {
        return next(err);
      }
    }
    next();
  });

module.exports = mongoose.model('testimonial', testimonialSchema, 'testimonial');
