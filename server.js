const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

const PORT = process.env.port || 5000;

const app = express();

app.use(express.json());
app.use('/api', api);

app.use(express.static('public'));

app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
    console.group(`App listening on port: ${PORT}`)
);