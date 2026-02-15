const User = require('../../models/User');

class AnalyticsService {
  // Get user learning analytics
  static async getUserAnalytics(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const totalCourses = user.learningProgress.length;
    const completedCourses = user.learningProgress.filter(course => course.completed).length;
    const avgProgress = user.learningProgress.length > 0 
      ? user.learningProgress.reduce((sum, course) => sum + course.progress, 0) / user.learningProgress.length
      : 0;
    
    // Calculate learning streak
    const today = new Date();
    let streak = 0;
    // This would be more complex in a real implementation with daily activity tracking
    
    return {
      totalCourses,
      completedCourses,
      avgProgress: Math.round(avgProgress),
      completionRate: totalCourses > 0 ? Math.round((completedCourses / totalCourses) * 100) : 0,
      learningStreak: streak,
      aiInteractionsCount: user.aiInteractions.length
    };
  }

  // Get productivity insights
  static async getProductivityInsights(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const { productivityStats } = user;
    
    // Generate insights based on productivity data
    const insights = [];
    
    if (productivityStats.totalTimeTracked > 0) {
      insights.push(`You've tracked ${Math.round(productivityStats.totalTimeTracked / 60)} hours of work`);
    }
    
    if (productivityStats.sessionsCompleted > 0) {
      insights.push(`You've completed ${productivityStats.sessionsCompleted} productivity sessions`);
    }
    
    if (productivityStats.averageFocusTime > 0) {
      insights.push(`Your average focus time is ${Math.round(productivityStats.averageFocusTime)} minutes`);
    }
    
    if (productivityStats.improvementAreas && productivityStats.improvementAreas.length > 0) {
      insights.push(`Focus on improving: ${productivityStats.improvementAreas.join(', ')}`);
    }

    return {
      stats: productivityStats,
      insights
    };
  }

  // Get learning recommendations based on user progress
  static async getLearningRecommendations(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Simple recommendation algorithm based on incomplete courses and preferences
    const incompleteCourses = user.learningProgress.filter(course => !course.completed);
    const preferences = user.preferences || {};
    
    // This would connect to a more sophisticated recommendation engine in a real app
    const recommendations = [
      {
        type: 'course',
        title: 'Advanced JavaScript Concepts',
        reason: 'Based on your interest in web development',
        estimatedTime: '8 hours',
        difficulty: 'Intermediate'
      },
      {
        type: 'resource',
        title: 'Clean Code Principles',
        reason: 'To improve your coding practices',
        estimatedTime: '6 hours',
        difficulty: 'Intermediate'
      },
      {
        type: 'practice',
        title: 'Algorithm Challenges',
        reason: 'To strengthen your problem-solving skills',
        estimatedTime: '10 hours',
        difficulty: 'Intermediate'
      }
    ];

    return recommendations;
  }

  // Get weekly progress report
  static async getWeeklyReport(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Calculate weekly progress
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    // Count recent activities
    const recentActivities = user.aiInteractions.filter(interaction => 
      new Date(interaction.timestamp) > oneWeekAgo
    ).length;
    
    const recentProgress = user.learningProgress.filter(course => 
      course.startedAt && new Date(course.startedAt) > oneWeekAgo
    ).length;

    return {
      startDate: oneWeekAgo,
      endDate: now,
      activitiesCompleted: recentActivities,
      coursesStarted: recentProgress,
      aiInteractions: recentActivities,
      achievements: [] // Would be populated based on actual achievements
    };
  }
}

module.exports = AnalyticsService;