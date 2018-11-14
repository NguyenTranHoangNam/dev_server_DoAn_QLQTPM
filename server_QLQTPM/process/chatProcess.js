var db = require('../api_other/db');

exports.getListRoomOfUser = function(email) {
	return db.load(`SELECT r.id 'room_id' r.name 'room_name', tk.Email, m.message, MAX(m.time_sent) 'time_sent_last', if(MAX(m.time_sent)<time_seen, 'true', 'false') 'seen_all' ` +
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

exports.saveMessage = function(room_name, email, content_message) {
	return db.write(`INSERT INTO chat_message(id_room, id_user, message) VALUES ` + 
		`((SELECT id FROM chat_room WHERE name LIKE '${room_name}'), ` +
		`(SELECT MaTK FROM taikhoan WHERE Email LIKE '${email}'), ` +
		`'${content_message}');`);
}

exports.createRoom = function(room_name) {
	return db.write(`INSERT INTO chat_room(name) VALUES ('${room_name}')`);
}

exports.getListUserInRoomNotExistUserCurrent = function(room_id, email_current) {
	return db.load(`SELECT Email FROM taikhoan WHERE MaTK IN (SELECT id_user FROM chat_user WHERE Email != '${email_current}' AND id_room = '${room_id}' AND E)`);
}

exports.getNameRoomWhenRoomNullName = function(room_id, email_current) {
	var str ="";
	this.getListUserInRoomNotExistUserCurrent(room_id, email_current)
	.then(rows => {
		var list = JSON.stringify(rows);
		var len = list.length();
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
	return db.write(`UPDATE chat_user SET time_seen = CURRENT_TIMESTAMP WHERE id_room = '${in_room}' AND id_user IN (SELECT MaTK FROM taikhoan WHERE Email LIKE '${email_current}')`);
}