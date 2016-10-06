const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('../models/user');
const Note = require('../models/note');

passport.use(new LocalStrategy(
  (username, password, done) => {
    User.findOne({ email: username.toUpperCase() }, (err, user) => {
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
        user.email = username;
        return done(null, user);
      });
    });
  }
));

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: 'http://localhost:3000/api/auth/login/facebook/callback'
},
  (accessToken, refreshToken, profile, done) => {
    const newUser = { email: profile.id };
    User.findOneAndUpdate({
      email: profile.id,
    }, newUser, { upsert: true }, (err, user) => {
      if (err) { return done(err); }
      return done(null, user);
    });
  }
));

passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL: 'http://localhost:3000/api/auth/login/twitter/callback'
},
  (token, tokenSecret, profile, done) => {
    const newUser = { email: profile._json.name };
    User.findOneAndUpdate({
      email: profile._json.name,
    }, newUser, { upsert: true }, (err, user) => {
      if (err) { return done(err); }
      return done(null, user);
    });
  }
));

passport.serializeUser((user, done) => {
  // serializes user with our _id from mongodb
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.find({ _id: id }, (err, user) => {
    done(err, user);
  });
});

module.exports = passport;
