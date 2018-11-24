var nodemailer = require('nodemailer');
var Imap = require(`imap`),
inspect = require(`util`).inspect;
var fs = require(`fs`), fileStream;
var os = require('os'),
formidable = require('formidable');
var db=require('./db');
var MailParser = require("mailparser").MailParser;
const simpleParser = require('mailparser').simpleParser;

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
      text: info.content_mail,
    };
  }

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.status(400).send({message: 'Có lỗi xảy ra. Hãy xem lại thông tin!'});
    } else {
      console.log('Email sent: ' + info);
      res.status(200).send({message: 'Đã gửi thành công!'});
    }
  });
}

var imap = new Imap({
    user: 'htkh17hcb@gmail.com',
    password: '0908325568',
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
    keepalive: {
        interval: 3000,
        idleInterval: 3000,
        forceNoop: true
    },
    tlsOptions: { rejectUnauthorized: false },
    connTimeout: 10000,  
    authTimeout: 5000,   
    mailbox: "INBOX", // mailbox to monitor 
    searchFilter: ["UNSEEN", "FLAGGED"], // the search filter being used after an IDLE notification has been retrieved 
    markSeen: true, 
    fetchUnreadOnStart: true, 
});

// function mo? hop thu de doc mail
function openInbox(cb) {
    imap.openBox('INBOX', false, cb);
  };

// function dung de duyet cac mail trong hop thu

function fetchMessages2(imap){
  
  imap.search(['UNSEEN'], function(err, results){
    if(err)console.log('you are already up to date');
    else {
      var f = imap.fetch(results,{ bodies:'',struct: true,markSeen: true});
      f.on('message', function(msg, seqno){
       
        var prefix = '(#' + seqno + ') ';
        var parser = new MailParser();
       //"INSERT INTO Mail (`Subject`, `Content`, `Assigner`, `SendTime`) VALUES ('" + mail.subject + "', '" + mail.text.toString() + "', '" + mail.from.value[0].address.toString() + "', '" + mail.date.toString() + "');";
        msg.on('body', function(stream, info){
          simpleParser(stream, (err, mail) => {
            if(mail!=null)
            {
              var cut=mail.text.toString().indexOf("Vào");
              var content=mail.text.toString().replace(/[\r\n]/g, ' ');
              if(cut>0)
              {
                content=mail.text.toString().slice(0,cut).replace(/[\r\n]/g, ' ');
              }
              
              db.write( "INSERT INTO Mail (`Subject`, `Content`, `Email`, `SendTime`) VALUES ('" + mail.subject + "', '" + content + "', '" + mail.from.value[0].address.toString() + "', '" + mail.date.toString() + "')")
            .then(value=>
            {
              console.log("insert susccess!!");
            })
            .catch(err=>{
              console.log("insert error!!"+err);
            });
            console.log(prefix +" tieu de: "+ mail.subject);
            console.log(prefix +" email from: "+ mail.from.value[0].address);
            console.log(prefix +" thoi gian: "+ mail.date);
           
            console.log(prefix +" noi dung: "+content); 
            console.log(prefix +"inReplyTo: "+ mail.inReplyTo);
            console.log(prefix +"messageId: "+ mail.messageId);
            console.log(mail.references);
            console.log(mail.replyTo);
            
            }
           
          });
        });
      })

      f.once('end', function() {
        console.log('Done fetching all messages!');
      });
      
      f.once('error', function(err) {
        console.log('Fetch error: ' + err);
      });
    }
  });
}


exports.receiveMail = function(req,res) {

  imap.once('ready', function() {
    openInbox(function(err, box) {
        if (err) throw err;
        imap.on('mail', function(numNewMsgs){
            console.log(numNewMsgs + " messages has arrived");
            fetchMessages2(imap);
        });
        
    });
  })

  imap.once('error', function(err) {
          console.log(err);
  });
  
  imap.connect();

}

