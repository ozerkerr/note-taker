// Require needed libraries
const notes = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Sending data to GET request.
notes.get('/', (req, res) => {
  // Read database
  fs.readFile(`./db/db.json`, (err, data) => {
    if (err) {
      console.err("DATA IS NOT READ", err)
    } else {
      // Send response
      res.json(JSON.parse(data))
    }
  });
});

// Add new note api
notes.post('/', (req, res) => {
  // Structure note object
  const newNote = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv4()
  };
  // Read database file
  fs.readFile(`./db/db.json`, (err, data) => {
    if (err) {
      console.err("DATA IS NOT READ", err)
    } else {
      const parsedData = JSON.parse(data);
      // Push new note to array
      parsedData.push(newNote)
      // Write updated table to database
      fs.writeFile('./db/db.json', JSON.stringify(parsedData, null, 2), (err) =>
        err ? console.error(err) : console.info(`\nData written to database`)
      );
      // Send response to frontend
      res.json(`Note added successfully 🚀`);
    }
  });
});

// Delete api with id parameter
notes.delete('/:id', (req, res) => {
  // Save parameter to variable
  const noteID = req.params.id;
  // Read database file
  fs.readFile(`./db/db.json`, (err, data) => {
    if (err) {
      console.err("DATA IS NOT READ", err)
    } else {
      const parsedData = JSON.parse(data);
      // filter parsed data here
      const updatedParsedData = parsedData.filter(i => i.id !== noteID)
      // Write updated table to database
      fs.writeFile('./db/db.json', JSON.stringify(updatedParsedData, null, 2), (err) =>
        err ? console.error(err) : console.info(`\nData is deleted from database`)
      );
      // Send response to frontend
      res.json(`Note deleted successfully 🚀`);
    }
  });
});

// Export notes apis
module.exports = notes;