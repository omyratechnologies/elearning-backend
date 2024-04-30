// course model
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseId: {
        type: Number,
    },
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    description2: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    instructor: {
        type: String,
    },
    aboutInstructor: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    registrationsEndDate:{
        type: String,
        required: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    }
});

// courseId auto-increment

courseSchema.pre('save', async function (next) {
    if (this.isNew) {
      try {
        const count = await mongoose.model('courses').countDocuments().exec();
        this.courseId = count + 1;
      } catch (err) {
        return next(err);
      }
    }
    next();
  });

module.exports = mongoose.model('courses', courseSchema, 'courses');
