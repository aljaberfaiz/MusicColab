import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import HomePage from './components/HomePage';
import Messaging from './components/Messaging'; // Import Messaging component

// Helper function to check if the user is authenticated
const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

// Protected Route component to prevent access to certain routes if not logged in
function ProtectedRoute({ element }) {
  return isAuthenticated() ? element : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/messaging">Messaging</Link> {/* Add messaging link */}
            </li>
            {isAuthenticated() && (
              <li>
                <button
                  onClick={() => {
                    localStorage.removeItem('token'); 
                    window.location.href = '/login';
                  }}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
          <Route path="/messaging" element={<ProtectedRoute element={<Messaging />} />} /> {/* Add protected messaging route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
