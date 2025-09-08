const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Financial literacy content
const educationContent = {
  en: {
    modules: [
      {
        id: 1,
        title: 'Understanding Stokvels',
        description: 'Learn the basics of traditional South African savings groups',
        content: [
          {
            type: 'text',
            title: 'What is a Stokvel?',
            content: 'A stokvel is a type of credit union in which a group of people enter into an agreement to contribute a fixed amount of money to a common pool weekly, fortnightly or monthly.'
          },
          {
            type: 'video',
            title: 'History of Stokvels',
            url: 'https://example.com/stokvel-history',
            duration: '5:30'
          },
          {
            type: 'quiz',
            questions: [
              {
                question: 'What is the main purpose of a stokvel?',
                options: ['Individual savings', 'Group savings and support', 'Investment only', 'Lending money'],
                correct: 1
              }
            ]
          }
        ]
      },
      {
        id: 2,
        title: 'Digital Payments with MoMo',
        description: 'Master mobile money transactions and digital financial services',
        content: [
          {
            type: 'text',
            title: 'Benefits of Digital Payments',
            content: 'Digital payments offer security, convenience, and transparency. With MoMo, you can send money, pay bills, and manage your finances from your mobile phone.'
          },
          {
            type: 'interactive',
            title: 'MoMo Transaction Simulator',
            component: 'TransactionSimulator'
          }
        ]
      },
      {
        id: 3,
        title: 'Building Credit and Savings',
        description: 'Learn how to build a strong financial foundation',
        content: [
          {
            type: 'text',
            title: 'The Importance of Saving',
            content: 'Regular saving helps you build an emergency fund, achieve financial goals, and create wealth over time.'
          },
          {
            type: 'calculator',
            title: 'Savings Calculator',
            component: 'SavingsCalculator'
          }
        ]
      }
    ]
  },
  zu: {
    modules: [
      {
        id: 1,
        title: 'Ukuqonda Ama-Stokvel',
        description: 'Funda izisekelo zamaqembu okonga aseNingizimu Afrika',
        content: [
          {
            type: 'text',
            title: 'Yini i-Stokvel?',
            content: 'I-stokvel iwuhlobo lwe-credit union lapho iqembu labantu lingena esivumelwaneni sokufaka imali eqinile ephoolini evamile ngeviki, ngesonto noma ngenyanga.'
          }
        ]
      }
    ]
  },
  xh: {
    modules: [
      {
        id: 1,
        title: 'Ukuqonda ii-Stokvel',
        description: 'Funda iziseko zamaqela okonga aseMzantsi Afrika',
        content: [
          {
            type: 'text',
            title: 'Yintoni i-Stokvel?',
            content: 'I-stokvel luhlobo lwe-credit union apho iqela labantu lingena kwisivumelwano sokufaka imali eqinileyo kwipuli eqhelekileyo ngeveki, ngeeveki ezimbini okanye ngenyanga.'
          }
        ]
      }
    ]
  }
};

// Get all education modules
router.get('/modules', auth, (req, res) => {
  const language = req.query.lang || 'en';
  const content = educationContent[language] || educationContent.en;
  
  res.json({
    success: true,
    data: content.modules
  });
});

// Get specific module
router.get('/modules/:id', auth, (req, res) => {
  const { id } = req.params;
  const language = req.query.lang || 'en';
  const content = educationContent[language] || educationContent.en;
  
  const module = content.modules.find(m => m.id === parseInt(id));
  
  if (!module) {
    return res.status(404).json({
      success: false,
      message: 'Module not found'
    });
  }
  
  res.json({
    success: true,
    data: module
  });
});

// Track user progress
router.post('/progress', auth, (req, res) => {
  const { moduleId, lessonId, completed, score } = req.body;
  const userId = req.user.id;
  
  // In a real implementation, this would save to database
  res.json({
    success: true,
    message: 'Progress saved successfully'
  });
});

// Get user progress
router.get('/progress', auth, (req, res) => {
  const userId = req.user.id;
  
  // Mock progress data
  const progress = {
    completedModules: [1],
    currentModule: 2,
    totalScore: 85,
    certificates: ['basic-stokvel'],
    streakDays: 7
  };
  
  res.json({
    success: true,
    data: progress
  });
});

// Financial calculators
router.post('/calculate/savings', auth, (req, res) => {
  const { monthlyAmount, months, interestRate } = req.body;
  
  const rate = (interestRate || 0) / 100 / 12;
  const totalContributions = monthlyAmount * months;
  const futureValue = monthlyAmount * (((1 + rate) ** months - 1) / rate);
  
  res.json({
    success: true,
    data: {
      totalContributions,
      interestEarned: futureValue - totalContributions,
      futureValue,
      monthlyAmount,
      months
    }
  });
});

router.post('/calculate/stokvel', auth, (req, res) => {
  const { members, monthlyContribution, duration } = req.body;
  
  const totalPool = members * monthlyContribution * duration;
  const individualTotal = monthlyContribution * duration;
  const rotationAmount = members * monthlyContribution;
  
  res.json({
    success: true,
    data: {
      totalPool,
      individualTotal,
      rotationAmount,
      payoutSchedule: Array.from({ length: members }, (_, i) => ({
        member: i + 1,
        month: i + 1,
        amount: rotationAmount
      }))
    }
  });
});

module.exports = router;