const express = require('express');
const router = express.Router();
const LearningPlan = require('../models/LearningPlan');
const auth = require('../middleware/auth');

// Create learning plan
router.post('/plan', auth, async (req, res) => {
  try {
    const { goal, weeks } = req.body;
    const plan = new LearningPlan({ userId: req.userId, goal, weeks });
    await plan.save();
    res.status(201).json(plan);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user's learning plan
router.get('/plan', auth, async (req, res) => {
  try {
    const plan = await LearningPlan.findOne({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update progress
router.patch('/plan/:id/progress', auth, async (req, res) => {
  try {
    const { weekNumber, completed } = req.body;
    const plan = await LearningPlan.findById(req.params.id);
    
    if (plan.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const week = plan.weeks.find(w => w.weekNumber === weekNumber);
    if (week) {
      week.completed = completed;
      plan.progress = (plan.weeks.filter(w => w.completed).length / plan.weeks.length) * 100;
      plan.updatedAt = Date.now();
      await plan.save();
    }

    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get learning stats
router.get('/stats', auth, async (req, res) => {
  try {
    const plan = await LearningPlan.findOne({ userId: req.userId });
    const stats = {
      totalHours: plan ? plan.weeks.reduce((sum, w) => sum + (w.estimatedHours || 0), 0) : 0,
      topicsCompleted: plan ? plan.weeks.filter(w => w.completed).length : 0,
      currentStreak: 0
    };
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
