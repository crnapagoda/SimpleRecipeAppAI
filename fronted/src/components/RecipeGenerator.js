// src/components/RecipeGenerator.js
import React, { useState } from 'react';
import { getRecipe, saveRecipe } from '../services/api'; // assuming the API service is already set up
import { Link } from 'react-router-dom';
import './RecipeGenerator.css'; // Import custom styles

const RecipeGenerator = () => {
  const [userProfile, setUserProfile] = useState({
    fitnessGoal: '',
    activityLevel: '',
    weight: '',
    height: '',
    gender: 'male', // Default gender
    foodPreferences: [],
  });
  const [recipe, setRecipe] = useState({ title: '', ingredients: [], instructions: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value } = e.target;
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      foodPreferences: prevProfile.foodPreferences.includes(value)
        ? prevProfile.foodPreferences.filter((item) => item !== value)
        : [...prevProfile.foodPreferences, value],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await getRecipe(userProfile);
      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        ingredients: response.data.recipe.split('\n'), // Ensure ingredients is an array
      }));
      setError('');
    } catch (err) {
      setError('Error generating recipe. Please try again.');
      setRecipe({ title: '', ingredients: [], instructions: '' });
    }
  };

  const handleSaveRecipe = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await saveRecipe({ userId, ...recipe });
      console.log('Recipe saved:', response.data);
      setError('');
    } catch (err) {
      setError('Error saving recipe. Please try again.');
    }
  };

  const renderRecipe = (recipeIngredients) => {
    return recipeIngredients.map((line, index) => {
      if (line.startsWith('## ')) {
        return <h3 key={index}>{line.substring(3)}</h3>;
      } else if (line.startsWith('* ')) {
        return <li key={index}>{line.substring(2)}</li>;
      } else if (line.startsWith('**')) {
        return <strong key={index}>{line}</strong>;
      } else {
        return <p key={index}>{line}</p>;
      }
    });
  };

  return (
    <div className="recipe-generator">
      <h2>Recipe Generator</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Fitness Goal:</label>
          <select
            name="fitnessGoal"
            value={userProfile.fitnessGoal}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="">Select Goal</option>
            <option value="lose">Lose Weight</option>
            <option value="gain">Gain Muscle</option>
            <option value="maintain">Maintain Weight</option>
          </select>
        </div>

        <div className="form-group">
          <label>Activity Level:</label>
          <select
            name="activityLevel"
            value={userProfile.activityLevel}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="">Select Activity Level</option>
            <option value="sedentary">Sedentary (little to no exercise)</option>
            <option value="light">Light Activity (light exercise/sports 1-3 days/week)</option>
            <option value="moderate">Moderate Activity (moderate exercise/sports 3-5 days/week)</option>
            <option value="active">Active (hard exercise/sports 6-7 days a week)</option>
            <option value="very_active">Very Active (very hard exercise/physical job or training twice per day)</option>
          </select>
        </div>

        <div className="form-group">
          <label>Weight (kg):</label>
          <input
            type="number"
            name="weight"
            value={userProfile.weight}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>Height (cm):</label>
          <input
            type="number"
            name="height"
            value={userProfile.height}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>Gender:</label>
          <select
            name="gender"
            value={userProfile.gender}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="form-group">
          <label>Food Preferences:</label>
          <div>
            <label className="form-check-label">
              <input
                type="checkbox"
                value="vegetarian"
                checked={userProfile.foodPreferences.includes('vegetarian')}
                onChange={handleCheckboxChange}
                className="form-check-input"
              />
              Vegetarian
            </label>
            <label className="form-check-label">
              <input
                type="checkbox"
                value="glutenFree"
                checked={userProfile.foodPreferences.includes('glutenFree')}
                onChange={handleCheckboxChange}
                className="form-check-input"
              />
              Gluten-Free
            </label>
            <label className="form-check-label">
              <input
                type="checkbox"
                value="dairyFree"
                checked={userProfile.foodPreferences.includes('dairyFree')}
                onChange={handleCheckboxChange}
                className="form-check-input"
              />
              Dairy-Free
            </label>
            <label className="form-check-label">
              <input
                type="checkbox"
                value="nutFree"
                checked={userProfile.foodPreferences.includes('nutFree')}
                onChange={handleCheckboxChange}
                className="form-check-input"
              />
              Nut-Free
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Recipe Title:</label>
          <input
            type="text"
            name="title"
            value={recipe.title}
            onChange={handleChange}
            className="form-control"
            placeholder="Recipe Title"
            required
          />
        </div>

        <div className="form-group">
          <label>Recipe Instructions:</label>
          <textarea
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
            className="form-control"
            placeholder="Recipe Instructions"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Generate Recipe</button>
      </form>

      {error && <p className="text-danger">{error}</p>}
      {recipe.ingredients.length > 0 && (
        <div className="recipe mt-4">
          <h3>Your Recipe</h3>
          <div>{renderRecipe(recipe.ingredients)}</div>
          <button onClick={handleSaveRecipe} className="btn btn-success mt-2">Save Recipe</button>
        </div>
      )}
      <Link to="/dashboard" className="btn btn-secondary mt-2">Back to Dashboard</Link>
    </div>
  );
};

export default RecipeGenerator;
