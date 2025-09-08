const express = require('express');
const router = express.Router();
const momoService = require('../services/momoService');
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

// Request payment from user
router.post('/request-payment', auth, [
  body('amount').isNumeric().withMessage('Amount must be a number'),
  body('phoneNumber').isMobilePhone().withMessage('Valid phone number required'),
  body('stokvelId').isInt().withMessage('Valid stokvel ID required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { amount, phoneNumber, stokvelId, message } = req.body;
    const userId = req.user.id;

    const result = await momoService.requestToPay(
      amount,
      'ZAR', // South African Rand
      `stokvel_${stokvelId}_${userId}_${Date.now()}`,
      { phoneNumber },
      message || 'Stokvel contribution payment',
      `Payment for stokvel contribution`
    );

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Check payment status
router.get('/payment-status/:referenceId', auth, async (req, res) => {
  try {
    const { referenceId } = req.params;
    const result = await momoService.getPaymentStatus(referenceId);

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get account balance
router.get('/balance', auth, async (req, res) => {
  try {
    const result = await momoService.getAccountBalance();

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Transfer money (for payouts)
router.post('/transfer', auth, [
  body('amount').isNumeric().withMessage('Amount must be a number'),
  body('phoneNumber').isMobilePhone().withMessage('Valid phone number required'),
  body('stokvelId').isInt().withMessage('Valid stokvel ID required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { amount, phoneNumber, stokvelId, message } = req.body;
    const userId = req.user.id;

    const result = await momoService.transfer(
      amount,
      'ZAR',
      `payout_${stokvelId}_${userId}_${Date.now()}`,
      { phoneNumber },
      message || 'Stokvel payout',
      `Payout from stokvel`
    );

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Setup recurring payment
router.post('/setup-recurring', auth, [
  body('stokvelId').isInt().withMessage('Valid stokvel ID required'),
  body('amount').isNumeric().withMessage('Amount must be a number'),
  body('frequency').isIn(['weekly', 'monthly', 'quarterly']).withMessage('Valid frequency required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { stokvelId, amount, frequency } = req.body;
    const userId = req.user.id;

    const result = await momoService.setupRecurringPayment(stokvelId, userId, amount, frequency);

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;