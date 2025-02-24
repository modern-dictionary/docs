# WebSockets in Node.js

WebSockets allow real-time communication between the client and server. In this Node.js implementation, we provide features such as tracking mouse movement and displaying the names of online members.

## Setting Up WebSockets

### Install Dependencies
First, install the required packages:
```sh
npm init -y
```

### Creating the WebSocket Server
Create a file `server.js` and initialize the WebSocket server:
```js
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let clients = {};

wss.on('connection', (ws) => {
    let userId = `User-${Math.floor(Math.random() * 1000)}`;
    clients[userId] = ws;

    console.log(`${userId} connected.`);

    ws.on('message', (message) => {
        let data = JSON.parse(message);
        if (data.type === 'mousemove') {
            broadcast({ type: 'mousemove', user: userId, x: data.x, y: data.y });
        } else if (data.type === 'join') {
            broadcast({ type: 'user_join', user: userId });
        }
    });

    ws.on('close', () => {
        delete clients[userId];
        broadcast({ type: 'user_leave', user: userId });
        console.log(`${userId} disconnected.`);
    });
});

function broadcast(data) {
    Object.values(clients).forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}

server.listen(3000, () => console.log('WebSocket server running on port 3000'));
```

## Implementing the Client Side

Create an `index.html` file:
```html
<!DOCTYPE html>
<html>
<head>
    <title>WebSocket Example</title>
</head>
<body>
    <h2>Mouse Tracker & Online Users</h2>
    <canvas id="canvas" width="800" height="500" style="border:1px solid black;"></canvas>
    <script>
        const ws = new WebSocket('ws://localhost:3000');

        ws.onopen = () => {
            ws.send(JSON.stringify({ type: 'join' }));
        };

        ws.onmessage = (event) => {
            let data = JSON.parse(event.data);
            console.log(data);
        };

        document.addEventListener('mousemove', (event) => {
            ws.send(JSON.stringify({ type: 'mousemove', x: event.clientX, y: event.clientY }));
        });
    </script>
</body>
</html>
```

## Running the WebSocket Server
Start the server using:
```sh
node server.js
```

## Conclusion
This WebSocket implementation allows users to track mouse movement in real time and displays online users dynamically. More features like chat or notifications can be added using a similar approach.
