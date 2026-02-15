const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {
  getUserAnalytics,
  getProductivityInsights,
  getLearningRecommendations,
  getWeeklyReport
} = require('../../controllers/analytics/analyticsController');

// @route   GET api/analytics/user
// @desc    Get user analytics
// @access  Private
router.get('/user', auth, getUserAnalytics);

// @route   GET api/analytics/productivity
// @desc    Get productivity insights
// @access  Private
router.get('/productivity', auth, getProductivityInsights);

// @route   GET api/analytics/recommendations
// @desc    Get learning recommendations
// @access  Private
router.get('/recommendations', auth, getLearningRecommendations);

// @route   GET api/analytics/weekly-report
// @desc    Get weekly progress report
// @access  Private
router.get('/weekly-report', auth, getWeeklyReport);

module.exports = router;