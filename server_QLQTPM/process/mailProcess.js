var connect = require('../api_other/db'),
mail = require('../api_other/mail'),
fromidable = require('formidablle'),
fs = require('fs');

exports.sentMail = function(req,res) {
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields,files) {		
		connect.load(`SELECT Email, PasswordMail, HostSmtpMail, PostSmtpMail FROM AccountCompany WHERE ComID = ${req.body.ComID}`)
		.then(users =>{
			if(users.length === 1) {
				var info = {
					host: users.HostSmtpMail,
					port: users.PostSmtpMail,
					email_send: users.Email,
					password_email_sent: users.PasswordMail,
					email_receive: req.body.emailReceive,
					subject: req.body.subject,
					content_mail: req.body.contend,
					attachments: files.filetoupload.path
				};
				mail.sendMail(info);
			}
		})
		.catch((error) => res.status(400).send(error));
	})

	mail.sendMail()
}