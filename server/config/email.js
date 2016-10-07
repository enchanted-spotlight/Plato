const nodemailer = require('nodemailer');

const emailController = {
  emailNotification: (req, res, emailAddress) => {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PW
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: 'emailAddress',
      subject: 'Hey!',
      text: 'Someone wants to share a note with you!'
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
