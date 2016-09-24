const express = require('express');
const db = require('../../db/db');
const Note = require('../../db/models/note');
const User = require('../../db/models/user');

const router = express.Router();

router.post('/save-note', (req, res) => {
  // user is trying to save their note, so we need their
  // user_id that corresponds to the _id they have in our db's user collection
  // we also need to JSON.stringify their notes and the note's title

  // this is the query that we're going to use to upsert the doc
  const update = {
    user_id: req.body.user_id,
    notes: req.body.notes,
    // where is the title going to be?
    title: req.body.title
  };

  // update this query later
  Note.findOneAndUpdate({
    user_id: req.body.user_id,
    title: req.body.title
  }, update, { upsert: true }, (err, data) => {
    if (err) {
      // error should mean that there was an error updating or inserting
      res.status(500).end();
    } else {
      res.status(200).end();
    }
  });
});

router.get('/:user', (req, res) => {
  // user is trying to get all their notes,
  // need to return all notes where user_id equals req.user.id
  Note.find({ user_id: req.params.user }, (err, data) => {
    if (err) {
      res.status(500).end();
    } else if (data.length === 0) {
      res.status(404).end();
    } else {
      res.status(200).send(data);
    }
  });
});

router.delete('/delete-note/:id', (req, res) => {
  // user is trying to delete a specific note via the mongo _id
  // that the note should have in our database. all we have to do is
  // findAndRemove() the note from our database.
  Note.findOneAndRemove({ _id: req.params.id }, (err, doc, result) => {
    if (err) {
      res.status(500).end();
    } else {
      res.status(200).end();
    }
  });
});

module.exports = router;
