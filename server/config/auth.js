const bcrypt = require('bcrypt-nodejs');
const cryptr = require('cryptr');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const SlackStrategy = require('passport-slack').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('../models/user');
const Note = require('../models/note');

passport.use(new LocalStrategy(
  (username, password, done) => {
    if (!password) { return done(); }
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
  callbackURL: 'http://localhost:3000/api/auth/login/facebook/callback',
  profileFields: ['id', 'emails', 'name']
},
  (accessToken, refreshToken, profile, done) => {
    const fbId = {
      $set: { facebookId: profile.id }
    };
    User.findOneAndUpdate({
      email: profile.emails[0].value.toUpperCase(),
    }, fbId, { upsert: true }, (err, user) => {
      console.log(user);
      if (err) {
        return done(err);
      } else if (user === null) {
        User.findOne({ facebookId: profile.id }, (err2, user2) => {
          console.log(user2);
          if (err) { return done(err2); }
          return done(null, user2);
        });
      } else {
        return done(null, user);
      }
    });
  }
));

passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL: 'http://localhost:3000/api/auth/login/twitter/callback',
  profileFields: ['id', 'emails', 'name'],
  passReqToCallback: true
},
  (request, token, tokenSecret, profile, done) => {
    const newUser = { twitterId: profile.id };
    User.findOneAndUpdate({
      twitterId: profile.id,
    }, newUser, { upsert: true }, (err, user) => {
      // if inserted, user is null on the first time
      // need to accomodate for null user, but null user probably means that
      // the user is authenticated already, otherwise it would've shot an error
      if (err) {
        return done(err);
      } else if (user === null) {
        User.findOne({ twitterId: profile.id }, (err2, user2) => {
          if (err) { return done(err); }
          return done(null, user2);
        });
      } else {
        return done(null, user);
      }
    });
  }
));

passport.use(new SlackStrategy({
  clientID: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/api/auth/login/slack/callback',
  scope: 'incoming-webhook users:read'
},
  (accessToken, refreshToken, profile, done) => {
    const userEmail = profile._json.info.user.profile.email.toUpperCase();
    const newUser = {
      $set: {
        slackId: profile.id,
        slackToken: cryptr.encrypt(accessToken)
      }
    };
    User.findOneAndUpdate({
      email: userEmail
    }, newUser, { upsert: true }, (err, user) => {
      if (err) {
        return done(err);
      } else if (user === null) {
        User.findOne({ slackId: profile.id }, (err2, user2) => {
          if (err) { return done(err); }
          return done(null, user2);
        });
      } else {
        return done(null, user);
      }
    });
  }
));

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/api/auth/login/google/callback',
  passReqToCallback: true
},
  (request, accessToken, refreshToken, profile, done) => {
    const googleId = { $set: { googleId: profile.id } };

    User.findOneAndUpdate({
      email: profile.email.toUpperCase()
    }, googleId, { upsert: true }, (err, user) => {
      if (err) {
        return done(err);
      } else if (user === null) {
        User.findOne({ googleId: profile.id }, (err2, user2) => {
          if (err) { return done(err); }
          return done(null, user2);
        });
      } else {
        return done(null, user);
      }
    });
  }
));


passport.serializeUser((user, done) => {
  // serializes user with our _id from mongodb
  done(null, user._id);
});

// passport.deserializeUser((id, done) => {
//   User.find({ _id: id }, (err, user) => {
//     done(err, user);
//   });
// });

module.exports = passport;
