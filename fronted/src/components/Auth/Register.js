// src/components/Auth/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/api';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    gender: '',
    weight: '',
    height: '',
    activityLevel: '',
    fitnessGoal: '',
    dietaryPreferences: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Convert dietaryPreferences from a comma-separated string to an array
    const dataToSend = {
      ...formData,
      dietaryPreferences: formData.dietaryPreferences.split(',').map((item) => item.trim()),
    };
    try {
      const res = await registerUser(dataToSend);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      console.error('Registration error:', err.response ? err.response.data : err.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        {/* Basic info */}
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} required />
        </div>
        {/* Additional profile info */}
        <div className="form-group">
          <label>Age:</label>
          <input type="number" name="age" className="form-control" value={formData.age} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <input type="text" name="gender" className="form-control" value={formData.gender} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Weight:</label>
          <input type="number" name="weight" className="form-control" value={formData.weight} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Height:</label>
          <input type="number" name="height" className="form-control" value={formData.height} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Activity Level:</label>
          <input type="text" name="activityLevel" className="form-control" value={formData.activityLevel} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Fitness Goal:</label>
          <input type="text" name="fitnessGoal" className="form-control" value={formData.fitnessGoal} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Dietary Preferences (comma-separated):</label>
          <input type="text" name="dietaryPreferences" className="form-control" value={formData.dietaryPreferences} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
