# 🎓 CodeMentor AI - Intelligent Learning Platform

An AI-powered learning platform that helps developers master programming through personalized learning plans, code explanations, and progress tracking.

## ✨ Features

- **🤖 AI Code Explainer**: Get intelligent explanations of code snippets at your skill level
- **📚 Personalized Learning Plans**: Generate custom study roadmaps based on your goals
- **📊 Progress Dashboard**: Track your learning journey with detailed statistics
- **🎯 Adaptive Learning**: Content adjusts to beginner, intermediate, or advanced levels
- **💻 Multi-Language Support**: JavaScript, Python, Java, C++, and more

## 🚀 Demo Mode

The frontend works **completely standalone** without requiring a backend! Perfect for:
- Quick demos and presentations
- Frontend development and testing
- Showcasing the UI/UX
- Learning React and modern web development

## 🛠️ Tech Stack

### Frontend
- React 18 with Vite
- TailwindCSS for styling
- React Router for navigation
- Monaco Editor for code editing
- Axios for API calls

### Backend
- Node.js & Express
- MongoDB with Mongoose
- JWT Authentication
- OpenAI API integration

## 📦 Installation

### Prerequisites
- Node.js 16+ and npm
- MongoDB (optional - frontend works without it)

### Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/CodeMentor.git
cd CodeMentor
```

2. **Install dependencies**
```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
```

3. **Run in Demo Mode (Frontend Only)**
```bash
cd client
npm run dev
```
Open http://localhost:5173 and use any email/password to login!

4. **Run with Backend (Optional)**

Create `.env` file in root:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
OPENAI_API_KEY=your_openai_api_key
PORT=5000
```

Start both servers:
```bash
# Terminal 1 - Backend
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

## 🎮 Usage

### Demo Mode (No Backend Required)
1. Open the app at http://localhost:5173
2. Click "Register" and enter any details
3. Explore all features with mock data:
   - View your dashboard with sample statistics
   - Generate learning plans for any topic
   - Get AI-simulated code explanations
   - Track progress with visual indicators

### Full Mode (With Backend)
Connect to real MongoDB and OpenAI for:
- Persistent data storage
- Real AI-powered explanations
- User authentication
- Progress tracking across sessions

## 📁 Project Structure

```
CodeMentor/
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
└── package.json
```

## 🎨 Features Showcase

### Dashboard
- Real-time learning statistics
- Study hours tracking
- Topic completion metrics
- Current learning streak

### Code Explainer
- Multi-language support
- Skill-level adaptive explanations
- Syntax highlighting with Monaco Editor
- Copy-paste friendly interface

### Learning Plan Generator
- Custom goal setting
- Week-by-week breakdown
- Progress visualization
- Flexible scheduling

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for learning and development!

## 🙏 Acknowledgments

- Built with React and modern web technologies
- Inspired by the need for personalized learning experiences
- Designed for developers, by developers

## 📞 Support

For questions or issues, please open an issue on GitHub.

---

**Made with ❤️ for the developer community**
