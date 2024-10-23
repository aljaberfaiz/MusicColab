import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' }); // Changed from email to username
  const [error, setError] = useState(null); // State for error handling

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/login', formData); // Ensure the correct API URL
      // Store the JWT token in localStorage
      localStorage.setItem('token', response.data.token);
      alert('Login successful!');
    } catch (error) {
      // Handle different error types and show appropriate messages
      if (error.response && error.response.status === 400) {
        setError('Invalid username or password'); // Custom message for invalid credentials
      } else {
        console.error(error);
        setError('Login failed.');
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username" // Input name changed to username
          placeholder="Username" // Input placeholder changed to Username
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
