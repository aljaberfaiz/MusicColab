// src/components/MessagePage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserSelection from './UserSelection';  // Add UserSelection component back
import ChatDisplay from './ChatDisplay';  // New chat display component
import NewMessage from './NewMessage';  // Component to send new message

const MessagePage = () => {
  const [selectedUser, setSelectedUser] = useState(null);  // Stores the currently selected user for conversation
  const [messages, setMessages] = useState([]);  // Stores messages of the selected conversation
  const [loading, setLoading] = useState(false);  // Loading state for fetching data
  const [error, setError] = useState(null);  // Error state

  // Fetch messages between the logged-in user and the selected user
  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    const fetchMessages = async () => {
      setLoading(true);  // Start loading state
      try {
        const token = localStorage.getItem('token');  // Get the token
        const response = await axios.get(`http://localhost:5001/api/messages?other_user_id=${selectedUser.id}`, {  // Full backend URL
          headers: {
            Authorization: `Bearer ${token}`,  // Pass the token in the request
          },
        });
        setMessages(response.data);  // Store messages in state
        setLoading(false);  // Stop loading state
      } catch (error) {
        console.error('Error fetching messages:', error);
        setError('Error fetching messages');
        setLoading(false);  // Stop loading state
      }
    };

    fetchMessages();  // Fetch messages when the selected user changes
  }, [selectedUser]);

  // Handle user selection for starting a conversation
  const handleUserSelect = (user) => {
    setSelectedUser(user);  // Set the selected user for conversation
    setMessages([]);  // Clear the previous messages when a new user is selected
  };

  // Handle sending of a new message (optional: reset selected user)
  const handleMessageSent = () => {
    setSelectedUser(null);  // Reset after a message is sent
  };

  return (
    <div className="message-page">
      {/* User Selection */}
      <UserSelection onSelectUser={handleUserSelect} />

      {/* Display chat if a user is selected */}
      {selectedUser ? (
        <div className="chat-section">
          <ChatDisplay messages={messages} selectedUser={selectedUser} currentUser={selectedUser} />
          {/* Render the new message form */}
          <NewMessage selectedUser={selectedUser} onMessageSent={handleMessageSent} />
        </div>
      ) : (
        <p>Select a user to start messaging</p>
      )}
    </div>
  );
};

export default MessagePage;
