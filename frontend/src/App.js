import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import HomePage from './components/HomePage'; // Import HomePage

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
        {/* Navigation links to simulate a basic menu */}
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
            {/* Conditional rendering: show Logout only if authenticated */}
            {isAuthenticated() && (
              <li>
                <button
                  onClick={() => {
                    localStorage.removeItem('token'); // Clear the token from localStorage
                    window.location.href = '/login'; // Redirect to login page after logout
                  }}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>

        {/* Routes configuration */}
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Use HomePage for the home route */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* Protecting the Profile route */}
          <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
