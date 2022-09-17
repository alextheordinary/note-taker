const notes = require('express').Router();
const path = require('path');
const fs = require('fs');
const dbFile = './db/db.json';

notes.get('/', (req, res) => {
    fs.readFile(dbFile, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            return res.json(JSON.parse(data));
        }
    })
});

module.exports = notes;