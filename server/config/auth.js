const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('../models/user');
const Note = require('../models/note');

passport.use(new LocalStrategy(
  (username, password, done) => {
    User.findOne({ name: username.toUpperCase() }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      bcrypt.compare(password, user.password, (err2, res) => {
        if (err2 || !res) {
          return done(null, false, { message: 'Error validing password' });
        }
        user.name = username;
        return done(null, user);
      });
    });
  }
));

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: 'http://www.example.com/auth/facebook/callback'
},
  (accessToken, refreshToken, profile, done) => {
    User.findOrCreate((err, user) => {
      if (err) { return done(err); }
      return done(null, user);
    });
  }
));

passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL: 'http://www.example.com/auth/twitter/callback'
},
  (token, tokenSecret, profile, done) => {
    User.findOrCreate((err, user) => {
      if (err) { return done(err); }
      return done(null, user);
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.find({ _id: id }, (err, user) => {
    done(err, user);
  });
});

module.exports = passport;
