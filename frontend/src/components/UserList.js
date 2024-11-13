import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserList({ onUserSelect }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      try {
        const response = await axios.get('https://melodic-match.onrender.com/api/users', config);
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;

  return (
    <select onChange={(e) => onUserSelect(e.target.value)} defaultValue="">
      <option value="" disabled>Select a user</option>
      {users.map(user => (
        <option key={user.id} value={user.id}>{user.username}</option>
      ))}
    </select>
  );
}

export default UserList;
