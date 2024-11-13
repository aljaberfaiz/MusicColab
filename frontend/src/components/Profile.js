import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Card } from 'react-bootstrap';
import UserList from './UserList';
import './Profile.css';

function Profile() {
  const [profileData, setProfileData] = useState({
    bio: '',
    expertise: '',
    experience_level: '',
    location: '',
    genres: ''
  });
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [refreshToggle, setRefreshToggle] = useState(false); // New state to force re-render

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      try {
        const response = await axios.get('https://melodic-match.onrender.com/api/profile', config);
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
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
      console.error("Error updating profile:", error);
      alert('Update failed.');
    }
  };

  const handleUserSelect = async (userId) => {
    setShowProfile(false);  // Temporarily close profile to reset the view
    setSelectedUserData(null); // Clear previous data to force a re-render
    setRefreshToggle(!refreshToggle); // Toggle refresh state to force re-render

    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };
    try {
      const response = await axios.get(`https://melodic-match.onrender.com/api/users/${userId}`, config);
      setSelectedUserData(response.data);
      setShowProfile(true); // Show selected user profile after data fetch
    } catch (error) {
      console.error("Error fetching selected user profile:", error);
    }
  };

  const handleCloseProfile = () => {
    setShowProfile(false);
    setSelectedUserData(null); // Reset selectedUserData to allow re-selection of the same user
    setRefreshToggle(!refreshToggle); // Toggle refresh state to force re-render
  };

  return (
    <div className="profile-container">
      <div className="profile-form">
        <Card className="p-4 mb-4">
          <h2 className="profile-title">Your Profile</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                type="text"
                name="bio"
                value={profileData.bio}
                onChange={handleChange}
                className="profile-input"
                placeholder="Enter your bio"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Expertise</Form.Label>
              <Form.Control
                type="text"
                name="expertise"
                value={profileData.expertise}
                onChange={handleChange}
                className="profile-input"
                placeholder="Enter your expertise"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Experience Level</Form.Label>
              <Form.Control
                type="text"
                name="experience_level"
                value={profileData.experience_level}
                onChange={handleChange}
                className="profile-input"
                placeholder="Enter your experience level"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={profileData.location}
                onChange={handleChange}
                className="profile-input"
                placeholder="Enter your location"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Genres</Form.Label>
              <Form.Control
                type="text"
                name="genres"
                value={profileData.genres}
                onChange={handleChange}
                className="profile-input"
                placeholder="Enter your genres"
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="profile-button">
              Update Profile
            </Button>
          </Form>
        </Card>
      </div>

      <div className="user-selection-section">
        <Card className="p-4 mb-4">
          <h3>Select a User to View Their Profile</h3>
          <UserList onUserSelect={handleUserSelect} key={refreshToggle} /> {/* Force UserList to re-render */}
          {showProfile && selectedUserData && (
            <Card className="p-4 mt-4 selected-profile-card">
              <h3>{selectedUserData.username}'s Profile</h3>
              <p><strong>Bio:</strong> {selectedUserData.bio}</p>
              <p><strong>Expertise:</strong> {selectedUserData.expertise}</p>
              <p><strong>Experience Level:</strong> {selectedUserData.experience_level}</p>
              <p><strong>Location:</strong> {selectedUserData.location}</p>
              <p><strong>Genres:</strong> {selectedUserData.genres}</p>
              <Button variant="secondary" onClick={handleCloseProfile}>
                Close Profile
              </Button>
            </Card>
          )}
        </Card>
      </div>
    </div>
  );
}

export default Profile;
