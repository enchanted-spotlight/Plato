require('dotenv').config();
const slack = require('@slack/client');
const request = require('superagent');
const path = require('path');

const RTM_EVENTS = slack.RTM_EVENTS;

// Require db so it sets up connection
require('./db');
const express = require('express');
const middleware = require('./config/middleware');

// routing modules
const noteRouter = require('./config/routes');

const app = express();
middleware(app, express);

// Socket.io setup
const http = require('http').Server(app);
const io = require('socket.io').listen(http);
const chats = require('./controllers/chats');

io.on('connection', (socket) => {
  console.log('A user connected via socket.io!');
  socket.on('load chat room',
    chatRoom => chats.loadChatRoomFromDatabase(socket, chatRoom)
  );
  socket.on('new chat message',
    data => chats.sendMessageToDatabase(socket, data)
  );
});

// routing
app.use('/api', noteRouter);

app.get('/*', (req, res) => {
  res.sendfile(path.join(__dirname, '/../client/index.html'));
});

// initialize server
http.listen(3000, () => {
  console.log('Plato is listening on port 3000 ...');
});

module.exports = app;
