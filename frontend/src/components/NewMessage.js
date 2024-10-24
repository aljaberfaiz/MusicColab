// src/components/NewMessage.js
import React, { useState } from 'react';
import axios from 'axios';

const NewMessage = ({ selectedUser, onMessageSent }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = async (e) => {
    e.preventDefault();  // Prevent default form submission

    if (!message) return;  // Don't send empty messages

    const token = localStorage.getItem('token');  // Get the token from localStorage

    try {
      // Send the message to the backend
      const response = await axios.post('http://localhost:5001/api/messages', {
        receiver_id: selectedUser.id,
        content: message,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,  // Pass the token in the request
        },
      });

      // Clear the message input after sending
      setMessage('');
      
      // Optionally, call a function to update the chat view with the new message
      onMessageSent();  // This could refresh the chat or update the UI accordingly

      console.log('Message sent:', response.data);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <form onSubmit={handleSendMessage}>
      <input
        type="text"
        placeholder="Type your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <button type="submit">Send Message</button>
    </form>
  );
};

export default NewMessage;
