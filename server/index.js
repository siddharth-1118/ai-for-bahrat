const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' ? false : ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5176", "http://localhost:5177", "http://localhost:5178", "http://localhost:5179", "http://localhost:5180", "http://localhost:5181", "http://localhost:5182", "http://localhost:5183", "http://localhost:5184"],
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/learning', require('./routes/learning'));
app.use('/api/productivity', require('./routes/productivity'));
app.use('/api/analytics', require('./routes/api/analytics'));
app.use('/api/users', require('./routes/users'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'AI for Bharat server is running!' });
});

// Error handler
app.use(require('./middleware/errorHandler'));

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  // Handle user joining a room
  socket.on('join-room', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined room`);
  });
  
  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Broadcast notification to user
const broadcastNotification = (userId, notification) => {
  io.to(userId).emit('notification', notification);
};

// Make broadcast function available globally
global.broadcastNotification = broadcastNotification;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});