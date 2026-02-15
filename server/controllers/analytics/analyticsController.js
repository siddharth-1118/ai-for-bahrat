const AnalyticsService = require('../../services/analytics/AnalyticsService');
const auth = require('../../middleware/auth');

// Get user analytics
const getUserAnalytics = async (req, res) => {
  try {
    const analytics = await AnalyticsService.getUserAnalytics(req.user.id);
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get productivity insights
const getProductivityInsights = async (req, res) => {
  try {
    const insights = await AnalyticsService.getProductivityInsights(req.user.id);
    res.json(insights);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get learning recommendations
const getLearningRecommendations = async (req, res) => {
  try {
    const recommendations = await AnalyticsService.getLearningRecommendations(req.user.id);
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get weekly progress report
const getWeeklyReport = async (req, res) => {
  try {
    const report = await AnalyticsService.getWeeklyReport(req.user.id);
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUserAnalytics,
  getProductivityInsights,
  getLearningRecommendations,
  getWeeklyReport
};