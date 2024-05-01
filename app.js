// app.js - Main App File

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const courseRoutes = require('./routes/courseRouter');
const blogRoutes = require('./routes/blogRouter');
const testimonialRouter = require('./routes/testimonialRouter');
const commentRouter = require('./routes/commentRouter');
const userRouter = require('./routes/userRouter');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
connectDB();

// Enable CORS for all routes
app.use(cors());

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to eLearning API');
});

// Routes
app.use('/courses', courseRoutes);
app.use('/blogs', blogRoutes);
app.use('/testimonials', testimonialRouter); 
app.use('/comments', commentRouter);
app.use('/user', userRouter);
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
const PORT = 1438;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
