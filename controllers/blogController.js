const Blog = require('../models/blog');

// Controller to create a new blog
exports.createblog = async (req, res) => {
    try {
        const newBlog = new Blog(req.body);
        const blog = await newBlog.save();
        res.json(blog);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Controller to get all blogs from the database
exports.getAllblogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Controller to get a blog by ID
exports.getblogById = async (req, res) => {
    try {
		const blogId = parseInt(req.params.blogId);

		const blog = await Blog.find({
			blogId: blogId,
		});

		// only return the first blog found
        if (blog.length > 0) {
            res.json(blog[0]);
        } else {
            res.status(404).json({ msg: 'blog not found' });
        }
	} catch (error) {
		console.log(error.message);
	}
};

// Controller to update a blog by ID
exports.updateblog = async (req, res) => {
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBlog) {
            return res.status(404).json({ msg: 'blog not found' });
        }
        res.json(updatedBlog);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}


// Controller to delete a blog by blogId
exports.deleteblog = async (req, res) => {
    try {
        const blogId = req.params.blogId;
        const blog = await Blog.findOneAndDelete({ blogId: blogId }); // Use findOneAndDelete with blogId
        if (!blog) {
            return res.status(404).json({ msg: 'blog not found' });
        }
        res.json({ msg: 'blog deleted' });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}



// Controller to get featured blogs
exports.getFeaturedblogs = async (req, res) => {
    try {
        const featuredblogs = await Blog.find({ isPopular: true });
        res.json(featuredblogs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
