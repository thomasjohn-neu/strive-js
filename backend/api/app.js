import express from 'express';
import expressWs from 'express-ws';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import routes from './routes/index.js';
import {handleWebSocketConnection} from './websocket/socket-routes.js';
import {handleReminderWebSocketConnection} from './websocket/reminder-socket.js'

const app = express();
expressWs(app);

console.log("before connection");
mongoose.connect('mongodb://localhost:27017/challengeDb');
console.log("after connection");
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function callback () {
  console.log("Database connected");
});

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

// Add headers before the routes are defined
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    // res.setHeader('Access-Control-Allow-Origin', 'http://challenges.app.neu:3000');
  
    // // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
    // // Set to true if you need the website to include cookies in the requests sent
    // // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', true);
  
    // Pass to next layer of middleware
    next();
  });

app.ws('/notifications', handleWebSocketConnection);
app.ws('/reminders', handleReminderWebSocketConnection);

  

app.use(cookieParser());
routes(app);
export {app,mongoose};