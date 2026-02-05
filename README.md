# 🎓 CodeMentor AI - Intelligent Learning Platform

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

An AI-powered learning platform that helps developers master programming through personalized learning plans, code explanations, and progress tracking.

![CodeMentor AI](https://img.shields.io/badge/Status-Production%20Ready-success)
![Demo Mode](https://img.shields.io/badge/Demo%20Mode-Available-blue)

---

---

## ✨ Features

- **🤖 AI Code Explainer**: Get intelligent explanations of code snippets at your skill level
- **📚 Personalized Learning Plans**: Generate custom study roadmaps based on your goals
- **📊 Progress Dashboard**: Track your learning journey with detailed statistics
- **🎯 Adaptive Learning**: Content adjusts to beginner, intermediate, or advanced levels
- **💻 Multi-Language Support**: JavaScript, Python, Java, C++, and more
- **🎨 Beautiful UI**: Modern, responsive design with smooth animations
- **⚡ Demo Mode**: Works completely standalone without requiring a backend

## 📸 Screenshots

### Dashboard
> Track your learning progress with beautiful statistics and quick actions

### Code Explainer
> Get AI-powered explanations for any code snippet in multiple languages

### Learning Plan
> Generate personalized study roadmaps tailored to your goals

*Screenshots coming soon! Run the app to see it in action.*

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

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

### Ways to Contribute
- 🐛 Report bugs
- 💡 Suggest new features
- 📝 Improve documentation
- 🎨 Enhance UI/UX
- ✨ Add new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with React and modern web technologies
- Inspired by the need for personalized learning experiences
- Designed for developers, by developers
- Special thanks to all contributors

## 📞 Support

For questions or issues:
- 📧 Open an issue on GitHub
- 💬 Check existing discussions
- 📖 Read the documentation

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!

## 📈 Roadmap

- [ ] Dark mode
- [ ] Code challenges
- [ ] Community forum
- [ ] Mobile app
- [ ] Video tutorials
- [ ] Gamification
- [ ] Social features

---

**Made with ❤️ for the developer community**

[![GitHub stars](https://img.shields.io/github/stars/Aditya2987/CodeMentor?style=social)](https://github.com/Aditya2987/CodeMentor)
[![GitHub forks](https://img.shields.io/github/forks/Aditya2987/CodeMentor?style=social)](https://github.com/Aditya2987/CodeMentor/fork)

