var db = require('../api_other/db');

exports.getListRoomOfUser = function(email) {
	return db.load(`SELECT r.name 'room_name', tk.Email, m.message, MAX(m.time_sent) 'time_sent_last' ` +
		`FROM chat_room r, chat_user u, taikhoan tk, chat_message m ` +
		`WHERE r.id = u.id_room AND u.id_room = m.id_room AND u.id_user = m.id_user ` +
		`AND tk.MaTK = m.id_user AND tk.Email like '${email}' ` +
		`GROUP BY r.name ` +
		`ORDER BY m.time_sent DESC`);
}

exports.getAllMessageInRoom = function(room_name) {
	return db.load(`SELECT r.name 'room_name', tk.Email, m.message, m.time_sent ` +
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