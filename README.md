# CodeMentor AI

A Personalized Learning & Developer Productivity Assistant powered by AI.

## Features

- 🎯 Smart Learning Planner - AI-generated personalized study roadmaps
- 💡 Interactive Code Explainer - Understand code with multi-level explanations
- 🐛 Intelligent Debugging Assistant - Step-by-step debugging guidance
- 📊 Progress Dashboard - Track your learning journey
- 🔐 Secure Authentication - JWT-based user management

## Tech Stack

**Frontend:**
- React + Vite
- Tailwind CSS
- Monaco Editor
- React Router
- Axios

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- OpenAI API (GPT-4)
- JWT Authentication
- bcryptjs

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- OpenAI API key

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm run install-all
```

3. Create `.env` file in root:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/codementor-ai
JWT_SECRET=your_secret_key_here
OPENAI_API_KEY=your_openai_key_here
NODE_ENV=development
```

4. Start MongoDB (if local)

5. Run the application:
```bash
npm run dev
```

Frontend: http://localhost:3000
Backend: http://localhost:5000

## Project Structure

```
codementor-ai/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   └── package.json
├── server/                # Express backend
│   ├── config/           # Database config
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── middleware/       # Auth middleware
│   └── index.js          # Server entry
└── package.json          # Root package.json
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user

### Learning
- POST `/api/learning/plan` - Create learning plan
- GET `/api/learning/plan` - Get user's plan
- PATCH `/api/learning/plan/:id/progress` - Update progress

### AI
- POST `/api/ai/explain` - Explain code
- POST `/api/ai/generate-plan` - Generate learning plan
- POST `/api/ai/debug` - Get debugging help

## License

MIT
