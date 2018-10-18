var nodemailer = require('nodemailer');


/*

*/
exports.sendMail = function(info) {
  var transporter = nodemailer.createTransport({
    host: info.host,
    port: info.port,
    auth: {
      user: info.email_send,
      pass: info.password_email_sent
    }
  });

  var mailOptions = {
    from: info.email_send,
    to: info.email_receive,
    subject: info.subject,
    text: info.content_mail
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      return 400;
    } else {
      console.log('Email sent: ' + info.response);
      return 500;
    }
  });
}