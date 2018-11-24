var connect = require('../api_other/db'),
mail = require('../api_other/mail'),
formidable = require('formidable'),
fs = require('fs');

// arg: mailUser = email người gửi, emailReceive = danh sách email người nhận (array), subject = tiêu đề thư gửi, content = nội dung thư cần gửi
exports.sendSupporters = function(arg) {
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields,files) {		
		connect.load(`SELECT Email, PasswordMail, HostSmtpMail, PostSmtpMail FROM AccountCompany WHERE Email = ${arg.mailUser}`)
		.then(users =>{
			if(users.length === 1) {
				var info = {
					email_send: 'htkh17hcb@gmail.com',
					password_email_sent: '0908325568',
					host: 'imap.gmail.com',
					port: 993,
					email_receive: arg.emailReceive,
					subject: arg.subject,
					content_mail: arg.content,
					//attachments: files.filetoupload.path
				};
				mail.sendMail(info,res);
			}
		})
		.catch((error) => res.status(400).send(error));
	});
}

exports.sendMail = function(req,res) {
	var info = {
		user: 'htkh17hcb@gmail.com',
		password: '0908325568',
		host: 'imap.gmail.com',
		port: 993,
		email_receive: req.body.emailReceive,
		subject: req.body.subject,
		content_mail: req.body.content,
	};
	mail.sendMail(info,res);
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