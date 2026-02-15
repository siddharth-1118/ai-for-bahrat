const express = require('express');
const router = express.Router();
const AIProcessor = require('../utils/aiProcessor');

const aiProcessor = new AIProcessor();

// Analyze productivity patterns
router.post('/analyze', async (req, res) => {
  try {
    const { workData, timeSpent, challenges } = req.body;
    
    const response = await aiProcessor.analyzeProductivity(workData, timeSpent, challenges);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Generate coding assistance
router.post('/coding-help', async (req, res) => {
  try {
    const { problem, context, codeAttempt } = req.body;
    
    const response = await aiProcessor.generateCodingHelp(problem, context, codeAttempt);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Optimize workflow suggestions
router.post('/workflow-optimization', async (req, res) => {
  try {
    const { currentWorkflow, painPoints } = req.body;
    
    const response = await aiProcessor.optimizeWorkflow(currentWorkflow, painPoints);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;