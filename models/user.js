// User schema
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: {
        type: Number,
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'instructor'],
        default: 'student'
    }
});

// courseId auto-increment

userSchema.pre('save', async function (next) {
    if (this.isNew) {
      try {
        const count = await mongoose.model('user').countDocuments().exec();
        this.userId = count + 1;
      } catch (err) {
        return next(err);
      }
    }
    next();
  });

module.exports = mongoose.model('user', userSchema);
