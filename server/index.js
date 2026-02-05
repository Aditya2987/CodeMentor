const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { errorHandler, notFound } = require('./middleware/errorHandler');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB (optional for demo)
if (process.env.MONGODB_URI && !process.env.MONGODB_URI.includes('your_')) {
  connectDB().catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
    console.log('⚠️  Continuing without database - API will use fallback responses');
  });
} else {
  console.log('⚠️  Running without MongoDB - using in-memory storage for demo');
}

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging in development
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/learning', require('./routes/learning'));
app.use('/api/ai', require('./routes/ai'));

app.get('/', (req, res) => {
  res.json({ 
    message: 'CodeMentor AI API is running',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      learning: '/api/learning',
      ai: '/api/ai',
      health: '/health'
    }
  });
});

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('💤 Process terminated');
  });
});

process.on('unhandledRejection', (err) => {
  console.error('💥 UNHANDLED REJECTION! Shutting down...');
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
});
