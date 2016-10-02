const express = require('express');
const passport = require('./auth');

const router = new express.Router();

const notes = require('../controllers/notes');

// ---------- NOTES & USERS ---------- //
router.post('/save-note', notes.saveNote);
router.get('/:user', notes.retrieveAllUserNotes);
router.delete('/delete-note/:id', notes.deleteUserNote);

// ---------- AUTH ---------- //

router.post('/auth/login/local', passport.authenticate('local'), function(req, res) {
  res.status(200).send();
});

router.get('/auth/login/facebook', passport.authenticate('facebook'));
router.get('this is a fake callback url', passport.authenticate('facebook', {
  successRedirect: 'redirect here on success',
  failureRedirect: 'redirect here on failure'
}));

router.get('/auth/login/twitter', passport.authenticate('twitter'));
router.get('this is a fake callback url', passport.authenticate('twitter', {
  successRedirect: 'redirect here on success',
  failureRedirect: 'redirect here on failure'
}));

module.exports = router;
