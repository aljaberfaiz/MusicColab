import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MessageList({ onSelectMessage }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found. Please log in.');
        setLoading(false);
        return;
      }

      const config = { headers: { Authorization: `Bearer ${token}` } };
      try {
        const response = await axios.get('http://localhost:5001/api/messages', config);
        if (response.status === 200) {
          setMessages(response.data);
        } else {
          setError('Failed to fetch conversations. Please try again.');
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
        setError('Error fetching conversations.');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (loading) return <p>Loading conversations...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Your Messages</h2>
      <ul>
        {messages.length > 0 ? (
          messages.map((message) => (
            <li key={message.id} onClick={() => onSelectMessage(message.receiver_id)}>
              {message.sender_username}: {message.content.substring(0, 50)}...
            </li>
          ))
        ) : (
          <p>No conversations found.</p>
        )}
      </ul>
    </div>
  );
}

export default MessageList;
