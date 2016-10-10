const express = require('express');
const passport = require('./auth');

const router = new express.Router();

// const notes = require('../controllers/notes');
const sessions = require('../controllers/sessions');
const user = require('../controllers/users');

// ---------- SESSIONS ---------- //
router.post('/save-session', sessions.saveSession);
router.get('/:user', sessions.retrieveAllUserSessions);
router.delete('/delete-session/:id', sessions.deleteUserSession);
router.post('/:user', sessions.retrieveCertainUserSessions);

// ---------- AUTH ---------- //

router.post('/auth/login/local', passport.authenticate('local'), (req, res) => {
  // should redirect to doc page instead of just returning a 200 status
  res.status(200).send();
});


router.get('/auth/login/facebook',
  passport.authenticate('facebook', { scope: ['email'] }));
router.get('/auth/login/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: 'http://www.reactiongifs.com/captain-america-fail/',
    successRedirect: '/'
  }));

router.get('/auth/login/twitter',
  passport.authenticate('twitter', { scope: ['email'] }));
router.get('/auth/login/twitter/callback',
  passport.authenticate('twitter', {
    failureRedirect: 'http://www.reactiongifs.com/captain-america-fail/'
  }), (req, res) => {
    res.redirect('/');
  });

router.get('/auth/login/slack',
  passport.authenticate('slack',
    { scope: ['identity.basic', 'identity.email'] }));
router.get('/auth/login/slack/callback',
  passport.authenticate('slack', {
    successRedirect: '/',
    failureRedirect: 'http://www.reactiongifs.com/captain-america-fail/'
  }));

router.get('/auth/login/google', passport.authenticate('google',
  { scope: ['https://www.googleapis.com/auth/plus.login',
  'https://www.googleapis.com/auth/plus.profile.emails.read'] }));
router.get('/auth/login/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: 'http://google.com'
  }));


router.post('/auth/signup', user.signUp);

router.get('/auth/logout', (req, res) => {
  req.logout();
  res.status(200).send();
});

router.get('/auth/identify', user.identifyUser);


module.exports = router;
