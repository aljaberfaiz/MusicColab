// src/components/ChatDisplay.js
import React from 'react';
import MessageComponent from './MessageComponent';  // Reuse the component for individual messages

const ChatDisplay = ({ messages, selectedUser, currentUser, onRefresh }) => {
  if (messages.length === 0) {
    return <p>No messages yet</p>;
  }

  return (
    <div className="chat-display">
      <h3>Conversation with {selectedUser.username}</h3>
      <button onClick={onRefresh} className="refresh-button">Refresh Messages</button>
      <div className="messages-list">
        {messages.map((message) => (
          <MessageComponent key={message.id} message={message} currentUser={currentUser} />
        ))}
      </div>
    </div>
  );
};

export default ChatDisplay;
