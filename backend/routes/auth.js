const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Mock user database - replace with actual database
const users = [];

// Register new user
router.post('/register', [
  body('phoneNumber').isMobilePhone().withMessage('Valid phone number required'),
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('pin').isLength({ min: 4, max: 6 }).withMessage('PIN must be 4-6 digits'),
  body('language').optional().isIn(['en', 'zu', 'xh', 'af']).withMessage('Invalid language')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { phoneNumber, firstName, lastName, pin, language = 'en' } = req.body;

    // Check if user already exists
    const existingUser = users.find(u => u.phoneNumber === phoneNumber);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this phone number'
      });
    }

    // Hash PIN
    const hashedPin = await bcrypt.hash(pin, 10);

    // Create user
    const user = {
      id: users.length + 1,
      phoneNumber,
      firstName,
      lastName,
      pin: hashedPin,
      language,
      createdAt: new Date(),
      isActive: true,
      trustScore: 100
    };

    users.push(user);

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, phoneNumber: user.phoneNumber },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: user.id,
        phoneNumber: user.phoneNumber,
        firstName: user.firstName,
        lastName: user.lastName,
        language: user.language,
        trustScore: user.trustScore
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message
    });
  }
});

// Login user
router.post('/login', [
  body('phoneNumber').isMobilePhone().withMessage('Valid phone number required'),
  body('pin').notEmpty().withMessage('PIN is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { phoneNumber, pin } = req.body;

    // Find user
    const user = users.find(u => u.phoneNumber === phoneNumber);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Verify PIN
    const isValidPin = await bcrypt.compare(pin, user.pin);
    if (!isValidPin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, phoneNumber: user.phoneNumber },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        phoneNumber: user.phoneNumber,
        firstName: user.firstName,
        lastName: user.lastName,
        language: user.language,
        trustScore: user.trustScore
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message
    });
  }
});

// Verify phone number (for MoMo integration)
router.post('/verify-phone', [
  body('phoneNumber').isMobilePhone().withMessage('Valid phone number required'),
  body('verificationCode').isLength({ min: 4, max: 6 }).withMessage('Invalid verification code')
], async (req, res) => {
  try {
    const { phoneNumber, verificationCode } = req.body;
    
    // In production, verify with actual SMS service
    // For demo, accept any 4-digit code
    if (verificationCode.length === 4) {
      res.json({
        success: true,
        message: 'Phone number verified successfully'
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Invalid verification code'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Verification failed',
      error: error.message
    });
  }
});

module.exports = router;