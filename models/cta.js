// course model
const mongoose = require('mongoose');

const ctaSchema = new mongoose.Schema({
    ctaId: {
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
    link: {
        type: String,
    }
    
});

// courseId auto-increment

ctaSchema.pre('save', async function (next) {
    if (this.isNew) {
      try {
        const count = await mongoose.model('cta').countDocuments().exec();
        this.ctaId = count + 1;
      } catch (err) {
        return next(err);
      }
    }
    next();
  });

module.exports = mongoose.model('cta', ctaSchema, 'cta');
