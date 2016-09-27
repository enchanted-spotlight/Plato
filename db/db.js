const mongoose = require('mongoose');
const Note = require('./models/note');
const User = require('./models/user');

// db stuff here
if (process.env.NODE_ENV === 'dev') {
  console.log('Connecting to test DB ...');
  mongoose.connect('mongodb://localhost/test');
} else {
  console.log('Connecting to real DB ...');
  mongoose.connect('mongodb://localhost/plato');
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
