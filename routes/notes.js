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
            id: uuidv4()
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
        return res.json(newNote);
    }
});

// Receive query parameter containing the id of a note to delete. Read all notes from the file, remove the note with the matching id, and rewrite to db.json

notes.delete('/:id', (req, res) => {
    idParam = req.params.id;
    fs.readFile(dbFile, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const dbData = JSON.parse(data);
            const newData = [];
            for (const note of dbData) {
                if (idParam !== note.id) {
                    newData.push(note);
                }
            }
            return res.json(JSON.parse(newData));
        }
    })
});

module.exports = notes;