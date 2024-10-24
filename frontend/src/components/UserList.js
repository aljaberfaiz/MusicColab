// src/components/UserList.js
import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import { Form } from 'react-bootstrap'; 
import './UserList.css'; 

const UserList = ({ onUserSelect }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token'); 

      try {
        const response = await axios.get('http://localhost:5001/api/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data); 
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
    <div className="user-list">
      <Form.Group className="mb-3">
        <Form.Label>Select a user to view their profile:</Form.Label>
        <Form.Select onChange={(e) => onUserSelect(e.target.value)}>
          <option value="" disabled>Select a user</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.username}</option>
          ))}
        </Form.Select>
      </Form.Group>
    </div>
  );
};

export default UserList;
