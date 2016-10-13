const bodyParser = require('body-parser');
const sessions = require('express-session');
const passport = require('passport');
const path = require('path');

module.exports = (app, express) => {
  app.use(express.static('client'));
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.use(sessions({ secret: 'joe is the coolest' }));
  app.use(passport.initialize());
  app.use(passport.session());
};
