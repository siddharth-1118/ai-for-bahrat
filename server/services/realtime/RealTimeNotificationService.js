class RealTimeNotificationService {
  // Send notification to a specific user
  static sendNotification(userId, message, type = 'info') {
    if (global.broadcastNotification) {
      global.broadcastNotification(userId, {
        id: Date.now(),
        message,
        type,
        timestamp: new Date()
      });
    }
  }

  // Send achievement notification
  static sendAchievementNotification(userId, achievement) {
    if (global.broadcastNotification) {
      global.broadcastNotification(userId, {
        id: Date.now(),
        message: `🎉 Achievement Unlocked: ${achievement}`,
        type: 'achievement',
        timestamp: new Date()
      });
    }
  }

  // Send progress update
  static sendProgressUpdate(userId, courseName, progress) {
    if (global.broadcastNotification) {
      global.broadcastNotification(userId, {
        id: Date.now(),
        message: `📈 Progress Update: ${courseName} - ${progress}% complete`,
        type: 'progress',
        timestamp: new Date()
      });
    }
  }

  // Send AI suggestion
  static sendAISuggestion(userId, suggestion) {
    if (global.broadcastNotification) {
      global.broadcastNotification(userId, {
        id: Date.now(),
        message: `🤖 AI Suggestion: ${suggestion}`,
        type: 'ai-suggestion',
        timestamp: new Date()
      });
    }
  }

  // Send productivity tip
  static sendProductivityTip(userId, tip) {
    if (global.broadcastNotification) {
      global.broadcastNotification(userId, {
        id: Date.now(),
        message: `💡 Productivity Tip: ${tip}`,
        type: 'tip',
        timestamp: new Date()
      });
    }
  }
}

module.exports = RealTimeNotificationService;