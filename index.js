// app.js - Main App File

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const courseRoutes = require('./routes/courseRouter');
const blogRoutes = require('./routes/blogRouter');
const testimonialRouter = require('./routes/testimonialRouter');
const commentRouter = require('./routes/commentRouter');

const app = express();
dotenv.config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
connectDB();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
// Enable CORS for all routes
app.use(cors());
app.use(cookieParser());

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'content-type');
	next();
});


// Home route
app.get('/', (req, res) => {
  res.send('Welcome to eLearning API');
});

// Routes
app.use('/courses', courseRoutes);
app.use('/blogs', blogRoutes);
app.use('/testimonials', testimonialRouter); 
app.use('/comments', commentRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
const PORT = process.env.PORT || 1438;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
