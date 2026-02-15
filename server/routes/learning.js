const express = require('express');
const router = express.Router();
const AIProcessor = require('../utils/aiProcessor');

const aiProcessor = new AIProcessor();

// Generate personalized learning path
router.post('/path', async (req, res) => {
  try {
    const { skill, experienceLevel, goals, timeframe } = req.body;
    
    const response = await aiProcessor.generateLearningPath(skill, experienceLevel, goals, timeframe);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Explain code snippet
router.post('/explain-code', async (req, res) => {
  try {
    const { code, language } = req.body;
    
    const response = await aiProcessor.explainCode(code, language);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Generate practice exercises
router.post('/practice-exercises', async (req, res) => {
  try {
    const { topic, difficulty } = req.body;
    
    const response = await aiProcessor.generatePracticeExercises(topic, difficulty);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get study tips
router.post('/study-tips', async (req, res) => {
  try {
    const { subject, proficiencyLevel, weakAreas } = req.body;
    const aiProcessor = new (require('../utils/aiProcessor'))();
    
    const response = await aiProcessor.getStudyTips(subject, proficiencyLevel, weakAreas);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get code review
router.post('/code-review', async (req, res) => {
  try {
    const { code, language, purpose } = req.body;
    const aiProcessor = new (require('../utils/aiProcessor'))();
    
    const response = await aiProcessor.getCodeReview(code, language, purpose);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;