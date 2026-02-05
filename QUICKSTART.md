# ⚡ Quick Start Guide

Get CodeMentor AI running in 5 minutes!

## 🎯 Choose Your Path

### Path 1: Demo Mode (No Backend) - Fastest! ⚡

Perfect for: Testing, demos, frontend development

```bash
# 1. Install dependencies
cd client
npm install

# 2. Start the app
npm run dev

# 3. Open browser
# Visit: http://localhost:5173
```

**That's it!** Use any email/password to login and explore all features.

### Path 2: Full Stack (With Backend) - Complete Experience 🚀

Perfect for: Production, real AI features, data persistence

```bash
# 1. Install all dependencies
npm run install-all

# 2. Set up environment variables
# Copy .env.example to .env and fill in:
# - MONGODB_URI (get from MongoDB Atlas)
# - JWT_SECRET (any random string)
# - OPENAI_API_KEY (get from OpenAI)

# 3. Start both servers
npm run dev

# 4. Open browser
# Frontend: http://localhost:5173
# Backend: http://localhost:5000
```

## 📋 Prerequisites

- **Node.js 16+** - [Download](https://nodejs.org/)
- **npm** - Comes with Node.js
- **MongoDB** (optional) - [MongoDB Atlas Free](https://www.mongodb.com/cloud/atlas)
- **OpenAI API Key** (optional) - [Get API Key](https://platform.openai.com/)

## 🎮 First Steps After Starting

1. **Register an Account**
   - Click "Get Started" or "Register"
   - Fill in your details
   - Choose your experience level

2. **Explore the Dashboard**
   - View your learning statistics
   - Check out quick action cards

3. **Try Code Explainer**
   - Navigate to "Explain Code"
   - Paste any code snippet
   - Select language and skill level
   - Click "Explain Code"

4. **Generate a Learning Plan**
   - Go to "Learning Plan"
   - Click "Create New Plan"
   - Set your goal (e.g., "Master React")
   - Choose duration and hours per week
   - Click "Generate Plan"

## 🔧 Troubleshooting

### Port Already in Use
```bash
# Frontend (5173)
# Kill the process or change port in vite.config.js

# Backend (5000)
# Change PORT in .env file
```

### Dependencies Not Installing
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Do the same in client folder
cd client
rm -rf node_modules package-lock.json
npm install
```

### MongoDB Connection Error
- Check your MONGODB_URI in .env
- Ensure IP is whitelisted in MongoDB Atlas
- Verify network access settings

### OpenAI API Error
- Verify your API key is correct
- Check you have credits available
- Ensure API key has proper permissions

## 📦 Available Scripts

```bash
# Demo mode (frontend only)
npm run demo

# Full stack development
npm run dev

# Backend only
npm run server

# Frontend only
npm run client

# Install all dependencies
npm run install-all

# Build for production
npm run build

# Start production server
npm start
```

## 🌐 Publishing to GitHub

### Quick Method
```bash
# 1. Create new repo on GitHub
# Visit: https://github.com/new

# 2. Push your code
git remote add origin https://github.com/YOUR_USERNAME/CodeMentor.git
git branch -M main
git push -u origin main
```

**Having issues?** Check [GITHUB_SETUP.md](./GITHUB_SETUP.md) for detailed instructions.

## 🚀 Deploying to Production

### Vercel (Recommended for Frontend)
```bash
cd client
npm install -g vercel
vercel
```

### Render (Full Stack)
1. Connect your GitHub repo
2. Add environment variables
3. Deploy automatically

**More options:** See [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📚 Documentation

- **README.md** - Project overview
- **FEATURES.md** - Complete feature list
- **DEPLOYMENT.md** - Deployment guides
- **GITHUB_SETUP.md** - GitHub publishing help

## 💡 Tips

1. **Demo Mode is Perfect For:**
   - Quick testing
   - UI/UX development
   - Presentations
   - Learning React

2. **Use Full Stack When:**
   - You need real AI explanations
   - You want data persistence
   - You're deploying to production
   - You need user authentication

3. **Development Workflow:**
   - Start with demo mode
   - Test features quickly
   - Add backend when needed
   - Deploy frontend first

## 🎯 Next Steps

1. ✅ Get the app running
2. ✅ Explore all features
3. ✅ Customize the UI
4. ✅ Add your own features
5. ✅ Deploy to production
6. ✅ Share with the world!

## 🆘 Need Help?

- **Issues?** Open a GitHub issue
- **Questions?** Check existing issues
- **Contributions?** PRs welcome!

## 🎉 You're Ready!

Start building, learning, and sharing!

```bash
# Let's go! 🚀
npm run demo
```

---

**Happy Coding! 💻✨**
