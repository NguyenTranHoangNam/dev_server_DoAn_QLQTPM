var nodemailer = require('nodemailer');
var Imap = require(`imap`),
inspect = require(`util`).inspect;
var fs = require(`fs`), fileStream;

var os = require('os');

/*
api to send mail
input: info = {
  // ex: gmail
  host: "smtp.gmail.com",
  port: 587,
  email_send: "user_name@do.main"
  password_email_sent: "password_email_of_email_send",
  email_receive: "user_name@do.main",
  subject: "title_of_email",
  content_mail: "content_of_email"
  attachments: path of file
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

  if(info.attachments){
    var mailOptions = {
      from: info.email_send,
      to: info.email_receive,
      subject: info.subject,
      text: info.content_mail,
      attachments: [
      {
        path: info.attachments
      }
      ]
    }; 
  } else {
    var mailOptions = {
      from: info.email_send,
      to: info.email_receive,
      subject: info.subject,
      text: info.content_mail
    };
  }

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


exports.receiveMail = function(res) {
/*
  //  The mailman object is used for receiving (POP3)
  //  and sending (SMTP) email.
  var mailman = new chilkat.MailMan();

  //  Any string argument automatically begins the 30-day trial.
  var success = mailman.UnlockComponent("30-day trial");
  if (success !== true) {
    console.log("Component unlock failed");
    return;
  }

  //  Set the GMail account POP3 properties.
  mailman.MailHost = "pop.gmail.com";
  mailman.PopUsername = "myLogin";
  mailman.PopPassword = "myPassword";
  mailman.PopSsl = true;
  mailman.MailPort = 995;

  // bundle: EmailBundle
  var bundle;
  //  Read mail headers and one line of the body.
  //  To get the full emails, call CopyMail instead (no arguments)
  bundle = mailman.GetAllHeaders(1);

  if (bundle == null ) {
    console.log(mailman.LastErrorText);
    return;
  }

  var i;
  // email: Email
  var email;
  for (i = 0; i <= bundle.MessageCount - 1; i++) {
    email = bundle.GetEmail(i);

    //  Display the From email address and the subject.
    console.log("From: " + email.From);
    console.log("Subject: " + email.Subject);
    console.log("Object: "+JSON.stringify(email));
  }
/*var MailListener = require("mail-listener2");
  var mailListener = new MailListener({
    username: "coldboy6596@gmail.com",
    password: "qetuoafj;ZB.",
    host: "imap.gmail.com",
    port: 993, // imap port
    tls: true,
    fetchUnreadOnStart: true //,
  });

  mailListener.on("server:connected", function(){
    console.log("imapConnected");
  });

  mailListener.on("server:disconnected", function(){
    console.log("imapDisconnected");
  });
  (function () {
    var count = 0;

    mailListener.on("mail", function(mail, seqno, attributes) {
      var mailuid = attributes.uid,
      toMailbox = '[Gmail]/All Mail',
      i = ++count;

      if (i > 20) {
      mailListener.stop(); // start listening
      return;
    }

    console.log('email parsed', { 
      i: i, 
      subject: mail.subject, 
      seqno: seqno, 
      uid: attributes.uid,
      attributes: attributes 
    });

    console.log('attempting to mark msg read/seen');
    mailListener.imap.addFlags(mailuid, '\\Seen', function (err) {
      if (err) {
        console.log('error marking message read/SEEN');
        return;
      }

      console.log('moving ' + (seqno || '?') + ' to ' + toMailbox);
      mailListener.imap.move(mailuid, toMailbox, function (err) {
        if (err) {
          console.log('error moving message');
          return;
        }
        console.log('moved ' + (seqno || '?'), mail.subject);
      });
    });
  });
  })();
  */
/*
  var imap = new Imap({
    user: `coldboy6596@gmail.com`,
    password: `qetuoafj;ZB.`,
    host: `imap.gmail.com`,
    port: 993,
    tls: true
  });
  function openInbox(cb) {
    imap.openBox('INBOX', true, cb);
  }

  imap.once('ready', function() {
    openInbox(function(err, box) {
      if (err) throw err;
      imap.search([ 'UNSEEN', ['SINCE', 'May 20, 2010'] ], function(err, results) {
        if (err) throw err;
        var f = imap.fetch(results, { bodies: '' });
        f.on('message', function(msg, seqno) {
          console.log('Message #%d', seqno);
          var prefix = '(#' + seqno + ') ';
          msg.on('body', function(stream, info) {
            console.log(prefix + 'Body');
            stream.pipe(fs.createWriteStream('msg-' + seqno + '-body.html'));
          });
          msg.once('attributes', function(attrs) {
            console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
          });
          msg.once('end', function() {
            console.log(prefix + 'Finished');
          });
        });
        f.once('error', function(err) {
          console.log('Fetch error: ' + err);
        });
        f.once('end', function() {
          console.log('Done fetching all messages!');
          imap.end();
        });
      });
    });
  });

  imap.once('error', function(err) {
    console.log(err);
  });

  imap.once('end', function() {
    console.log('Connection ended');
  });

  imap.connect();
  */
  res.status(200).send({message: `Đã nhận tất cả email`})
}