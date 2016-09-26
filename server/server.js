const express = require('express');
const bodyParser = require('body-parser');
// routing modules
const noteRouter = require('./routes/notesRouter');

const app = express();

// server stuff here

// middleware
app.use(bodyParser());

console.log(process.env.NODE_ENV);
// routing
app.use('/api', noteRouter);

// initialize server
app.listen(3000, () => {
  console.log('Plato is listening on port 3000 ...');
});

module.exports = app;
