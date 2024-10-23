import React from 'react';
import './Chat.css';

function MessageView({ selectedMessage, loggedInUser }) {
  if (!selectedMessage) {
    return <p>Select a message to view</p>;
  }

  return (
    <div className="chat-messages-container">
      {selectedMessage.map((message) => (
        <div
          key={message.id}
          className={`chat-bubble ${
            message.sender_username === loggedInUser ? 'sent' : 'received'
          }`}
        >
          <p className="chat-message">{message.content}</p>
          <span className="chat-sender">
            {message.sender_username === loggedInUser ? 'You' : message.sender_username}
          </span>
        </div>
      ))}
    </div>
  );
}

export default MessageView;
