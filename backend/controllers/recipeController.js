// controllers/recipeController.js
const geminiService = require('../services/geminiService');
const { calculateCalories } = require('../utils/caloriesCalculator'); // Assuming you've created this function
const Recipe = require('../models/Recipe');
const User = require('../models/User');

exports.createRecipe = async (req, res, next) => {
  try {
    const userProfile = req.body;
    console.log('Received user profile for recipe generation:', userProfile); // Debugging

    if (!userProfile || !userProfile.fitnessGoal || !userProfile.foodPreferences) {
      return res.status(400).json({ message: 'Invalid user profile data' });
    }

    // Ensure foodPreferences is always an array
    userProfile.foodPreferences = userProfile.foodPreferences || [];

    // Calculate user's calorie needs
    const { calorieIntake, proteinIntake } = calculateCalories(userProfile);

    // Send user data and calculated needs to Gemini for recipe generation
    const recipeText = await geminiService.generateRecipe({
      ...userProfile,
      calorieIntake,
      proteinIntake
    });

    console.log("Generated Recipe:", recipeText); // Debugging

    res.status(200).json({ recipe: recipeText });
  } catch (error) {
    console.error("Error generating recipe:", error); // Debugging
    if (error.response) {
      console.error("Error response data:", error.response.data); // Detailed error response
    }
    res.status(500).json({ message: 'Internal Server Error' });
    next(error);
  }
};

exports.saveRecipe = async (req, res, next) => {
  try {
    const { userId, title, ingredients, instructions } = req.body;
    console.log('Save recipe request:', req.body); // Log request body

    if (!title || !instructions) {
      console.log('Validation Error: Title and instructions are required');
      return res.status(400).json({ message: 'Validation Error: Title and instructions are required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    const recipe = new Recipe({
      user: userId,
      title,
      ingredients,
      instructions,
    });

    await recipe.save();
    user.recipes.push(recipe);
    await user.save();

    console.log('Recipe saved successfully');
    res.status(201).json({ message: 'Recipe saved successfully', recipe });
  } catch (error) {
    console.error('Error saving recipe:', error);
    if (error.name === 'ValidationError') {
      console.error('Validation Error:', error.message);
      return res.status(400).json({ message: 'Validation Error', error: error.message });
    }
    res.status(500).json({ message: 'Internal Server Error' });
    next(error);
  }
};

exports.deleteRecipe = async (req, res, next) => {
  try {
    const { recipeId } = req.params;
    await Recipe.findByIdAndDelete(recipeId);

    // Remove the recipe from the user's saved recipes
    await User.updateMany({}, { $pull: { recipes: recipeId } });

    res.status(200).json({ message: 'Recipe deleted successfully!' });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    res.status(500).json({ message: 'Internal Server Error' });
    next(error);
  }
};

exports.getRecipeDetail = async (req, res, next) => {
  try {
    const { recipeId } = req.params;
    console.log('Fetching recipe details for ID:', recipeId); // Log recipe ID
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      console.log('Recipe not found for ID:', recipeId); // Log if recipe not found
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.status(200).json(recipe);
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    res.status(500).json({ message: 'Internal Server Error' });
    next(error);
  }
};
