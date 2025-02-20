// routes/recipeRoutes.js
const express = require('express');
const { createRecipe, saveRecipe, deleteRecipe, getRecipeDetail } = require('../controllers/recipeController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// POST request for recipe generation
router.post('/', createRecipe);

// POST request to save a recipe
router.post('/save', authMiddleware, saveRecipe);

// DELETE request to delete a recipe
router.delete('/:recipeId', deleteRecipe);

// GET request to fetch a recipe by ID
router.get('/:recipeId', authMiddleware, getRecipeDetail);

module.exports = router;
