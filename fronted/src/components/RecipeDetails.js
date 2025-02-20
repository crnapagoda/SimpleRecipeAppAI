// src/components/RecipeDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetails = () => {
  const { id } = useParams();
  // In a real scenario, fetch detailed info using the id.
  return (
    <div>
      <h2>Recipe Details</h2>
      <p>Recipe ID: {id}</p>
      {/* Display additional recipe details here */}
    </div>
  );
};

export default RecipeDetails;
