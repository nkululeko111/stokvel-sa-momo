const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Get user analytics
router.get('/', auth, (req, res) => {
  try {
    const userId = req.user.id;
    
    // Mock analytics data - in production, calculate from database
    const analytics = {
      totalContributions: 63000,
      totalSavings: 45000,
      activeStokvels: 3,
      completedStokvels: 2,
      averageMonthlyContribution: 5250,
      savingsGrowthRate: 12.5,
      trustScore: 95,
      paymentHistory: {
        onTime: 18,
        late: 2,
        missed: 0
      },
      monthlyData: [
        { month: 'Jan', contributions: 7500, savings: 7500 },
        { month: 'Feb', contributions: 7500, savings: 15000 },
        { month: 'Mar', contributions: 7500, savings: 22500 },
        { month: 'Apr', contributions: 7500, savings: 30000 },
        { month: 'May', contributions: 7500, savings: 37500 },
        { month: 'Jun', contributions: 7500, savings: 45000 }
      ],
      stokvelBreakdown: [
        { name: 'Family Christmas Fund', amount: 15000, percentage: 33.3 },
        { name: 'Grocery Rotation', amount: 3000, percentage: 6.7 },
        { name: 'Property Investment', amount: 27000, percentage: 60.0 }
      ],
      achievements: [
        {
          id: 1,
          title: 'Consistent Contributor',
          description: 'Made 10 consecutive on-time payments',
          earnedAt: '2024-01-15',
          icon: 'trophy'
        },
        {
          id: 2,
          title: 'Stokvel Starter',
          description: 'Created your first stokvel',
          earnedAt: '2024-01-01',
          icon: 'star'
        }
      ],
      financialHealth: {
        score: 85,
        factors: {
          savingsRate: 'Good',
          paymentConsistency: 'Excellent',
          diversification: 'Fair',
          emergencyFund: 'Needs Improvement'
        },
        recommendations: [
          'Consider building an emergency fund of 3-6 months expenses',
          'Explore investment stokvels for long-term growth',
          'Set up automatic payments to improve consistency'
        ]
      }
    };

    res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get stokvel-specific analytics
router.get('/stokvel/:id', auth, (req, res) => {
  try {
    const stokvelId = parseInt(req.params.id);
    const userId = req.user.id;

    // Mock stokvel analytics
    const stokvelAnalytics = {
      stokvelId,
      performance: {
        totalContributions: 45000,
        targetAmount: 60000,
        progressPercentage: 75,
        monthsRemaining: 3,
        averageContribution: 2500,
        contributionConsistency: 90
      },
      memberStats: {
        totalMembers: 8,
        activeMembers: 8,
        averageContribution: 5625,
        topContributor: 'Thabo Mokoena',
        consistencyRate: 95
      },
      timeline: [
        { date: '2024-01-01', event: 'Stokvel created', amount: 0 },
        { date: '2024-01-31', event: 'First contributions', amount: 20000 },
        { date: '2024-02-28', event: 'Monthly contributions', amount: 35000 },
        { date: '2024-03-31', event: 'Monthly contributions', amount: 45000 }
      ],
      projections: {
        expectedCompletion: '2024-12-15',
        projectedFinalAmount: 60000,
        riskFactors: ['Member payment delays', 'Economic conditions'],
        successProbability: 92
      }
    };

    res.json({
      success: true,
      data: stokvelAnalytics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get financial insights
router.get('/insights', auth, (req, res) => {
  try {
    const userId = req.user.id;

    const insights = {
      personalizedTips: [
        {
          category: 'Savings',
          tip: 'You\'re saving 15% of your income - great job! Consider increasing to 20% for faster wealth building.',
          priority: 'medium',
          actionable: true
        },
        {
          category: 'Diversification',
          tip: 'All your savings are in stokvels. Consider adding a personal emergency fund.',
          priority: 'high',
          actionable: true
        },
        {
          category: 'Growth',
          tip: 'Your savings have grown 12% this year. Investment stokvels could boost this further.',
          priority: 'low',
          actionable: false
        }
      ],
      marketInsights: [
        {
          title: 'Stokvel Participation Up 25%',
          description: 'More South Africans are joining digital stokvels for better financial security.',
          source: 'Financial Sector Conduct Authority',
          date: '2024-01-15'
        },
        {
          title: 'Mobile Money Growth',
          description: 'MTN MoMo transactions increased 40% year-over-year in South Africa.',
          source: 'MTN Group',
          date: '2024-01-10'
        }
      ],
      goalTracking: {
        currentGoals: [
          {
            name: 'Christmas Fund Target',
            target: 30000,
            current: 15000,
            deadline: '2024-12-15',
            onTrack: true
          },
          {
            name: 'Emergency Fund',
            target: 25000,
            current: 0,
            deadline: '2024-06-30',
            onTrack: false
          }
        ],
        completedGoals: [
          {
            name: 'School Fees 2024',
            target: 15000,
            completedAt: '2024-01-15',
            timeTaken: '6 months'
          }
        ]
      }
    };

    res.json({
      success: true,
      data: insights
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;