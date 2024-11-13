import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';
import './Register.css'; // Import the custom CSS for styling

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await axios.post('https://melodic-match.onrender.com/api/register', {
        username: formData.username,
        password: formData.password
      });
      alert('Registration successful!');
    } catch (error) {
      console.error(error);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2 className="register-title">Create Your Account</h2>
        {error && <Alert variant="danger" className="register-error">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              className="register-input"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className="register-input"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="register-input"
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="register-button">
            Register
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Register;
