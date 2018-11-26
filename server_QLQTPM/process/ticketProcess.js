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
// idTicket
exports.getListTicket = function(req,res) {
	db.load(`SELECT t.id, t.subject, t.content, t.assignee s.StatusName FROM Ticket t LEFT JOIN Status s ON t.status = s.StatusID`)
	.then(row => {
		res.status(200).send(row);
	})
	.catch(err => {
		console.log(err);
		res.status(400).send({message: 'Đổi trạng thái thất bại!'});
	});
}

exports.getOneTicket = function(req,res) {
	
}

// ticketSubject (ticket), emailRequest, contentResponse (response of supporter), ticketID, userResponse
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
				subject: 'Re: ' + req.body.ticketSubject,
				content_mail: req.body.contentResponse,
				reply_message_id: row[0].mailId
			};
			return mail.sendMail(info,res,1);
		}
	})
	.then(mailID => {
		db.write(`INSERT INTO TicketResponse (ticket_id, user_response, mail_id, content) VALUES 
			('${req.body.ticketID}', '${req.body.userResponse}', '${mailID}', '${req.body.contentResponse}'`);
		db.write(`UPDATE Ticket SET status = '3' WHERE id = '${row[0].id}'`);
		return true;
	})
	.then(ticket => {
		res.status(200).send({message: 'Phản hồi thành công!'});
	})
	.catch(err => {
		console.log(err);
		res.status(400).send({message: 'Phản hồi thất bại'});
	});
}

exports.changeStatu = function(req,res) {
	db.write(`UPDATE Ticket SET status = '${req.body.statusID}' WHERE id = '${ticketID}'`)
	.then(() => {
		res.status(200).send({message: 'Đổi trạng thái thành công!'});
	})
	.catch(err => {
		console.log(err);
		res.status(400).send({message: 'Đổi trạng thái thất bại!'});
	});
}