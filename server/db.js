const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Note = require('./models/note');
const User = require('./models/user');
const ChatRoom = require('./models/chats');

// db stuff here
if (process.env.NODE_ENV === 'dev') {
  console.log('Connecting to test DB ...');
  mongoose.connect('mongodb://localhost/test');
} else if (process.env.NODE_ENV === 'deploy') {
  console.log('Connecting to real DB ...');
  mongoose.connect(process.env.MONGO_CONNECTION_URL);
}

const db = mongoose.connection;

db.on('error', () => {
  console.log('Database error!');
});

db.once('open', () => {
  console.log('Database connection opened!');
});

// make our user and note models available to other modules
exports.module = db;
