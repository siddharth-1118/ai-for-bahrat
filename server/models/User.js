const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  preferences: {
    learningGoals: [String],
    preferredLanguages: [String],
    notificationSettings: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true }
    }
  },
  learningProgress: [{
    courseId: String,
    courseName: String,
    progress: { type: Number, default: 0 }, // percentage
    completed: { type: Boolean, default: false },
    startedAt: Date,
    completedAt: Date
  }],
  productivityStats: {
    totalTimeTracked: { type: Number, default: 0 }, // in minutes
    sessionsCompleted: { type: Number, default: 0 },
    averageFocusTime: { type: Number, default: 0 }, // in minutes
    peakHours: [Number], // hour of day with most activity
    improvementAreas: [String]
  },
  aiInteractions: [{
    type: String, // 'learning-path', 'code-explanation', 'productivity-analysis', etc.
    timestamp: { type: Date, default: Date.now },
    details: mongoose.Schema.Types.Mixed
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);