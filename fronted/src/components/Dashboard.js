import React, { useEffect, useState } from 'react';
import { getUserProfile, deleteRecipe } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import './Dashboard.css'; // Import custom styles

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Dashboard component mounted');
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        // Get userId from localStorage
        const userId = localStorage.getItem('userId');
        console.log('Retrieved userId from localStorage:', userId); // Debugging
        if (!userId) {
          navigate('/login');
          return;
        }

        // Pass userId to the API call
        const res = await getUserProfile(userId); 
        console.log("User Data:", res.data); // Debugging
        setUser(res.data);
        setRecipes(res.data.recipes || []);
      } catch (err) {
        console.error('Error fetching user profile:', err.response ? err.response.data : err.message);
        if (err.response && err.response.status === 401) {
          navigate('/login');
        }
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleDeleteRecipe = async (recipeId) => {
    try {
      await deleteRecipe(recipeId);
      setRecipes(recipes.filter(recipe => recipe._id !== recipeId));
    } catch (err) {
      console.error('Error deleting recipe:', err.response ? err.response.data : err.message);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="dashboard">
      <h2>Welcome, {user.name || "User"}</h2>
      <p>Email: {user.email || "No email found"}</p>
      <p>Fitness Goal: {user.fitnessGoal || "No goal set"}</p>
      <Link to="/recipe-generator" className="btn btn-success mt-2">
        Generate a Recipe
      </Link>
      <div className="navigation-buttons">
        <Link to="/profile" className="btn btn-primary">Profile</Link>
        <Link to="/settings" className="btn btn-secondary">Settings</Link>
      </div>
      <h3>Saved Recipes</h3>
      {recipes.length === 0 ? (
        <p>No saved recipes.</p>
      ) : (
        <ul className="list-group">
          {recipes.map((recipe) => (
            <li key={recipe._id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <h4>{recipe.title}</h4>
                <Link to={`/recipes/${recipe._id}`} className="btn btn-primary btn-sm">Open</Link>
              </div>
              <button onClick={() => handleDeleteRecipe(recipe._id)} className="btn btn-danger btn-sm">Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
