const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

const PORT = process.env.port || 5000;

const app = express();

app.use(express.json());
app.use('/api', api);

// Used to serve static files.
app.use(express.static('public'));

// API call for notes.html. Placed before get * call to prevent wildcard from catching it first
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Anything else will load index.html
app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
    console.log(`App listening on port: ${PORT}`)
);