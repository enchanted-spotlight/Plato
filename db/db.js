const mongoose = require('mongoose');

// db stuff here
mongoose.connect('mongodb://localhost/test');

const db = mongoose.connection;

db.on('error', console.log('DB error!'));

db.once('open', console.log('DB connection opened!'));
