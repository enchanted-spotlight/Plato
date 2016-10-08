const nodemailer = require('nodemailer');
const Note = require('../models/note');
const User = require('../models/user');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PW
  }
});

const emailController = {
  emailNotification: (req, res) => {
    // look to see if the user they're trying to share with exists
    User.findOne({ email: req.body.email.toUpperCase() }, (err, user) => {
      if (err || user === null) {
        res.status(404).send();
      } else if (user.email === req.body.originEmail.toUpperCase()) {
        // should handle cases where the user tries to share with themselves
        res.status(500).send();
      } else {
        // if the user they want to share with exists, get the note and
        // make a copy, save it under the user's id
        Note.findOne({ _id: req.body.noteId }, (err2, note) => {
          if (err2 || note === null) {
            res.status(404).send();
          } else {
            const newNote = new Note({
              user_id: req.body.email,
              text: note.text,
              plainTextContent: note.plainTextContent,
              title: note.title
            });

            newNote.save((err3) => {
              if (err3) {
                res.status(500).send();
              } else {
                res.status(200).send();
              }
            });
          }
        });
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: req.body.email,
      subject: 'Hey!',
      text: 'Someone wants to share a note with you!\nSign into your Plato account to see the note now!'
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log('...we didn\'t send the message');
        console.log(err);
        res.status(500).send();
      } else {
        console.log('WE SENT THE MESSAGE!!!');
        res.status(200).send();
      }
    });
  }
};

module.exports = emailController;
