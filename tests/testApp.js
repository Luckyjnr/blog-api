// tests/testApp.js - Minimal app for testing
const express = require('express');
const app = express();

// Middlewares
app.use(express.json({ limit: '10kb' }));

// Only include routes needed for testing
app.use('/api/posts', require('../routes/postRoutes'));
app.use('/api/comments', require('../routes/commentRoutes'));

module.exports = app;
