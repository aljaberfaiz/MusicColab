// src/components/UserProfile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './UserProfile.css'; // You can create this file for styles

function UserProfile() {
  const { userId } = useParams(); // Get the user ID from the URL
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      try {
        const response = await axios.get(`http://localhost:5001/api/users/${userId}`, config);
        setUserProfile(response.data);
      } catch (err) {
        setError('Error fetching user profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="user-profile-container">
      <h2>{userProfile.username}'s Profile</h2>
      <p><strong>Bio:</strong> {userProfile.bio}</p>
      <p><strong>Expertise:</strong> {userProfile.expertise}</p>
      <p><strong>Experience Level:</strong> {userProfile.experience_level}</p>
      <p><strong>Location:</strong> {userProfile.location}</p>
      <p><strong>Genres:</strong> {userProfile.genres}</p>
      {/* Add more fields as needed */}
    </div>
  );
}

export default UserProfile;
