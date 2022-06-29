// Import express and other middleware
const express = require('express');
const notesRouter = require('./notes');

// Define app
const app = express();

// Define path
app.use('/notes', notesRouter);

// Export app
module.exports = app;