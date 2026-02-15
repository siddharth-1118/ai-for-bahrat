const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/aiforbharat_fresh_start', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// User model definition (to match our existing User model)
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  preferences: {
    learningGoals: [String],
    preferredLanguages: [String],
    difficultyLevel: String,
    dailyGoal: Number
  },
  learningProgress: [{
    courseId: String,
    courseName: String,
    progress: { type: Number, default: 0 },
    completed: { type: Boolean, default: false },
    startedAt: Date,
    completedAt: Date
  }],
  productivityStats: {
    dailySessions: [{ date: Date, duration: Number }],
    averageSessionLength: Number,
    streakCount: { type: Number, default: 0 }
  },
  aiInteractions: [{
    type: String,
    prompt: String,
    timestamp: { type: Date, default: Date.now }
  }]
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

async function clearDatabase() {
  try {
    console.log('Connected to database');
    
    // Drop the users collection
    await User.deleteMany({});
    console.log('All users have been deleted from the database');
    
    // Close the connection
    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error clearing database:', error);
    process.exit(1);
  }
}

clearDatabase();