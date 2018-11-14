var db = require('../api_other/db');
var user = require('./userProcess');

exports.getListRoomOfUser = function(email) {
	return db.load(`SELECT r.id 'room_id', r.name 'room_name', tk.Email, m.message, MAX(m.time_sent) 'time_sent_last', if(MAX(m.time_sent)<time_seen, 'true', 'false') 'seen_all' ` +
		`FROM chat_room r, chat_user u, taikhoan tk, chat_message m ` +
		`WHERE r.id = u.id_room AND u.id_room = m.id_room AND u.id_user = m.id_user ` +
		`AND tk.MaTK = m.id_user AND tk.Email like '${email}' ` +
		`GROUP BY r.name ` +
		`ORDER BY m.time_sent DESC`);
}

exports.getAllMessageInRoom = function(room_name) {
	return db.load(`SELECT r.id 'room_id', r.name 'room_name', tk.Email, m.message, m.time_sent ` +
		`FROM chat_room r, chat_user u, taikhoan tk, chat_message m ` +
		`WHERE r.id = u.id_room AND u.id_room = m.id_room AND u.id_user = m.id_user ` +
		`AND tk.MaTK = m.id_user AND r.name like '${room_name}' ` +
		`GROUP BY r.name ` +
		`ORDER BY m.time_sent DESC`);
}

exports.saveMessage = function(room_id, email, content_message) {
	return db.write(`INSERT INTO chat_message(id_room, id_user, message) VALUES ` + 
		`('${room_id}', ` +
		`'${user.convertEmailToId(email)}', ` +
		`'${content_message}');`);
}

exports.createRoom = function(room_name) {
	return db.write(`INSERT INTO chat_room(name) VALUES ('${room_name}')`);
}

exports.getListUserInRoomNotExistUserCurrent = function(room_id, email_current) {
	return db.load(`SELECT Email FROM taikhoan tk WHERE MaTK IN (SELECT id_user FROM chat_user WHERE id_room = '${room_id}') AND Email != '${email_current}';`);
}

exports.getNameRoomWhenRoomNullName = function(room_id, email_current) {
	var str ="";
	this.getListUserInRoomNotExistUserCurrent(room_id, email_current)
	.then(rows => {
		var list = JSON.stringify(rows);
		var len = list.length;
		for (var i = 0; i < len; i++) {
			str = str + list[i].Email;

			if(i < len -1) str = str + ", ";
		}

		return str;
	})
	.catch(error => {
		console.log(error);
		return str;
	});
}

exports.updateDateSeenRoomOfUser = function(id_room, email_current) {
	return db.write(`UPDATE chat_user SET time_seen = CURRENT_TIMESTAMP WHERE id_room = '${in_room}' AND id_user = '${user.convertEmailToId(email_current)}'`);
}

exports.addUserToRoom = function(room_id, username) {
	return db.write(`INSERT INTO chat_user(id_room, id_user, time_seen) VALUES ('${room_id}','${user.convertEmailToId(username)}', CURRENT_TIMESTAMP);`);
}

exports.checkUserInRoom = function(room_id, email) {
	return db.load(`SELECT * FROM chat_user WHERE id_room = '${room_id}' AND id_user = '${user.convertEmailToId(email)}';)`);
}

exports.getRoomWithPartner = function(email_current, partner) {
	return db.load(`SELECT chat_user.id_room, COUNT(chat_user.id_user) ` +
		`FROM chat_user `+
		`WHERE chat_user.id_room IN (SELECT c1.id_room `+
									`FROM chat_user c1 `+
									`WHERE c1.id_user = '${user.convertEmailToId(email_current)}') `+
		`AND chat_user.id_room IN (SELECT c1.id_room `+
									`FROM chat_user c1 `+
									`WHERE c1.id_user = '${user.convertEmailToId(email_current)}') `+
		`GROUP BY chat_user.id_room `+
		`HAVING COUNT(chat_user.id_user) = 2;`);
}

// hàm tạm trong thời gian ngằn
/*exports.addUser = function(email_name) {
	return db.write(`INSERT INTO tk(Email) VALUES ('${email_name}');`);
}
exports.convertEmailToId = function(email) {
	// body...
}*/