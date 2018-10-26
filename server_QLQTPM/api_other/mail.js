var nodemailer = require('nodemailer');


/*
api to send mail
input: info = {
  // ex: gmail
  host: "smtp.gmail.com",
  port: 587,
  email_send: "user_name@do.main"
  password: "password_email_of_email_send",
  email_receive: "user_name@do.main",
  subject: "title_of_email",
  text: "content_of_email"
}
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