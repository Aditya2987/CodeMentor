const express = require('express');
const router = express.Router();
const OpenAI = require('openai');
const auth = require('../middleware/auth');
const { catchAsync, AppError } = require('../middleware/errorHandler');

const openai = process.env.OPENAI_API_KEY && !process.env.OPENAI_API_KEY.includes('your_')
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

// Explain code
router.post('/explain', auth, catchAsync(async (req, res, next) => {
  const { code, language, level } = req.body;

  // Validation
  if (!code || !code.trim()) {
    return next(new AppError('Code is required', 400));
  }
  if (!language) {
    return next(new AppError('Language is required', 400));
  }
  if (!level) {
    return next(new AppError('Level is required', 400));
  }

  // Check if OpenAI is configured
  if (!openai) {
    return res.status(503).json({ 
      message: 'AI service not configured. Please add OPENAI_API_KEY to environment variables.',
      fallback: true
    });
  }

  try {
    const prompt = `You are a coding tutor. Explain this ${language} code to a ${level} developer in simple terms. Break it down line by line if complex:\n\n${code}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1000,
      timeout: 30000 // 30 second timeout
    });

    res.json({ explanation: completion.choices[0].message.content });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    if (error.code === 'insufficient_quota') {
      return next(new AppError('AI service quota exceeded. Please try again later.', 429));
    }
    if (error.code === 'rate_limit_exceeded') {
      return next(new AppError('Too many requests. Please wait a moment and try again.', 429));
    }
    if (error.status === 401) {
      return next(new AppError('AI service authentication failed', 500));
    }
    
    return next(new AppError('AI service temporarily unavailable. Please try again.', 503));
  }
}));

// Generate learning plan
router.post('/generate-plan', auth, catchAsync(async (req, res, next) => {
  const { goal, experienceLevel, weeksAvailable, hoursPerWeek } = req.body;

  // Validation
  if (!goal || !goal.trim()) {
    return next(new AppError('Learning goal is required', 400));
  }
  if (!experienceLevel) {
    return next(new AppError('Experience level is required', 400));
  }
  if (!weeksAvailable || weeksAvailable < 1 || weeksAvailable > 52) {
    return next(new AppError('Weeks available must be between 1 and 52', 400));
  }
  if (!hoursPerWeek || hoursPerWeek < 1 || hoursPerWeek > 40) {
    return next(new AppError('Hours per week must be between 1 and 40', 400));
  }

  // Check if OpenAI is configured
  if (!openai) {
    return res.status(503).json({ 
      message: 'AI service not configured. Please add OPENAI_API_KEY to environment variables.',
      fallback: true
    });
  }

  try {
    const prompt = `Create a ${weeksAvailable}-week learning plan for a ${experienceLevel} developer who wants to: ${goal}. They can study ${hoursPerWeek} hours per week. Format as JSON with weeks array containing: weekNumber, topics (array), estimatedHours.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
      max_tokens: 2000,
      timeout: 30000
    });

    const planText = completion.choices[0].message.content;
    const jsonMatch = planText.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      return next(new AppError('Failed to generate valid learning plan', 500));
    }

    const plan = JSON.parse(jsonMatch[0]);
    
    if (!plan.weeks || !Array.isArray(plan.weeks)) {
      return next(new AppError('Invalid learning plan format', 500));
    }

    res.json(plan);
  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    if (error instanceof SyntaxError) {
      return next(new AppError('Failed to parse AI response', 500));
    }
    if (error.code === 'insufficient_quota') {
      return next(new AppError('AI service quota exceeded. Please try again later.', 429));
    }
    if (error.code === 'rate_limit_exceeded') {
      return next(new AppError('Too many requests. Please wait a moment and try again.', 429));
    }
    
    return next(new AppError('AI service temporarily unavailable. Please try again.', 503));
  }
}));

// Debug assistance
router.post('/debug', auth, catchAsync(async (req, res, next) => {
  const { code, error, description } = req.body;

  // Validation
  if (!code || !code.trim()) {
    return next(new AppError('Code is required', 400));
  }
  if (!error || !error.trim()) {
    return next(new AppError('Error message is required', 400));
  }

  // Check if OpenAI is configured
  if (!openai) {
    return res.status(503).json({ 
      message: 'AI service not configured. Please add OPENAI_API_KEY to environment variables.',
      fallback: true
    });
  }

  try {
    const prompt = `Help debug this issue:\nCode: ${code}\nError: ${error}\nDescription: ${description || 'None provided'}\n\nProvide step-by-step debugging guidance, explain the error, and suggest how to fix it.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1500,
      timeout: 30000
    });

    res.json({ guidance: completion.choices[0].message.content });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    if (error.code === 'insufficient_quota') {
      return next(new AppError('AI service quota exceeded. Please try again later.', 429));
    }
    if (error.code === 'rate_limit_exceeded') {
      return next(new AppError('Too many requests. Please wait a moment and try again.', 429));
    }
    
    return next(new AppError('AI service temporarily unavailable. Please try again.', 503));
  }
}));

module.exports = router;
