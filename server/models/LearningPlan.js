const mongoose = require('mongoose');

const learningPlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  goal: { type: String, required: true },
  weeks: [{
    weekNumber: Number,
    topics: [String],
    resources: [{ title: String, url: String, type: String }],
    estimatedHours: Number,
    completed: { type: Boolean, default: false }
  }],
  progress: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LearningPlan', learningPlanSchema);
