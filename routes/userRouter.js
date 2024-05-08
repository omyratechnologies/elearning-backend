// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyApiKey } = require('../Middlewares/apiKeyMiddleware');


// Route to register a new user with API key verification
router.post('/register', verifyApiKey, userController.signUp);

// Route to login a user with API key verification
router.post('/login', verifyApiKey, userController.login);

// Route to goolge login a user with API key verification
router.post('/googlelogin', verifyApiKey, userController.googlelogin);

// Route to forgot password a user with API key verification
router.post('/forgotpassword', verifyApiKey, userController.forgotPassword);

// Route to get all users with API key verification
// router.get('/', verifyApiKey, userController.getAllUsers);

// Route to get a user by ID with API key verification
// router.get('/id/:userId', verifyApiKey, userController.getUserById);

// Route to update a user by ID with API key verification
// router.put('/id/:userId', verifyApiKey, userController.updateUser);

// Route to delete a user by ID with API key verification
// router.delete('/id/:userId', verifyApiKey, userController.deleteUser);

// Route to get all posts by a user with API key verification
// router.get('/id/:userId/posts', verifyApiKey, userController.getPostsByUserId);

// Route to get all comments by a user with API key verification
// router.get('/id/:userId/comments', verifyApiKey, userController.getCommentsByUserId);

// Route to get all testimonials by a user with API key verification
// router.get('/id/:userId/testimonials', verifyApiKey, userController.getTestimonialsByUserId);

module.exports = router;
