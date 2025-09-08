const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

// Mock stokvel database
let stokvels = [
  {
    id: 1,
    name: 'Family Christmas Fund',
    type: 'Savings',
    description: 'Annual Christmas savings for family celebrations',
    balance: 45000,
    targetAmount: 60000,
    contributionAmount: 2500,
    frequency: 'monthly',
    members: [
      { id: 1, name: 'Thabo Mokoena', phoneNumber: '+27123456789', contributions: 15000, status: 'active' },
      { id: 2, name: 'Nomsa Dlamini', phoneNumber: '+27123456790', contributions: 12500, status: 'active' }
    ],
    createdBy: 1,
    createdAt: '2024-01-01',
    endDate: '2024-12-15',
    status: 'active',
    rules: {
      maxMembers: 10,
      minContribution: 2500,
      penaltyRate: 0.05,
      allowEarlyWithdrawal: false
    }
  }
];

// Get all stokvels for user
router.get('/', auth, (req, res) => {
  try {
    const userId = req.user.id;
    
    // Filter stokvels where user is a member
    const userStokvels = stokvels.filter(stokvel => 
      stokvel.members.some(member => member.id === userId) || stokvel.createdBy === userId
    );

    res.json({
      success: true,
      data: userStokvels.map(stokvel => ({
        ...stokvel,
        myContribution: stokvel.members.find(m => m.id === userId)?.contributions || 0,
        progress: Math.round((stokvel.balance / stokvel.targetAmount) * 100)
      }))
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Create new stokvel
router.post('/', auth, [
  body('name').notEmpty().withMessage('Stokvel name is required'),
  body('type').isIn(['Savings', 'Rotational', 'Investment']).withMessage('Invalid stokvel type'),
  body('contributionAmount').isNumeric().withMessage('Contribution amount must be a number'),
  body('targetAmount').optional().isNumeric().withMessage('Target amount must be a number'),
  body('frequency').isIn(['weekly', 'monthly', 'quarterly']).withMessage('Invalid frequency'),
  body('maxMembers').isInt({ min: 2, max: 50 }).withMessage('Max members must be between 2 and 50')
], (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const userId = req.user.id;
    const {
      name,
      type,
      description,
      contributionAmount,
      targetAmount,
      frequency,
      maxMembers,
      endDate,
      rules
    } = req.body;

    const newStokvel = {
      id: stokvels.length + 1,
      name,
      type,
      description: description || '',
      balance: 0,
      targetAmount: targetAmount || contributionAmount * maxMembers * 12,
      contributionAmount,
      frequency,
      members: [{
        id: userId,
        name: 'Current User', // In production, get from user database
        phoneNumber: req.user.phoneNumber,
        contributions: 0,
        status: 'active'
      }],
      createdBy: userId,
      createdAt: new Date().toISOString(),
      endDate: endDate || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
      rules: {
        maxMembers,
        minContribution: contributionAmount,
        penaltyRate: rules?.penaltyRate || 0.05,
        allowEarlyWithdrawal: rules?.allowEarlyWithdrawal || false
      },
      inviteCode: Math.random().toString(36).substring(2, 8).toUpperCase()
    };

    stokvels.push(newStokvel);

    res.status(201).json({
      success: true,
      message: 'Stokvel created successfully',
      data: newStokvel
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Join stokvel
router.post('/:id/join', auth, [
  body('inviteCode').notEmpty().withMessage('Invite code is required')
], (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const stokvelId = parseInt(req.params.id);
    const userId = req.user.id;
    const { inviteCode } = req.body;

    const stokvel = stokvels.find(s => s.id === stokvelId);
    if (!stokvel) {
      return res.status(404).json({
        success: false,
        message: 'Stokvel not found'
      });
    }

    if (stokvel.inviteCode !== inviteCode) {
      return res.status(400).json({
        success: false,
        message: 'Invalid invite code'
      });
    }

    if (stokvel.members.length >= stokvel.rules.maxMembers) {
      return res.status(400).json({
        success: false,
        message: 'Stokvel is full'
      });
    }

    if (stokvel.members.some(m => m.id === userId)) {
      return res.status(400).json({
        success: false,
        message: 'You are already a member of this stokvel'
      });
    }

    // Add user to stokvel
    stokvel.members.push({
      id: userId,
      name: 'New Member', // In production, get from user database
      phoneNumber: req.user.phoneNumber,
      contributions: 0,
      status: 'active',
      joinedAt: new Date().toISOString()
    });

    res.json({
      success: true,
      message: 'Successfully joined stokvel',
      data: stokvel
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get stokvel details
router.get('/:id', auth, (req, res) => {
  try {
    const stokvelId = parseInt(req.params.id);
    const userId = req.user.id;

    const stokvel = stokvels.find(s => s.id === stokvelId);
    if (!stokvel) {
      return res.status(404).json({
        success: false,
        message: 'Stokvel not found'
      });
    }

    // Check if user is a member
    const isMember = stokvel.members.some(m => m.id === userId) || stokvel.createdBy === userId;
    if (!isMember) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      data: {
        ...stokvel,
        myContribution: stokvel.members.find(m => m.id === userId)?.contributions || 0,
        progress: Math.round((stokvel.balance / stokvel.targetAmount) * 100)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Record contribution
router.post('/:id/contribute', auth, [
  body('amount').isNumeric().withMessage('Amount must be a number'),
  body('paymentReference').notEmpty().withMessage('Payment reference is required')
], (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const stokvelId = parseInt(req.params.id);
    const userId = req.user.id;
    const { amount, paymentReference } = req.body;

    const stokvel = stokvels.find(s => s.id === stokvelId);
    if (!stokvel) {
      return res.status(404).json({
        success: false,
        message: 'Stokvel not found'
      });
    }

    const member = stokvel.members.find(m => m.id === userId);
    if (!member) {
      return res.status(403).json({
        success: false,
        message: 'You are not a member of this stokvel'
      });
    }

    // Update member contribution and stokvel balance
    member.contributions += amount;
    stokvel.balance += amount;

    // Record transaction (in production, save to database)
    const transaction = {
      id: Date.now(),
      stokvelId,
      userId,
      type: 'contribution',
      amount,
      paymentReference,
      timestamp: new Date().toISOString(),
      status: 'completed'
    };

    res.json({
      success: true,
      message: 'Contribution recorded successfully',
      data: {
        transaction,
        newBalance: stokvel.balance,
        myContribution: member.contributions
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;