require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
// routing modules
const noteRouter = require('./routes/notesRouter');

const app = express();

// server stuff here

// middleware
app.use(bodyParser());
// serve public files
app.use(express.static('client/public'));

// routing
app.use('/api', noteRouter);

// initialize server
app.listen(3000, () => {
  console.log('Plato is listening on port 3000 ...');
});

module.exports = app;
