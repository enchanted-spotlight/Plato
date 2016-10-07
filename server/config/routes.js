const express = require('express');
const passport = require('./auth');

const router = new express.Router();

const chats = require('../controllers/chats')
const notes = require('../controllers/notes');
const user = require('../controllers/users');

// ------------ CHAT & SLACK ---------- //
router.post('/chat', chats.sendMessageToSlack);

// --------------- NOTES ------------- //
router.post('/save-note', notes.saveNote);
router.get('/:user', notes.retrieveAllUserNotes);
router.delete('/delete-note/:id', notes.deleteUserNote);

// --------------- AUTH -------------- //

router.post('/auth/login/local', passport.authenticate('local'), (req, res) => {
  // should redirect to doc page instead of just returning a 200 status
  res.status(200).send();
});


router.get('/auth/login/facebook', passport.authenticate('facebook'));
router.get('/auth/login/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: 'http://google.com'
  }));

router.get('/auth/login/twitter', passport.authenticate('twitter'));
router.get('/auth/login/twitter/callback',
  passport.authenticate('twitter', {
    successRedirect: '/',
    failureRedirect: 'http://google.com'
  }));

router.post('/auth/signup', user.signUp);

router.get('/auth/logout', (req, res) => {
  req.logout();
  res.status(200).send();
});


module.exports = router;
