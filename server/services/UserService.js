const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const RealTimeNotificationService = require('../services/realtime/RealTimeNotificationService');

class UserService {
  // Register user
  static async register(userData) {
    const { name, email, password } = userData;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      throw new Error('User already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = new User({
      name,
      email,
      password: hashedPassword,
      preferences: {
        learningGoals: [],
        preferredLanguages: [],
        notificationSettings: {
          email: true,
          push: true
        }
      }
    });

    await user.save();

    // Generate JWT token
    const payload = {
      user: {
        id: user.id
      }
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '7 days'
    });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    };
  }

  // Login user
  static async login(email, password) {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Compare passwords using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    // Generate JWT token
    const payload = {
      user: {
        id: user.id
      }
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '7 days'
    });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    };
  }

  // Get user by ID
  static async getUserById(userId) {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  // Update user preferences
  static async updateUserPreferences(userId, preferences) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    user.preferences = { ...user.preferences, ...preferences };
    await user.save();

    return user;
  }

  // Update learning progress
  static async updateLearningProgress(userId, courseId, progressData) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    let progressRecord = user.learningProgress.find(p => p.courseId === courseId);
    
    if (!progressRecord) {
      progressRecord = {
        courseId: progressData.courseId,
        courseName: progressData.courseName,
        progress: 0,
        completed: false
      };
      user.learningProgress.push(progressRecord);
    }

    const oldProgress = progressRecord.progress;
    progressRecord.progress = progressData.progress;
    progressRecord.completed = progressData.completed;

    if (progressData.completed && !progressRecord.completedAt) {
      progressRecord.completedAt = new Date();
      // Send achievement notification when course is completed
      RealTimeNotificationService.sendAchievementNotification(userId, `Completed ${progressRecord.courseName}`);
    }

    if (!progressRecord.startedAt) {
      progressRecord.startedAt = new Date();
    }

    await user.save();
    
    // Send progress update notification if progress increased significantly
    if (progressData.progress > oldProgress && progressData.progress % 25 === 0) { // Every 25%
      RealTimeNotificationService.sendProgressUpdate(userId, progressRecord.courseName, progressData.progress);
    }
    
    return progressRecord;
  }
}

module.exports = UserService;