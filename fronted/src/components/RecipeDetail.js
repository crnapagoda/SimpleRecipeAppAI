import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRecipeDetail } from '../services/api';
import './RecipeDetail.css'; // Import custom styles

const RecipeDetail = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipeDetail = async () => {
      try {
        const response = await getRecipeDetail(recipeId);
        setRecipe(response.data);
        setError('');
      } catch (err) {
        setError('Error fetching recipe details. Please try again.');
      }
    };

    fetchRecipeDetail();
  }, [recipeId]);

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  if (!recipe) {
    return <p>Loading...</p>;
  }

  return (
    <div className="recipe-detail">
      <h2>{recipe.title}</h2>
      <h3>Ingredients</h3>
      <ul className="list-group">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index} className="list-group-item">{ingredient}</li>
        ))}
      </ul>
      <h3>Instructions</h3>
      <p>{recipe.instructions}</p>
      <Link to="/dashboard" className="btn btn-secondary mt-2">Back to Dashboard</Link>
    </div>
  );
};

export default RecipeDetail;
