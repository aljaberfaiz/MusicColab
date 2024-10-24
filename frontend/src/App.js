// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import HomePage from './components/HomePage';
import MessagePage from './components/MessagePage'; 
import './App.css'; // Add this line to import your CSS file

const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

function ProtectedRoute({ element }) {
  return isAuthenticated() ? element : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <div>
        {/* Remove bg="dark" and variant="dark" */}
        <Navbar expand="lg" className="custom-navbar">
          <Container>
            <Navbar.Brand as={Link} to="/" className="navbar-brand-custom">
              MelodicMatch
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/" className="nav-link-custom">Home</Nav.Link>
                <Nav.Link as={Link} to="/register" className="nav-link-custom">Register</Nav.Link>
                <Nav.Link as={Link} to="/login" className="nav-link-custom">Login</Nav.Link>
                <Nav.Link as={Link} to="/profile" className="nav-link-custom">Profile</Nav.Link>
                <Nav.Link as={Link} to="/messaging" className="nav-link-custom">Messaging</Nav.Link>
                {isAuthenticated() && (
                  <Nav.Link
                    onClick={() => {
                      localStorage.removeItem('token');
                      window.location.href = '/login';
                    }}
                    className="nav-link-custom"
                  >
                    Logout
                  </Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container className="mt-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
            <Route path="/messaging" element={<ProtectedRoute element={<MessagePage />} />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
