# 🚀 Deployment Guide

## GitHub Setup & Publishing

### Fix GitHub Authentication Error

You're getting a 403 error because you're logged in as `Aditya2987` but trying to push to `Doit-Ay/CodeMentor`. Here are your options:

#### Option 1: Push to Your Own Account (Recommended)
```bash
# Remove the incorrect remote
git remote remove origin

# Add your own repository
git remote add origin https://github.com/Aditya2987/CodeMentor.git

# Push to your account
git branch -M main
git push -u origin main
```

#### Option 2: Use Personal Access Token
If you need to push to `Doit-Ay/CodeMentor`:

1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Generate new token (classic) with `repo` scope
3. Use token instead of password:
```bash
git remote set-url origin https://YOUR_TOKEN@github.com/Doit-Ay/CodeMentor.git
git push -u origin main
```

#### Option 3: Use SSH
```bash
git remote set-url origin git@github.com:Doit-Ay/CodeMentor.git
git push -u origin main
```

## Deployment Options

### 1. Vercel (Recommended for Frontend)

**Deploy Frontend:**
```bash
cd client
npm install -g vercel
vercel
```

Follow prompts and your app will be live!

**Environment Variables on Vercel:**
- Add in Vercel Dashboard → Settings → Environment Variables
- No backend variables needed for demo mode

### 2. Netlify (Alternative Frontend)

```bash
cd client
npm run build
```

Drag the `dist` folder to Netlify drop zone or use CLI:
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### 3. Render (Full Stack)

**Frontend:**
- Connect GitHub repo
- Build command: `cd client && npm install && npm run build`
- Publish directory: `client/dist`

**Backend:**
- Connect GitHub repo
- Build command: `npm install`
- Start command: `npm start`
- Add environment variables in dashboard

### 4. Railway (Full Stack)

1. Connect GitHub repository
2. Railway auto-detects Node.js
3. Add environment variables
4. Deploy automatically on push

### 5. Heroku (Full Stack)

```bash
heroku create codementor-ai
heroku config:set MONGODB_URI=your_uri
heroku config:set JWT_SECRET=your_secret
heroku config:set OPENAI_API_KEY=your_key
git push heroku main
```

## Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/codementor
JWT_SECRET=your-super-secret-jwt-key-change-this
OPENAI_API_KEY=sk-your-openai-api-key
PORT=5000
NODE_ENV=production
```

### Frontend (Optional)
```env
VITE_API_URL=https://your-backend-url.com
```

## Production Checklist

- [ ] Update CORS settings in backend
- [ ] Set secure JWT_SECRET
- [ ] Configure MongoDB Atlas for production
- [ ] Add rate limiting to API
- [ ] Enable HTTPS
- [ ] Set up error logging (Sentry, LogRocket)
- [ ] Configure CDN for static assets
- [ ] Add analytics (Google Analytics, Plausible)
- [ ] Test all features in production
- [ ] Set up CI/CD pipeline

## Performance Optimization

### Frontend
```bash
# Build optimized production bundle
cd client
npm run build

# Analyze bundle size
npm run build -- --analyze
```

### Backend
- Enable compression middleware
- Add Redis caching
- Optimize database queries
- Use PM2 for process management

## Monitoring

### Recommended Tools
- **Uptime**: UptimeRobot, Pingdom
- **Errors**: Sentry
- **Analytics**: Google Analytics, Plausible
- **Performance**: Lighthouse, WebPageTest

## Troubleshooting

### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### CORS Errors
Add to backend:
```javascript
app.use(cors({
  origin: ['https://your-frontend-url.com'],
  credentials: true
}));
```

### MongoDB Connection Issues
- Check IP whitelist in MongoDB Atlas
- Verify connection string format
- Ensure network access is configured

## Continuous Deployment

### GitHub Actions Example
```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm run build
      - run: npm run deploy
```

## Cost Estimates

### Free Tier Options
- **Vercel**: Free for personal projects
- **Netlify**: 100GB bandwidth/month free
- **MongoDB Atlas**: 512MB free tier
- **Render**: Free tier available
- **Railway**: $5 credit/month free

### Paid Options
- **Vercel Pro**: $20/month
- **MongoDB Atlas**: $9/month (M2)
- **OpenAI API**: Pay per use (~$0.002/1K tokens)

---

Need help? Open an issue on GitHub!
