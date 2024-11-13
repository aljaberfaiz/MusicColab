const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Use environment variables for sensitive information in production
const SECRET_KEY = process.env.SECRET_KEY || 'yourSecretKey'; // Set 'yourSecretKey' as fallback for local development

// PostgreSQL connection setup with support for local and production environments
const pool = new Pool({
    connectionString: process.env.DATABASE_URL || '', // Use DATABASE_URL in production
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    user: process.env.PG_USER || 'musiccolab_user',       // Fallback to local user
    host: process.env.PG_HOST || 'localhost',             // Fallback to localhost
    database: process.env.PG_DATABASE || 'musiccolab_db', // Fallback to local database name
    password: process.env.PG_PASSWORD || 'password123',   // Fallback to local password
    port: process.env.PG_PORT || 5432                     // Default PostgreSQL port
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

// Registration route
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
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

// Login route
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (result.rows.length === 0) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

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
    const userId = req.user.id;

    try {
        const result = await pool.query('SELECT * FROM profiles WHERE user_id = $1', [userId]);

        if (result.rows.length === 0) {
            await pool.query(
                'INSERT INTO profiles (user_id, bio, expertise, experience_level, location, genres) VALUES ($1, $2, $3, $4, $5, $6)',
                [userId, bio, expertise, experience_level, location, genres]
            );
            res.status(201).json({ message: 'Profile created successfully' });
        } else {
            await pool.query(
                'UPDATE profiles SET bio = $1, expertise = $2, experience_level = $3, location = $4, genres = $5 WHERE user_id = $6',
                [bio, expertise, experience_level, location, genres, userId]
            );
            res.status(200).json({ message: 'Profile updated successfully' });
        }
    } catch (error) {
        console.error('Error creating/updating profile:', error);
        res.status(500).json({ message: 'Error creating/updating profile', error });
    }
});

// Get logged-in user's profile
app.get('/api/profile', authenticateToken, async (req, res) => {
    const userId = req.user.id;

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

// Fetch all users except the logged-in user
app.get('/api/users', authenticateToken, async (req, res) => {
    const userId = req.user.id;
    try {
        const result = await pool.query('SELECT id, username FROM users WHERE id != $1', [userId]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users', error });
    }
});

// Fetch a user's profile by user ID
app.get('/api/users/:userId', authenticateToken, async (req, res) => {
    const { userId } = req.params;

    try {
        const result = await pool.query(
            `SELECT u.id, u.username, p.bio, p.expertise, p.experience_level, p.location, p.genres
             FROM users u
             LEFT JOIN profiles p ON u.id = p.user_id
             WHERE u.id = $1`, 
            [userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Error fetching user profile', error });
    }
});

// Send a message
app.post('/api/messages', authenticateToken, async (req, res) => {
    const { receiver_id, content } = req.body;
    const sender_id = req.user.id;

    if (!content || !receiver_id) {
        return res.status(400).json({ message: 'Content and receiver_id are required' });
    }

    try {
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
    const { other_user_id } = req.query;

    try {
        let result;

        if (other_user_id) {
            result = await pool.query(
                `SELECT messages.*, users.username AS sender_username
                 FROM messages
                 JOIN users ON messages.sender_id = users.id
                 WHERE (sender_id = $1 AND receiver_id = $2) 
                 OR (sender_id = $2 AND receiver_id = $1)
                 ORDER BY timestamp`,
                [user_id, other_user_id]
            );
        } else {
            result = await pool.query(
                `SELECT messages.*, users.username AS sender_username
                 FROM messages
                 JOIN users ON messages.sender_id = users.id
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

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
