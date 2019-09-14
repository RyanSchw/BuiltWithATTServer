'use strict';

const express = require('express');
const SocketServer = require('ws').Server;
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const app = express();

app.post('/api/doorEntry', (req, res) => {
    wss.clients.forEach((client) => {
        client.send('');
    });
    res.sendStatus(200);
});

app.use((req, res) => res.sendFile(INDEX));
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));


const wss = new SocketServer({ server });

wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('close', () => console.log('Client disconnected'));
});
