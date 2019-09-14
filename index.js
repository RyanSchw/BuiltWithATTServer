const express = require('express')
const SocketServer = require('ws').Server
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('PERdudes');
})

app.post('/api/doorEntry', (req, res) => {
    res.sendStatus(200);
});

app.use((req, res) => res.sendFile(INDEX))
app.use(express.json());
app.listen(port, () => console.log(`Listening on port ${port}`));

const wss = new SocketServer({
    server: app,
    port: 8190
});

wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('close', () => console.log('Client disconnected'));
});

setInterval(() => {
    wss.clients.forEach((client) => {
        client.send(new Date().toTimeString());
    });
}, 1000);
