// src/components/UserSelection.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserSelection = ({ onSelectUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');  // Get the JWT token from localStorage
      console.log("Token being used:", token);  // Log the token for debugging

      try {
        // Make the request to the backend
        const response = await axios.get('http://localhost:5001/api/users', {
          headers: {
            Authorization: `Bearer ${token}`,  // Send token in the Authorization header
          },
        });
        setUsers(response.data);  // Set the user data in state
        setLoading(false);  // Disable loading state
      } catch (error) {
        console.error('Error fetching users:', error);  // Log the error for debugging
        setError('Error fetching users.');  // Set the error message
        setLoading(false);  // Disable loading state
      }
    };

    fetchUsers();  // Fetch users on component mount
  }, []);

  // Handle loading, errors, and rendering the list of users
  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (users.length === 0) {
    return <p>No users found to message.</p>;
  }

  return (
    <div>
      <h3>Select a user to message:</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={() => onSelectUser(user)}>
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserSelection;
