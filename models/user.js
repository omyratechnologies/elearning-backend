// User schema
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: {
        type: Number,
    },
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    role: {
        type: String,
        enum: ['student', 'instructor'],
        default: 'student'
    },
    token: {
        type: String,
    },
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
