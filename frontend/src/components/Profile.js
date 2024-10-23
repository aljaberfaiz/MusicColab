import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
        const response = await axios.get('/api/profile', config);
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
      await axios.put('/api/profile', profileData, config);
      alert('Profile updated!');
    } catch (error) {
      console.error(error);
      alert('Update failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="bio" value={profileData.bio} onChange={handleChange} placeholder="Bio" />
      <input type="text" name="expertise" value={profileData.expertise} onChange={handleChange} placeholder="Expertise" />
      <input type="text" name="experience_level" value={profileData.experience_level} onChange={handleChange} placeholder="Experience Level" />
      <button type="submit">Update Profile</button>
    </form>
  );
}

export default Profile;