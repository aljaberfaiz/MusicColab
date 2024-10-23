import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StartConversation({ onConversationStarted }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [firstMessage, setFirstMessage] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      try {
        const response = await axios.get('http://localhost:5001/api/users', config); // Assuming an endpoint to fetch users
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const startConversation = async () => {
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      await axios.post('http://localhost:5001/api/messages', {
        receiver_id: selectedUser,
        content: firstMessage,
      }, config);
      alert('Conversation started!');
      onConversationStarted(); // Notify parent to refresh the message list
    } catch (error) {
      console.error('Error starting conversation:', error);
    }
  };

  return (
    <div>
      <h2>Start a New Conversation</h2>
      <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
        <option value="">Select a User</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.username}
          </option>
        ))}
      </select>
      <textarea
        value={firstMessage}
        onChange={(e) => setFirstMessage(e.target.value)}
        placeholder="Type your first message"
      ></textarea>
      <button onClick={startConversation} disabled={!selectedUser || !firstMessage}>
        Send
      </button>
    </div>
  );
}

export default StartConversation;
