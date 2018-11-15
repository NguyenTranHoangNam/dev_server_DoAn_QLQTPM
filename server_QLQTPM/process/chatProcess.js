var db = require('../api_other/db');
var check = require('validator');

exports.isEmail = function(email) {
	return check.isEmail(email);
}

exports.getListRoomOfUser = function(user) {
	return db.load(`SELECT r.id 'room_id', r.name 'room_name', m.account, m.message, MAX(m.time_send) 'time_sent_last', if(MAX(m.time_send)<u.time_seen, 'true', 'false') 'seen_all'
		FROM chat_room r, chat_user u, chat_message m
		WHERE r.id = u.room_id AND u.room_id = m.room_id AND u.account = m.account
        AND m.account like '${user}'
		GROUP BY r.name
		ORDER BY m.time_send DESC`);
}

exports.getAllMessageInRoom = function(room_name) {
	return db.load(`SELECT r.id 'room_id', r.name 'room_name', u.account, m.message, m.time_send 
		FROM chat_room r, chat_user u, chat_message m 
		WHERE r.id = u.room_id AND u.room_id = m.room_id AND u.account = m.account 
		AND r.name like '${room_name}' 
		GROUP BY r.name 
		ORDER BY m.time_send DESC`);
}

exports.saveMessage = function(room_id, user, content_message) {
	return db.write(`INSERT INTO chat_message(room_id, account, message) VALUES ('${room_id}', '${user}', '${content_message}');`);
}

exports.createRoom = function(room_name) {
	return db.write(`INSERT INTO chat_room(name) VALUES ('${room_name}')`);
}

exports.changeRoomName = function(room_id, room_name_new) {
	return db.write(`UPDATE chat_room SET name = '${room_name_new}' WHERE id = '${room_id}';`);
}

exports.getListUserInRoomNotExistUserCurrent = function(room_id, user_current) {
	return db.load(`SELECT account 
					FROM chat_user 
					WHERE room_id = '${room_id}'
					AND account != '${user_current}';`);
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

exports.updateDateSeenRoomOfUser = function(id_room, user_current) {
	return db.write(`UPDATE chat_user 
					SET time_seen = CURRENT_TIMESTAMP 
					WHERE room_id = '${in_room}' 
						AND account = '${user_current}'`);
}

exports.addUserToRoom = function(room_id, user) {
	return db.write(`INSERT INTO chat_user(room_id, account, time_seen) VALUES ('${room_id}','${user}', CURRENT_TIMESTAMP);`);
}

exports.checkUserInRoom = function(room_id, user) {
	return db.load(`SELECT * FROM chat_user 
					WHERE room_id = '${room_id}' 
					AND account = '${user}';`);
}

exports.getRoomWithPartner = function(user_current, partner) {
	return db.load(`SELECT chat_user.room_id, COUNT(chat_user.account) 
					FROM chat_user 
					WHERE chat_user.room_id IN (SELECT c1.room_id 
												FROM chat_user c1 
												WHERE c1.account = '${user_current}') 
					AND chat_user.room_id IN (SELECT c1.room_id 
												FROM chat_user c1 
												WHERE c1.account = '${partner}') 
					GROUP BY chat_user.room_id
					HAVING COUNT(chat_user.account) = 2;`);
}

// hàm tạm trong thời gian ngằn
/*exports.addUser = function(email_name) {
	return db.write(`INSERT INTO tk(Email) VALUES ('${email_name}');`);
}
exports.convertEmailToId = function(email) {
	// body...
}*/