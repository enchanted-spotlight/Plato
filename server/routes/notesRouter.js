const express = require('express');

const router = express.Router();

router.post('/save-note', (req, res) => {
  // user is trying to save their note, so we need their
  // user_id that corresponds to the _id they have in our db's user collection
  // we also need to JSON.stringify their notes and the note's title

  // temporary response to test endpoint -- change later
  res.status(418).send('request received');
});

router.get('/:user', (req, res) => {
  // user is trying to get all their ntoes, so we need their
  // _id to look up all their notes that they've created
  // and return all those notes

  // temporary response to test endpoint -- change later
  res.status(418).send('request received');
});

router.delete('/del-note/:id', (req, res) => {
  // user is trying to delete a specific note via the mongo _id
  // that the note should have in our database. all we have to do is
  // findAndRemove() the note from our database.

  // temporary response to test endpoint -- change later
  res.status(418).send('request received');
});

module.exports = router;
