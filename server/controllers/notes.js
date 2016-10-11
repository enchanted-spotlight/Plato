const Note = require('./../models/note');

const notesController = {
  saveNote(req, res) {
    const update = {
      user_id: req.body.user_id,
      text: req.body.text,
      // where is the title going to be?
      title: req.body.title,
      plainTextContent: req.body.plainText
    };
    Note.findOneAndUpdate({
      user_id: req.body.user_id,
      title: req.body.title
    }, update, { upsert: true }, (err, data) => {
      if (err) {
        res.status(500).end();
      } else {
        res.status(200).send(data);
      }
    });
  },
  retrieveAllUserNotes(req, res) {
    Note.find({ user_id: req.params.user }, (err, data) => {
      if (err) {
        res.status(500).end();
      } else if (data.length === 0) {
        res.status(404).end();
      } else {
        res.status(200).send(data);
      }
    });
  },
  retrieveCertainUserNotes(req, res) {
    const userInput = req.body.searchInput;
    Note.find({ user_id: req.params.user, $text: { $search: userInput } }, (err, data) => {
      if (err) {
        res.status(500).end();
      } else {
        res.status(200).send(data);
      }
    });
  },
  deleteUserNote(req, res) {
    Note.findOneAndRemove({ _id: req.params.id }, (err, doc, result) => {
      if (err) {
        res.status(500).end();
      } else {
        res.status(200).end();
      }
    });
  }
};

module.exports = notesController;
