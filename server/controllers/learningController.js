const { OpenAI } = require('openai');
const AIProcessor = require('../utils/aiProcessor');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
const aiProcessor = new AIProcessor();

// Get study tips based on learning progress
const getStudyTips = async (req, res) => {
  try {
    const { subject, proficiencyLevel, weakAreas } = req.body;
    
    const prompt = `Provide study tips for ${subject} at ${proficiencyLevel} level.
    Weak areas: ${weakAreas}
    
    Give:
    1. Study strategies (specific techniques)
    2. Resources (books, videos, tutorials)
    3. Practice methods (ways to reinforce learning)
    4. Motivation tips (how to stay motivated)
    
    Format as JSON with keys: strategies, resources, practiceMethods, motivationTips`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: aiProcessor.model,
    });

    const responseText = completion.choices[0].message.content.trim();
    const response = aiProcessor.extractJsonFromResponse(responseText);
    
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get AI-powered code review
const getCodeReview = async (req, res) => {
  try {
    const { code, language, purpose } = req.body;
    
    const prompt = `Perform a code review for this ${language} code:
    Purpose: ${purpose}
    Code: ${code}
    
    Evaluate:
    1. Code quality (readability, maintainability)
    2. Performance considerations
    3. Security concerns
    4. Best practices adherence
    5. Suggestions for improvement
    
    Format as JSON with keys: quality, performance, security, bestPractices, suggestions`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: aiProcessor.model,
    });

    const responseText = completion.choices[0].message.content.trim();
    const response = aiProcessor.extractJsonFromResponse(responseText);
    
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getStudyTips,
  getCodeReview
};