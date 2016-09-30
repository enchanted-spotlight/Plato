const express = require('express');

const router = new express.Router();

const notes = require('../controllers/notes');

router.post('/save-note', notes.saveNote);
router.get('/:user', notes.retrieveAllUserNotes);
router.delete('/delete-note/:id', notes.deleteUserNote);

module.exports = router;
