// src/components/UserSelection.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserSelection.css';  // Ensure you have this CSS file

const UserSelection = ({ onSelectUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');  // Get the token from localStorage

      try {
        const response = await axios.get('http://localhost:5001/api/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);  // Store the fetched users
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Error fetching users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="user-selection">
      <h3>Select a user to message:</h3>
      <select onChange={(e) => onSelectUser(users[e.target.value])} defaultValue="">
        <option value="" disabled>Select a user</option>
        {users.map((user, index) => (
          <option key={user.id} value={index}>{user.username}</option>
        ))}
      </select>
    </div>
  );
};

export default UserSelection;
