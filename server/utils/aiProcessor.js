const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

class AIProcessor {
  constructor() {
    this.model = 'gpt-3.5-turbo';
    this.openai = openai;
  }

  // Utility function to extract JSON from AI response
  extractJsonFromResponse(responseText) {
    try {
      // First, try to parse as-is
      return JSON.parse(responseText);
    } catch (e) {
      // If that fails, try to extract JSON from markdown
      const jsonMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      if (jsonMatch) {
        try {
          return JSON.parse(jsonMatch[1]);
        } catch (e2) {
          // If still failing, try to find JSON within the text
          const jsonStart = responseText.indexOf('{');
          const jsonEnd = responseText.lastIndexOf('}') + 1;
          if (jsonStart !== -1 && jsonEnd > jsonStart) {
            const jsonString = responseText.substring(jsonStart, jsonEnd);
            return JSON.parse(jsonString);
          }
        }
      }
      throw new Error('Could not extract valid JSON from AI response');
    }
  }

  async generateLearningPath(skill, experienceLevel, goals, timeframe) {
    const prompt = `Create a personalized learning path for ${skill} with ${experienceLevel} experience level. 
    Goals: ${goals}
    Timeframe: ${timeframe} weeks
    
    Return a structured JSON response with:
    1. Weekly milestones (array of objects with title and description)
    2. Resources (array of learning resources)
    3. Practice projects (array of project ideas)
    4. Assessment criteria (array of evaluation metrics)
    
    Format as JSON with keys: weeks, resources, projects, assessments`;

    try {
      const completion = await this.openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: this.model,
      });

      // Clean up the response to extract only the JSON part
      const responseText = completion.choices[0].message.content.trim();
      
      return this.extractJsonFromResponse(responseText);
    } catch (error) {
      console.error('Error generating learning path:', error);
      throw error;
    }
  }

  async explainCode(code, language) {
    const prompt = `Explain this ${language} code snippet in simple terms:
    ${code}
    
    Include:
    1. What the code does
    2. Key concepts used
    3. Best practices demonstrated
    4. Potential improvements
    
    Format as JSON with keys: explanation, concepts, bestPractices, improvements`;

    try {
      const completion = await this.openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: this.model,
      });

      const responseText = completion.choices[0].message.content.trim();
      
      return this.extractJsonFromResponse(responseText);
    } catch (error) {
      console.error('Error explaining code:', error);
      throw error;
    }
  }

  async generatePracticeExercises(topic, difficulty) {
    const prompt = `Generate 5 practice exercises for ${topic} at ${difficulty} level.
    
    Return JSON with:
    - exercises array with: title, description, hints, solution_outline
    - estimated_time_per_exercise (in minutes)
    - learning_objectives (array)`;

    try {
      const completion = await this.openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: this.model,
      });

      const responseText = completion.choices[0].message.content.trim();
      
      return this.extractJsonFromResponse(responseText);
    } catch (error) {
      console.error('Error generating practice exercises:', error);
      throw error;
    }
  }

  async analyzeProductivity(workData, timeSpent, challenges) {
    const prompt = `Analyze this developer's productivity data:
    Work activities: ${workData}
    Time distribution: ${timeSpent}
    Challenges faced: ${challenges}
    
    Provide:
    1. Productivity insights (array of key observations)
    2. Time management recommendations (array)
    3. Focus improvement suggestions (array)
    4. Tool recommendations (array)
    
    Format as JSON with keys: insights, timeManagement, focusTips, tools`;

    try {
      const completion = await this.openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: this.model,
      });

      const responseText = completion.choices[0].message.content.trim();
      
      return this.extractJsonFromResponse(responseText);
    } catch (error) {
      console.error('Error analyzing productivity:', error);
      throw error;
    }
  }

  async generateCodingHelp(problem, context, codeAttempt) {
    const prompt = `Help solve this coding problem:
    Problem: ${problem}
    Context: ${context}
    Current attempt: ${codeAttempt}
    
    Provide:
    1. Problem breakdown (step-by-step analysis)
    2. Solution approach (recommended strategy)
    3. Code examples (relevant code snippets)
    4. Common pitfalls to avoid (potential mistakes)
    
    Format as JSON with keys: breakdown, approach, examples, pitfalls`;

    try {
      const completion = await this.openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: this.model,
      });

      const responseText = completion.choices[0].message.content.trim();
      
      return this.extractJsonFromResponse(responseText);
    } catch (error) {
      console.error('Error generating coding help:', error);
      throw error;
    }
  }

  async getStudyTips(subject, proficiencyLevel, weakAreas) {
    const prompt = `Provide study tips for ${subject} at ${proficiencyLevel} level.
    Weak areas: ${weakAreas}
    
    Give:
    1. Study strategies (specific techniques)
    2. Resources (books, videos, tutorials)
    3. Practice methods (ways to reinforce learning)
    4. Motivation tips (how to stay motivated)
    
    Format as JSON with keys: strategies, resources, practiceMethods, motivationTips`;

    try {
      const completion = await this.openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: this.model,
      });

      const responseText = completion.choices[0].message.content.trim();
      return this.extractJsonFromResponse(responseText);
    } catch (error) {
      console.error('Error getting study tips:', error);
      throw error;
    }
  }

  async getCodeReview(code, language, purpose) {
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

    try {
      const completion = await this.openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: this.model,
      });

      const responseText = completion.choices[0].message.content.trim();
      return this.extractJsonFromResponse(responseText);
    } catch (error) {
      console.error('Error getting code review:', error);
      throw error;
    }
  }

  async optimizeWorkflow(currentWorkflow, painPoints) {
    const prompt = `Optimize this development workflow:
    Current workflow: ${currentWorkflow}
    Pain points: ${painPoints}
    
    Suggest:
    1. Automation opportunities (specific automatable tasks)
    2. Tool integrations (tools that can work together)
    3. Process improvements (ways to streamline)
    4. Time-saving techniques (efficiency tips)
    
    Format as JSON with keys: automation, tools, processImprovements, timeSavers`;

    try {
      const completion = await this.openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: this.model,
      });

      const responseText = completion.choices[0].message.content.trim();
      
      return this.extractJsonFromResponse(responseText);
    } catch (error) {
      console.error('Error optimizing workflow:', error);
      throw error;
    }
  }
}

module.exports = AIProcessor;