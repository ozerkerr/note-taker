const notes = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Sending data to GET request.
notes.get('/', (req, res) => {
  fs.readFile(`./db/db.json`, (err, data) => {
    if (err) {
      console.err("DATA IS NOT READ", err)
    } else {
      res.json(JSON.parse(data))
    }
  });
});

notes.post('/', (req, res) => {
  const newNote = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv4()
  };
  fs.readFile(`./db/db.json`, (err, data) => {
    if (err) {
      console.err("DATA IS NOT READ", err)
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(newNote)
      fs.writeFile('./db/db.json', JSON.stringify(parsedData, null, 2), (err) =>
        err ? console.error(err) : console.info(`\nData written to database`)
      );
      res.json(`Note added successfully 🚀`);
    }
  });
});

module.exports = notes;