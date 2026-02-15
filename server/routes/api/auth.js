const express = require('express');
const router = express.Router();
const UserService = require('../../services/UserService');
const auth = require('../../middleware/auth');
const validator = require('../../helpers/validator');

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    const requiredFields = ['name', 'email', 'password'];
    const requiredErrors = validator.validateRequired(requiredFields, { name, email, password });
    
    if (requiredErrors.length > 0) {
      return res.status(400).json({ success: false, error: requiredErrors.join(', ') });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, error: 'Please provide a valid email address' });
    }

    if (!validator.isPasswordStrong(password)) {
      return res.status(400).json({ success: false, error: 'Password must be at least 8 characters long and include uppercase, lowercase, and a number' });
    }

    const result = await UserService.register({ name, email, password });
    res.json(result);
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    const requiredFields = ['email', 'password'];
    const requiredErrors = validator.validateRequired(requiredFields, { email, password });
    
    if (requiredErrors.length > 0) {
      return res.status(400).json({ success: false, error: requiredErrors.join(', ') });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, error: 'Please provide a valid email address' });
    }

    const result = await UserService.login(email, password);
    res.json(result);
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// @route   GET api/auth/me
// @desc    Get logged in user
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    res.json({ user: req.userDoc });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// @route   POST api/auth/forgot-password
// @desc    Forgot password
// @access  Public
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, error: 'Please provide a valid email address' });
    }

    // In a real app, you would:
    // 1. Find the user by email
    // 2. Generate a password reset token
    // 3. Send an email with the reset link
    
    // For now, we'll simulate the process
    console.log(`Password reset requested for: ${email}`);
    
    // This is a simulation - in a real app, you'd send an email with reset link
    res.json({ 
      success: true, 
      message: 'If an account with that email exists, a password reset link has been sent.'
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;