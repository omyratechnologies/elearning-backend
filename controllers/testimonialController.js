// controllers/testimonialController.js

const Testimonial = require('../models/testimonial');

// Controller to create a new testimonial
exports.createTestimonial = async (req, res) => {
    try {
        const newTestimonial = new Testimonial(req.body);
        const testimonial = await newTestimonial.save();
        res.json(testimonial);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Controller to get all testimonials from the database
exports.getAllTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find();
        res.json(testimonials);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Controller to delete a testimonial by testimonialId
exports.deleteTestimonial = async (req, res) => {
    try {
        const testimonialId = req.params.testimonialId;
        const testimonial = await Testimonial.findOneAndDelete({ testimonialId: testimonialId }); // Use findOneAndDelete with testimonialId
        if (!testimonial) {
            return res.status(404).json({ msg: 'Testimonial not found' });
        }
        res.json({ msg: 'Testimonial deleted' });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}



// Controller to get a course by ID
exports.getCourseById = async (req, res) => {
    try {
		const courseId = parseInt(req.params.courseId);

		const course = await Course.find({
			courseId: courseId,
		});

		// only return the first course found
        if (course.length > 0) {
            res.json(course[0]);
        } else {
            res.status(404).json({ msg: 'Course not found' });
        }
	} catch (error) {
		console.log(error.message);
	}
};