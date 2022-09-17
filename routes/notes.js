const notes = require('express').Router();
const path = require('path');
const fs = require('fs');
const dbFile = './db/db.json';
const { v4: uuidv4 } = require('uuid');

// Read db.json and return all saved notes as json
notes.get('/', (req, res) => {
    fs.readFile(dbFile, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            return res.json(JSON.parse(data));
        }
    })
});

// Parse body for new note, add to db.json file, and return new note to client
notes.post('/', (req, res) => {
    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            note_id: uuidv4()
        };

        fs.readFile(dbFile, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const dbData = JSON.parse(data);
                dbData.push(newNote);
                fs.writeFile(dbFile, JSON.stringify(dbData, null, 4), (err) =>
                    err ? console.error(err) : console.info(`\n Data written to ${dbFile}`)
                );
            }
        });
        return newNote;
    }
});

module.exports = notes;