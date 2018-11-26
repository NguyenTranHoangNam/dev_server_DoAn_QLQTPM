var db = require('../api_other/db'),
	mail = require('./mail');


exports.create = function(req, res) {
	db.load("select Email, PasswordMail, HostSmtpMail, PortSmtpMail from AccountCompany where Username like 'supportcentermanagement'")
	.then(row => {
		if(row.length == 1){
			var info = {
				email_send: row[0].Email,
				password_email_sent: row[0].PasswordMail,
				host: row[0].HostSmtpMail,
				port: row[0].PortSmtpMail,
				email_receive: req.body.emailRequest,
				subject: req.body.subject,
				content_mail: req.body.content,
			};
			return mail.sendMail(info,res,1);
		}
	})
	.then(mailID => {
		return db.write(`INSERT INTO Ticket (mail_id, subject, content, assignee) VALUES ('${mailID}', '${req.body.subject}', '${req.body.content}', '${req.body.emailRequest}')`);
	})
	.then(ticket => {
		res.status(200).send({message: 'Tạo ticket thành công!'});
	})
	.catch(err => {
		console.log(err);
      	res.status(400).send({message: 'Có lỗi xảy ra khi lấy thông tin email gửi đi!'});
	});
}

exports.getTicket = function(req,res) {
	
}

exports.responde = function(req,res) {
db.load(`SELECT Email, PasswordMail, HostSmtpMail, PortSmtpMail, Ticket.mail_id mailId FROM AccountCompany, Ticket WHERE Ticket.id = ${req.body.idTicket} AND AccountCompany.Username like 'supportcentermanagement'`)
	.then(row => {
		if(row.length == 1){
			var info = {
				email_send: row[0].Email,
				password_email_sent: row[0].PasswordMail,
				host: row[0].HostSmtpMail,
				port: row[0].PortSmtpMail,
				email_receive: req.body.emailRequest,
				subject: 'Re: ' + req.body.subject,
				content_mail: req.body.content,
				message_id: row[0].mailId
			};
			return mail.sendMail(info,res,1);
		}
	})
	.then(mailID => {
		return db.write(`INSERT INTO Mail (Subject, Content, Email, SendTime,InReplyTo) VALUES ('${'Re: ' + req.body.subject}', '${req.body.content}', '${mail.from.value[0].address.toString()}', '${formatDate(mail.date)}','${(Array.isArray(mail.references) ? mail.references[0] : mail.references)}')`);
	})
	.then(ticket => {
		res.status(200).send({message: 'Tạo ticket thành công!'});
	})
	.catch(err => {
		console.log(err);
		res.status(400).send({message: 'Phản hồi không thành công'});
	});
}