import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import UserList from './UserList'; // Import UserList for dropdown
import './Profile.css'; // Import existing CSS for styling

function Profile() {
  const [profileData, setProfileData] = useState({
    bio: '',
    expertise: '',
    experience_level: '',
    location: '',
    genres: ''
  });

  const [selectedUserData, setSelectedUserData] = useState(null);
  const [showProfile, setShowProfile] = useState(false); // State to control profile display

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      try {
        const response = await axios.get('https://melodic-match.onrender.com/api/profile', config);
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
      await axios.put('https://melodic-match.onrender.com/api/profile', profileData, config);
      alert('Profile updated!');
    } catch (error) {
      console.error(error);
      alert('Update failed.');
    }
  };

  const handleUserSelect = async (userId) => {
    // Fetch the selected user's data
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      const response = await axios.get(`https://melodic-match.onrender.com/api/users/${userId}`, config);
      setSelectedUserData(response.data); // Set the selected user's data
      setShowProfile(true); // Show the user profile
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseProfile = () => {
    setShowProfile(false); // Hide the profile display
    setSelectedUserData(null); // Reset the selected user data
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

          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={profileData.location}
              onChange={handleChange}
              placeholder="Enter your location"
              className="profile-input"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Genres</Form.Label>
            <Form.Control
              type="text"
              name="genres"
              value={profileData.genres}
              onChange={handleChange}
              placeholder="Enter your genres"
              className="profile-input"
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="profile-button">
            Update Profile
          </Button>
        </Form>
      </div>

      {/* User Selection Section */}
      {!showProfile && (
        <div className="user-selection-section">
          <h3>Select a User to View Profile:</h3>
          <UserList onUserSelect={handleUserSelect} /> {/* Pass the handler to UserList */}
        </div>
      )}

      {/* User Profile Display */}
      {showProfile && (
        <div className="user-profile-display">
          <h3>{selectedUserData.username}'s Profile</h3>
          <p><strong>Bio:</strong> {selectedUserData.bio}</p>
          <p><strong>Expertise:</strong> {selectedUserData.expertise}</p>
          <p><strong>Experience Level:</strong> {selectedUserData.experience_level}</p>
          <p><strong>Location:</strong> {selectedUserData.location}</p>
          <p><strong>Genres:</strong> {selectedUserData.genres}</p>
          <Button variant="secondary" onClick={handleCloseProfile}>
            Close Profile
          </Button>
        </div>
      )}
    </div>
  );
}

export default Profile;
