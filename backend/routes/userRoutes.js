// routes/userRoutes.js
const express = require('express');
const { getUserProfile } = require('../controllers/userController');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

// POST request to create or update user profile
router.post('/profile', async (req, res) => {
  try {
    const { userId, name, email, age, gender, weight, height, activityLevel, fitnessGoal, dietaryPreferences } = req.body;

    // Find or create the user
    let user = await User.findById(userId);
    if (!user) {
      user = new User({ name, email, age, gender, weight, height, activityLevel, fitnessGoal, dietaryPreferences });
    } else {
      // Update user details
      user.name = name;
      user.email = email;
      user.age = age;
      user.gender = gender;
      user.weight = weight;
      user.height = height;
      user.activityLevel = activityLevel;
      user.fitnessGoal = fitnessGoal;
      user.dietaryPreferences = dietaryPreferences;
    }

    await user.save();
    res.status(200).json({ message: 'User profile saved successfully!', user });
  } catch (error) {
    res.status(500).json({ message: 'Error saving user profile', error });
  }
});

// GET request to fetch user profile by userId
router.get('/profile/:userId', authMiddleware, getUserProfile);

module.exports = router;
