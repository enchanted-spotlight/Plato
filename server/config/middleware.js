const bodyParser = require('body-parser');
const sessions = require('express-session');
const passport = require('passport');

module.exports = (app, express) => {
  app.use(express.static('client'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(sessions({ secret: 'joe is the coolest' }));
  app.use(passport.initialize());
  app.use(passport.session());
};
