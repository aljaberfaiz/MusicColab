const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const SECRET_KEY = 'yourSecretKey'; // Replace with environment variable in production

// PostgreSQL connection setup
const pool = new Pool({
    user: 'musiccolab_user',  // PostgreSQL username
    host: 'localhost',        // Host (usually localhost for development)
    database: 'musiccolab_db', // Database name
    password: 'password123',   // PostgreSQL user password
    port: 5432                 // Default PostgreSQL port
});

// JWT verification middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No token provided' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            console.error('Token verification error:', err);
            return res.status(403).json({ message: 'Invalid Token' });
        }
        req.user = user; // Store user info in request
        next(); // Move on to the next middleware or route handler
    });
};

// ------------------- New Route for /api/message -------------------
// This route will respond with a simple message for the frontend
app.get('/api/message', (req, res) => {
    res.status(200).json({ message: 'Welcome to MusicColab!' });
});
// ------------------------------------------------------------------

// Registration route (saves user to PostgreSQL)
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the user into PostgreSQL
        const result = await pool.query(
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
            [username, hashedPassword]
        );

        res.status(201).json({ message: 'User registered successfully', user: result.rows[0] });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user', error });
    }
});

// Login route (verifies user from PostgreSQL)
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user exists in PostgreSQL
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

        if (result.rows.length === 0) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const user = result.rows[0];

        // Compare the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Error logging in', error });
    }
});

// Create or update user profile
app.put('/api/profile', authenticateToken, async (req, res) => {
    const { bio, expertise, experience_level, location, genres } = req.body;
    const userId = req.user.id; // Get the user ID from the JWT token

    console.log('User ID from JWT (PUT /api/profile):', userId); // Log user ID from JWT

    try {
        // Check if profile exists for the user
        const result = await pool.query('SELECT * FROM profiles WHERE user_id = $1', [userId]);

        if (result.rows.length === 0) {
            // Insert a new profile if none exists
            await pool.query(
                'INSERT INTO profiles (user_id, bio, expertise, experience_level, location, genres) VALUES ($1, $2, $3, $4, $5, $6)',
                [userId, bio, expertise, experience_level, location, genres] // Ensure userId is used
            );
            res.status(201).json({ message: 'Profile created successfully' });
        } else {
            // Update the existing profile
            await pool.query(
                'UPDATE profiles SET bio = $1, expertise = $2, experience_level = $3, location = $4, genres = $5 WHERE user_id = $6',
                [bio, expertise, experience_level, location, genres, userId] // Ensure userId is used in the WHERE clause
            );
            res.status(200).json({ message: 'Profile updated successfully' });
        }
    } catch (error) {
        console.error('Error creating/updating profile:', error);
        res.status(500).json({ message: 'Error creating/updating profile', error });
    }
});

// Get user profile
app.get('/api/profile', authenticateToken, async (req, res) => {
    const userId = req.user.id;

    console.log('User ID from JWT (GET /api/profile):', userId); // Log user ID from JWT

    try {
        const result = await pool.query('SELECT * FROM profiles WHERE user_id = $1', [userId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: 'Error fetching profile', error });
    }
});

// ------------------- New Route: Fetch All Users -------------------
// This route fetches all users except the logged-in user, so a new conversation can be started.
app.get('/api/users', authenticateToken, async (req, res) => {
    const userId = req.user.id; // Get the logged-in user's ID
    try {
        const result = await pool.query('SELECT id, username FROM users WHERE id != $1', [userId]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users', error });
    }
});
// ------------------------------------------------------------------

// Send a message
app.post('/api/messages', authenticateToken, async (req, res) => {
    const { receiver_id, content } = req.body;
    const sender_id = req.user.id; // Get the sender's ID from the JWT token

    if (!content || !receiver_id) {
        return res.status(400).json({ message: 'Content and receiver_id are required' });
    }

    try {
        // Insert the message into the database
        const result = await pool.query(
            'INSERT INTO messages (sender_id, receiver_id, content) VALUES ($1, $2, $3) RETURNING id, content, timestamp',
            [sender_id, receiver_id, content]
        );

        res.status(201).json({ message: 'Message sent', messageData: result.rows[0] });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ message: 'Error sending message', error });
    }
});

// Get messages for the logged-in user or between two users
app.get('/api/messages', authenticateToken, async (req, res) => {
    const user_id = req.user.id;
    const { other_user_id } = req.query; // Optional: to get conversation between two users

    try {
        let result;

        if (other_user_id) {
            // Get conversation between two users (both ways)
            result = await pool.query(
                `SELECT * FROM messages 
                 WHERE (sender_id = $1 AND receiver_id = $2) 
                 OR (sender_id = $2 AND receiver_id = $1) 
                 ORDER BY timestamp`,
                [user_id, other_user_id]
            );
        } else {
            // Get all messages where the user is either sender or receiver
            result = await pool.query(
                `SELECT * FROM messages 
                 WHERE sender_id = $1 OR receiver_id = $1 
                 ORDER BY timestamp`,
                [user_id]
            );
        }

        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ message: 'Error fetching messages', error });
    }
});

// Test route to verify the server is working
app.get('/api/test', (req, res) => {
    res.status(200).send('Test route working');
});

// Protected route that requires JWT
app.get('/api/protected', authenticateToken, (req, res) => {
    res.json({ message: 'You have access to this protected route', user: req.user });
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
