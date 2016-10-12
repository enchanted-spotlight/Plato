const Session = require('./../models/session');

const sessionController = {
  saveSession(req, res) {
    console.log('saving session in controller: ', req.body);
    const update = {
      user_id: req.body.user_id,
      title: req.body.title,
      notesText: req.body.notes.text,
      notesPlainText: req.body.notes.plainText,
      transcriptText: req.body.transcript.text,
      transcriptPlainText: req.body.transcript.plainText
    };
    Session.findOneAndUpdate({
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
  retrieveAllUserSessions(req, res) {
    Session.find({ user_id: req.params.user }, (err, data) => {
      if (err) {
        res.status(500).end();
      } else if (data.length === 0) {
        res.status(404).end();
      } else {
        res.status(200).send(data);
      }
    });
  },
  retrieveCertainUserSessions(req, res) {
    const userInput = req.body.searchInput;
    console.log(req.body.searchInput);
    Session.find({ user_id: req.params.user, $text: { $search: userInput } }, (err, data) => {
      if (err) {
        res.status(500).end();
      } else {
        console.log(data);
        res.status(200).send(data);
      }
    });
  },
  deleteUserSession(req, res) {
    Session.findOneAndRemove({ _id: req.params.id }, (err, doc, result) => {
      if (err) {
        res.status(500).end();
      } else {
        res.status(200).end();
      }
    });
  }
};

module.exports = sessionController;
