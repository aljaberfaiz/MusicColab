import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MessageList({ onConversationSelect, onStartNewConversation }) {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const fetchConversations = async () => {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      try {
        const response = await axios.get('http://localhost:5001/api/messages', config);
        setConversations(response.data);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      }
    };

    fetchConversations();
  }, []);

  return (
    <div>
      <h2>Conversations</h2>
      {conversations.length === 0 ? (
        <p>No conversations yet. Start a new one below.</p>
      ) : (
        <ul>
          {conversations.map((conv) => (
            <li key={conv.id} onClick={() => onConversationSelect(conv)}>
              Conversation with {conv.otherUser}
            </li>
          ))}
        </ul>
      )}
      <button onClick={onStartNewConversation}>Start New Conversation</button>
    </div>
  );
}

export default MessageList;
