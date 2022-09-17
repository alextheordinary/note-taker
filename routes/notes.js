const notes = require('express').Router();
const path = require('path');
const fs = require('fs');
const dbFile = path.join(__dirname, '/db/db.json');

notes.get('/', (req, res) => {
    fs.readFile(dbFile, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            res.json(data);
        }
    })
});

module.exports = notes;