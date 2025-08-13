const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/userRoutes'));

module.exports = app;
