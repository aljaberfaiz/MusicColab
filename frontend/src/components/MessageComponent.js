// src/components/MessageComponent.js
import React from 'react';
import './Message.css';  // Assuming you already have CSS for message styling

const MessageComponent = ({ message, currentUser }) => {
  const isSender = message.sender_id === currentUser.id;  // Determine if the message is sent by the current user

  return (
    <div className={`message-container ${isSender ? 'message-left' : 'message-right'}`}>
      <div className={`message-bubble ${isSender ? 'sender-message' : 'receiver-message'}`}>
        <p>{message.content}</p>
        <div className="message-timestamp">
          {new Date(message.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default MessageComponent;
