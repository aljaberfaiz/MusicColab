import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MessageView({ conversation }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      try {
        const response = await axios.get(`http://localhost:5001/api/messages?other_user_id=${conversation.otherUserId}`, config);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [conversation]);

  const sendMessage = async () => {
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      await axios.post('http://localhost:5001/api/messages', {
        receiver_id: conversation.otherUserId,
        content: newMessage,
      }, config);

      // Update the message list after sending
      setMessages((prevMessages) => [...prevMessages, { content: newMessage, sender: 'You' }]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <h2>Conversation with {conversation.otherUser}</h2>
      <div className="message-list">
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default MessageView;
