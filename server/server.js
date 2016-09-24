const express = require('express');
const bodyParser = require('body-parser');


const app = express();

// server stuff here

// middleware
app.use(bodyParser());

// routing

// initialize server
app.listening(3000, () => {
  console.log('Plato is listening on port 3000 ...');
});

	module.exports = app;
