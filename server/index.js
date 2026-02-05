const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB (optional for demo)
if (process.env.MONGODB_URI && !process.env.MONGODB_URI.includes('your_')) {
  connectDB();
} else {
  console.log('⚠️  Running without MongoDB - using in-memory storage for demo');
}

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/learning', require('./routes/learning'));
app.use('/api/ai', require('./routes/ai'));

app.get('/', (req, res) => {
  res.json({ message: 'CodeMentor AI API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
