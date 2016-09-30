require('dotenv').config();

// Require db so it sets up connection
require('./db');
const express = require('express');
const middleware = require('./config/middleware');
// routing modules
const noteRouter = require('./config/routes');

const app = express();
middleware(app, express);


// routing
app.use('/api', noteRouter);

// initialize server
app.listen(3000, () => {
  console.log('Plato is listening on port 3000 ...');
});

module.exports = app;
