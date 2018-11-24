var connect = require('../api_other/db'),
mail = require('../api_other/mail'),
fromidable = require('formidable'),
fs = require('fs');

// arg: mailUser = email người gửi, emailReceive = danh sách email người nhận (array), subject = tiêu đề thư gửi, content = nội dung thư cần gửi
exports.sendSupporters = function(arg) {
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields,files) {		
		connect.load(`SELECT Email, PasswordMail, HostSmtpMail, PostSmtpMail FROM AccountCompany WHERE Email = ${arg.mailUser}`)
		.then(users =>{
			if(users.length === 1) {
				var info = {
					host: users[0].HostSmtpMail,
					port: users[0].PostSmtpMail,
					email_send: users[0].Email,
					password_email_sent: users[0].PasswordMail,
					email_receive: arg.emailReceive,
					subject: arg.subject,
					content_mail: arg.content,
					//attachments: files.filetoupload.path
				};
				mail.sendMail(info);
			}
		})
		.catch((error) => res.status(400).send(error));
	});
}

exports.sendMail = function(req,res) {
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields,files) {		
		connect.load(`SELECT Email, PasswordMail, HostSmtpMail, PostSmtpMail FROM AccountCompany WHERE Email = ${req.body.mailUser}`)
		.then(users =>{
			if(users.length === 1) {
				var info = {
					host: users[0].HostSmtpMail,
					port: users[0].PostSmtpMail,
					email_send: users[0].Email,
					password_email_sent: users[0].PasswordMail,
					email_receive: req.body.emailReceive,
					subject: req.body.subject,
					content_mail: req.body.content,
					//attachments: files.filetoupload.path
				};
				mail.sendMail(info);
			}
		})
		.catch((error) => res.status(400).send(error));
	});
}

exports.getemailReceive=function(req,res) {
	 connect.write("SELECT * FROM Mail")
            .then(value=>
            {
            	res.json(value);
              console.log("insert susccess!!");
            })
            .catch(err=>{
            	res.status(400).send(err);
              console.log("insert error!!"+err);
            });
}
exports.emailReceive = function(req,res) {
	mail.receiveMail(req,res);
}