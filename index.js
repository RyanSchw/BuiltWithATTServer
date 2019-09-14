'use strict';

const express = require('express');
const SocketServer = require('ws').Server;
const path = require('path');
var bodyParser = require('body-parser')

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const app = express();

app.use(bodyParser.text());

app.post('/api/doorEntry', (req, res) => {
    console.log(req.body);
    console.log('Connected clients:')
    wss.clients.forEach((client) => {
        console.log(client.token);
    });
    if (req.body[req.body.length - 1] == '1') {
        wss.clients.forEach((client) => {
            client.send('on');
        });
    }
    else
    {
        wss.clients.forEach((client) => {
            client.send('off');
        });
    }
    
    res.sendStatus(200);
});

app.use((req, res) => res.sendFile(INDEX));
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));


const wss = new SocketServer({ server });

wss.on('connection', (ws, req) => {
    ws.token = req.url.replace('/?token=', '');
    console.log('Client connected');
    ws.on('close', () => console.log('Client disconnected'));
});
