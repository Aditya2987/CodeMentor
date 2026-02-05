const express = require('express');
const router = express.Router();
const OpenAI = require('openai');
const auth = require('../middleware/auth');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Explain code
router.post('/explain', auth, async (req, res) => {
  try {
    const { code, language, level } = req.body;

    const prompt = `You are a coding tutor. Explain this ${language} code to a ${level} developer in simple terms. Break it down line by line if complex:\n\n${code}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1000
    });

    res.json({ explanation: completion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ message: 'AI service error', error: error.message });
  }
});

// Generate learning plan
router.post('/generate-plan', auth, async (req, res) => {
  try {
    const { goal, experienceLevel, weeksAvailable, hoursPerWeek } = req.body;

    const prompt = `Create a ${weeksAvailable}-week learning plan for a ${experienceLevel} developer who wants to: ${goal}. They can study ${hoursPerWeek} hours per week. Format as JSON with weeks array containing: weekNumber, topics (array), estimatedHours.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
      max_tokens: 2000
    });

    const planText = completion.choices[0].message.content;
    const jsonMatch = planText.match(/\{[\s\S]*\}/);
    const plan = jsonMatch ? JSON.parse(jsonMatch[0]) : { weeks: [] };

    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: 'AI service error', error: error.message });
  }
});

// Debug assistance
router.post('/debug', auth, async (req, res) => {
  try {
    const { code, error, description } = req.body;

    const prompt = `Help debug this issue:\nCode: ${code}\nError: ${error}\nDescription: ${description}\n\nProvide step-by-step debugging guidance, explain the error, and suggest how to fix it.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1500
    });

    res.json({ guidance: completion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ message: 'AI service error', error: error.message });
  }
});

module.exports = router;
