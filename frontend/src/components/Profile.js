// src/components/Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button} from 'react-bootstrap';
import './Profile.css'; // Import the new Profile.css for styling

function Profile() {
  const [profileData, setProfileData] = useState({
    bio: '',
    expertise: '',
    experience_level: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      try {
        const response = await axios.get('http://localhost:5001/api/profile', config);
        setProfileData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      await axios.put('http://localhost:5001/api/profile', profileData, config);
      alert('Profile updated!');
    } catch (error) {
      console.error(error);
      alert('Update failed.');
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-form">
        <h2 className="profile-title">Your Profile</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Bio</Form.Label>
            <Form.Control
              type="text"
              name="bio"
              value={profileData.bio}
              onChange={handleChange}
              placeholder="Enter your bio"
              className="profile-input"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Expertise</Form.Label>
            <Form.Control
              type="text"
              name="expertise"
              value={profileData.expertise}
              onChange={handleChange}
              placeholder="Enter your expertise"
              className="profile-input"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Experience Level</Form.Label>
            <Form.Control
              type="text"
              name="experience_level"
              value={profileData.experience_level}
              onChange={handleChange}
              placeholder="Enter your experience level"
              className="profile-input"
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="profile-button">
            Update Profile
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Profile;
