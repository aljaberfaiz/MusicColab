import React, { useState } from 'react';
import MessageList from './MessageList';
import MessageView from './MessageView';
import StartConversation from './StartConversation';

function Messaging() {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [showNewConversationForm, setShowNewConversationForm] = useState(false);

  const handleStartNewConversation = () => {
    setShowNewConversationForm(true);
    setSelectedConversation(null); // Ensure no conversation is selected
  };

  const handleConversationStarted = () => {
    setShowNewConversationForm(false);
    // You might also want to refresh the conversation list here
  };

  return (
    <div className="messaging-container">
      {!showNewConversationForm ? (
        <>
          <MessageList
            onConversationSelect={setSelectedConversation}
            onStartNewConversation={handleStartNewConversation}
          />
          {selectedConversation && <MessageView conversation={selectedConversation} />}
        </>
      ) : (
        <StartConversation onConversationStarted={handleConversationStarted} />
      )}
    </div>
  );
}

export default Messaging;
