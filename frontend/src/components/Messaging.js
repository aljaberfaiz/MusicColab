import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MessageList from './MessageList';
import MessageView from './MessageView';
import StartConversation from './StartConversation';
import './Chat.css';  // Assuming your sliding styles are in Chat.css

function Messaging() {
  const [selectedMessage, setSelectedMessage] = useState(null);  // To store selected conversation
  const [loggedInUser, setLoggedInUser] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);  // For sidebar toggle

  // Function to handle selecting a message from the list
  const handleSelectMessage = (otherUserId) => {
    fetchConversation(otherUserId);  // Fetch the full conversation
    setSidebarOpen(false);  // Close the sidebar when a message is selected
  };

  // Fetch the selected conversation between logged-in user and the other user
  const fetchConversation = async (otherUserId) => {
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };
    try {
      const response = await axios.get(`http://localhost:5001/api/messages?other_user_id=${otherUserId}`, config);
      setSelectedMessage(response.data);  // Store the fetched messages (conversation)
    } catch (error) {
      console.error('Error fetching conversation:', error);
    }
  };

  const handleConversationStarted = () => {
    setSelectedMessage(null);  // Reset selected message when a new conversation is started
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);  // Toggle sidebar visibility
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      try {
        const response = await axios.get('http://localhost:5001/api/profile', config);
        setLoggedInUser(response.data.username);  // Store logged-in user's username
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="chat-container">
      {/* Sidebar to display message list */}
      <div className={`chat-sidebar ${sidebarOpen ? '' : 'hidden'}`}>
        <MessageList onSelectMessage={handleSelectMessage} />  {/* Passing handleSelectMessage */}
      </div>

      {/* Main chat view */}
      <div className="chat-content">
        <button className="chat-toggle-button" onClick={toggleSidebar}>
          {sidebarOpen ? 'Hide Conversations' : 'Show Conversations'}
        </button>
        
        {/* View selected message */}
        <MessageView selectedMessage={selectedMessage} loggedInUser={loggedInUser} />

        {/* Start a new conversation */}
        <StartConversation onConversationStarted={handleConversationStarted} />
      </div>
    </div>
  );
}

export default Messaging;
