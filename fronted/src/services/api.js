import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Function to refresh token
const refreshToken = async () => {
  try {
    console.log('Refreshing token...');
    const res = await API.post('/auth/refresh-token', {
      token: localStorage.getItem('token'),
    });
    localStorage.setItem('token', res.data.token);
    console.log('Token refreshed:', res.data.token);
    return res.data.token;
  } catch (err) {
    console.error('Error refreshing token:', err.response ? err.response.data : err.message);
    throw err;
  }
};

// Attach token to every request if available
API.interceptors.request.use(async (config) => {
  let token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newToken = await refreshToken();
      originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
      console.log('Retrying request with new token:', newToken); // Log retry with new token
      return API(originalRequest);
    }
    return Promise.reject(error);
  }
);

// Authentication API
export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = async (data) => {
  try {
    const response = await API.post('/auth/login', data);
    console.log('Login response:', response);
    return response;
  } catch (error) {
    console.error('Login error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

// User API
export const getUserProfile = (userId) => API.get(`/users/profile/${userId}`);
export const updateUserProfile = (data) => API.put('/users/profile', data);

// Recipe API
export const getRecipe = (userProfile) => API.post('/recipes', userProfile);
export const saveRecipe = (data) => API.post('/recipes/save', data);
export const deleteRecipe = (recipeId) => API.delete(`/recipes/${recipeId}`);
export const getRecipeDetail = (recipeId) => API.get(`/recipes/${recipeId}`); // Ensure this line is correct

export default API;
