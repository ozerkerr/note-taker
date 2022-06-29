// Require express
const express = require('express');
const path = require('path');

// Define port
const PORT = process.env.port || 3001;
// define app
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// require static routes
app.use(express.static('public'));

// send landing page
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// send notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// initialize app
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);