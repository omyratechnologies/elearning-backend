// Database configuration
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://avinash:uy99XDUsY56mKiDo@csa.6qiml1r.mongodb.net/elearning?retryWrites=true&w=majority&appName=CSA');
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1); // Exit the process if unable to connect to MongoDB
    }
};

module.exports = connectDB;
