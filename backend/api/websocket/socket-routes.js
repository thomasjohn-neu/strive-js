import * as userService from './../services/user-services.js';
import { verifyToken } from '../security/authentication.js';

const connections = [];

const clients = new Map();

async function handleWebSocketConnection(ws, req) {
    try {
        const token = req.url.split('token=')[1];
        const payload = await verifyToken(token);
        const user = await userService.getUser(payload.username);

        // add client to map with user ID as key
        clients.set(user.username, ws);

        console.log(`User ${user.username} connected`);

        connections.push(ws);

        ws.on('message', function incoming(message) {
            console.log(`Received message from user ${user.username}: ${message}`);
            ws.send(`Echo: ${message}`);
        });

        // ws.send('Welcome to the WebSocket server!');

        // setInterval(function sendMessages() {
        //     // send message to specific user by retrieving their websocket connection from the map
        //     const userSocket = clients.get(user.username);

        //     if (userSocket) {
        //         userSocket.send(`Hello, ${user.username}!`);
        //     }
        // }, 10000);

    } catch (error) {
        console.log("Error while establishing websocket")
        console.log(error)
    }
}

function sendWebSocketMessageToAll(message) {
    connections.forEach((ws) => {
        ws.send(message);
    });
}

function sendWebSocketMessageToClient(username, message) {
    const userSocket = clients.get(username);
  
    if (userSocket) {
      userSocket.send(message);
    }
}

export { connections, clients, handleWebSocketConnection, sendWebSocketMessageToAll, sendWebSocketMessageToClient };
