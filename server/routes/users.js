const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get user profile
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user preferences
router.put('/preferences', async (req, res) => {
  try {
    // We assume the user ID is available via middleware or we pass it in the body/header
    // However, this route is currently unprotected in this file structure (users.js usually needs auth middleware)
    // For now, let's assume we get the token and decode it, OR we just trust the client sends the ID.
    // BUT, the onboarding component sends a token. 
    // Let's use the 'auth' middleware if available, or just decode loosely for this prototype.
    // Better: The client sends 'x-auth-token'. We should use the auth middleware.

    // Let's import auth middleware
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.user.id;

    const { preferences } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Merge new preferences
    if (preferences.preferredLanguages) user.preferences.preferredLanguages = preferences.preferredLanguages;
    if (preferences.learningGoals) user.preferences.learningGoals = preferences.learningGoals;

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create/update user
router.post('/', async (req, res) => {
  try {
    const { name, email, preferences } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });

    if (user) {
      // Update existing user
      user.name = name;
      user.preferences = preferences;
      await user.save();
      return res.json(user);
    }

    // Create new user
    user = new User({
      name,
      email,
      preferences
    });

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update learning progress
router.put('/:id/progress', async (req, res) => {
  try {
    const { courseId, courseName, progress, completed } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find existing progress record or create new one
    let progressRecord = user.learningProgress.find(p => p.courseId === courseId);

    if (!progressRecord) {
      progressRecord = {
        courseId,
        courseName,
        progress: 0,
        completed: false
      };
      user.learningProgress.push(progressRecord);
    }

    progressRecord.progress = progress;
    progressRecord.completed = completed;

    if (completed && !progressRecord.completedAt) {
      progressRecord.completedAt = new Date();
    }

    if (!progressRecord.startedAt) {
      progressRecord.startedAt = new Date();
    }

    await user.save();
    res.json(progressRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get productivity stats
router.get('/:id/productivity', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user.productivityStats || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Track AI interaction
router.post('/:id/track-interaction', async (req, res) => {
  try {
    const { interactionType, details } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.aiInteractions.push({
      type: interactionType,
      details
    });

    await user.save();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;