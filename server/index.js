// --- 1. IMPORTS & CONFIGURATION ---
// We import necessary packages. 'express' creates the server, 'cors' handles security.
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config(); // Loads secret keys from .env file (keep your passwords safe!)

// Import our custom database connection function
const connectDB = require('./config/db');

// --- 2. SERVER INITIALIZATION ---
// Create the Express app (the "brain")
const app = express();
// specific Node.js HTTP server wrapper (needed for Socket.io to work)
const server = http.createServer(app);

// Initialize Socket.io (Real-time communication engine)
const io = socketIo(server, {
  cors: {
    // SECURITY: Only allow connections from our frontend (localhost:5173 etc.)
    origin: process.env.NODE_ENV === 'production' ? false : ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5176", "http://localhost:5177", "http://localhost:5178", "http://localhost:5179", "http://localhost:5180", "http://localhost:5181", "http://localhost:5182", "http://localhost:5183", "http://localhost:5184"],
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 5000;

// Connect to MongoDB Database
connectDB();

// --- 3. MIDDLEWARE ---
// Middleware runs before your routes.
app.use(cors()); // Enable Cross-Origin Resource Sharing (allows frontend to talk to backend)
app.use(express.json()); // Parses incoming JSON data (e.g., login form data)

// --- 4. ROUTES ---
// Map URL paths to specific route files.
// If a user goes to '/api/auth', the 'routes/api/auth.js' file handles it.
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/learning', require('./routes/learning'));
app.use('/api/productivity', require('./routes/productivity'));
app.use('/api/analytics', require('./routes/api/analytics'));
app.use('/api/users', require('./routes/users'));

// Health check - A simple route to see if server is alive
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'AI for Bharat server is running!' });
});

// Error handler middleware (process errors in one place)
app.use(require('./middleware/errorHandler'));

// --- 5. REAL-TIME SOCKETS ---
// Listen for client connections
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Handle user joining a specific "room" (e.g., for private messages)
  socket.on('join-room', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined room`);
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Helper function to send notifications to specific users
const broadcastNotification = (userId, notification) => {
  io.to(userId).emit('notification', notification);
};

// Make broadcast function available globally
global.broadcastNotification = broadcastNotification;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});