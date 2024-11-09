// app.js
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files
app.use('/static', express.static(path.join(__dirname, 'frontend/static')));

// Serve main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/templates/index.html'));
});

app.listen(port, () => {
    console.log(`Game running at http://localhost:${port}`);
});