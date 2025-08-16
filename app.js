// app.js
const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

// ✅ Only connect to DB if not in test mode
if (process.env.NODE_ENV !== 'test') {
  connectDB();
}

const app = express();

// Middlewares
app.use(express.json({ limit: '10kb' }));
app.use(helmet());
app.use(hpp());
app.use(cors());

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter);

// Routes
// app.use('/api/users', require('./routes/userRoutes')); // Temporarily disabled due to import issues
app.use('/api/posts', require('./routes/postRoutes'));
app.use('/api/comments', require('./routes/commentRoutes'));

module.exports = app; // ✅ Export only app (for tests)
