// Controllers for managing courses
const Course = require('../models/course');
const Cta = require('../models/cta');

// Controller to create a new course
exports.createCourse = async (req, res) => {
    try {
        const newCourse = new Course(req.body);
        const course = await newCourse.save();
        res.json(course);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Controller to get all courses from the database
exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

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


// Controller to update a course by ID
exports.updateCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!course) {
            return res.status(404).json({ msg: 'Course not found' });
        }
        res.json(course);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

// Controller to delete a course by ID  
exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) {
            return res.status(404).json({ msg: 'Course not found' });
        }
        res.json({ msg: 'Course deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Controller to get featured courses
exports.getFeaturedCourses = async (req, res) => {
    try {
        const featuredCourses = await Course.find({ isFeatured: true });
        res.json(featuredCourses);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Controller to get upcoming courses
exports.getUpcomingCourses = async (req, res) => {
    try {
        // Get current date in UTC
        const today = new Date();
        // Convert current date to the Indian Standard Time (IST)
        const currentDateTimezone = new Date(today.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));

        // Query for upcoming courses where start date is greater than current date in IST
        const upcomingCourses = await Course.find({
            $expr: {
                $gt: [ { $toDate: "$startDate" }, currentDateTimezone ]
            }
        });

        res.json(upcomingCourses);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// controller to post the Call To Action
exports.createCta = async (req, res) => {
    try {
        const newCta = new Cta(req.body);
        const cta = await newCta.save();
        res.json(cta);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// controller to get cta
exports.getCta = async (req, res) => {
    try {
        const cta = await Cta.find();
        res.json(cta[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Controller to update a course by ID
exports.updateCta = async (req, res) => {
    try {
        const cta = await Cta.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!cta) {
            return res.status(404).json({ msg: 'Course not found' });
        }
        res.json(cta);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}