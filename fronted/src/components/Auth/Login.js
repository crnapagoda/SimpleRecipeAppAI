// src/components/Auth/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/api';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login form data:', formData);
    try {
      const res = await loginUser(formData);
      console.log('Login successful:', res.data);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.user.id); // Store userId in local storage
      console.log('User information:', res.data.user); // Log user information
      console.log('Navigating to home page');
      if (localStorage.getItem('token')) {
        console.log('Token found, navigating to dashboard');
        navigate('/dashboard');
      } else {
        console.error('Token not found in localStorage');
      }
    } catch (err) {
      console.error('Login error:', err.response ? err.response.data : err.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
