var db = require('../process/chatProcess');
const websocket = require('socket.io');
const http = require('http');
const express = require('express');
const app = express();

const server = http.Server(app);
wss = require("socket.io")(server);
//app.on('upgrade', wss.handleUpgrade);

var listActing = [];
var listRoom = [];
var listClient = [];
wss.on('connection', function(socket) {
	console.log(`${socket.m_name} ket noi toi`);

	if(typeof socket.m_name == "undefined") {
		socket.emit('check-name');
		console.log(socket.m_name + " re-check name.");
	}

	// event khi client ngắt kết nối với server socket
	socket.on('disconnect',function() {
		listActing.splice(listActing.indexOf(socket.m_name), listActing.indexOf(socket.m_name) < 0 ? 0 : 1);
		listClient.splice(listClient.indexOf(socket), listClient.indexOf(socket) < 0 ? 0 : 1);
		console.log('num save name: '+listActing.length);
		console.log('num socket: '+listClient.length);
		console.log(socket.m_name + ' disconnectted ');
		wss.sockets.emit("list-user", listActing);
	});

	// khi client gửi tên hiển thị (hay tên hiển thị,...) cho server 
	socket.on('login', function(email) {
		console.log(email+" logging in");
		// khi phát hiện đã phát hiện trùng tên client (có ng khác login thì cho out)
		if(listActing.indexOf(email)>=0){
			// console.log(email + " logged in false");
			socket.emit("login-error");
		} else{
			socket.m_name = email;
			listActing.push(email);
			listClient.push(socket);
			socket.emit("login-success");
			wss.sockets.emit("list-user", listActing);
			var me = require('../process/chatProcess');
			db.getListRoomOfUser(email)
			.then(rows => {
				if(rows.length!=undefined){
					for (var i = rows.length - 1; i >= 0; i--) {
						rows[i].room_name = rows[i].room_name.replace(socket.m_name + ', ','').replace(', ' + socket.m_name,'');
						socket.join(rows[i].room_id);
					}
					console.log(rows);
					socket.emit('list-room', rows);
				}
				//console.log(JSON.stringify(rows));
			})
			.catch(error => {
				console.log(error);
			});
			
			console.log(email + " logged in true.");
		}
		console.log(listClient.length);
	});

	// khi client muốn ngắt kết nối với server
	socket.on('logout',function() {
		listActing.splice(listActing.indexOf(socket.m_name), 1);
		console.log(socket.m_name + ' logged out');
		wss.sockets.emit("list-user", listActing);
	});

	// khi client gửi tin nhắn cho server gồm các thông tin id_room, message
	socket.on('client-sent', function(infoMessage) {
		console.log("receive messenger: "+infoMessage);
		if(infoMessage.message == "") return;
		db.checkUserInRoom(infoMessage.id_room, socket.m_name)
		.then(row => {
			if(row.length ==1){
				wss.sockets.in(socket.m_room).emit('server-sent',{name: socket.m_name, 'message': infoMessage.message});
				db.saveMessage(infoMessage.id_room, socket.m_name, infoMessage.message)
				.then(status => { })
				.catch(error => console.log(error));
			} 
		});
		// console.log(`${socket.m_name}: ${message}`);
	});

	// khi gửi yêu cầu tạo room chat thì gửi trước danh sách Array người cùng chat
	socket.on('add-room', (listUser) => {
		console.log("Request add room with name "+listUser);
		let list = JSON.parse(lisUser);
		db.createRoom(list)
		.then(value => {
			console.log("added room with key: "+value.insertId);
			socket.join(value.insertId)

			for (var j = list.length - 1; j >= 0; j--) {
				db.addUserToRoom(value.insertId, list[j])
				.catch(error => {
					console.log("Error when add user to room");
				});

				for (var i = 0; i < list.length; i++) {
					if(listClient[i].m_name == list[j])
						listClient[i].join(value.insertId);
				}
			}
		})
		.catch(error => {
			console.log(error);
		});

		socket.m_room = data;

		if(listRoom.indexOf(data) > -1) return;
		else {
			listRoom.push(data);

			wss.sockets.emit('list-room', listRoom);
		}
	});

	socket.on("get_history_message", (room_id) => {
		socket.m_room = room_id;
		db.updateDateSeenRoomOfUser(room_id, socket.m_name);
		db.getAllMessageInRoom(room_id)
		.then(rows => {
			socket.emit("server-get-message-in-room", rows);
		})
		.catch(err => {
			console.log(err);
		})
	});

	socket.on("get_history_with", (email_partner) => {
		db.getRoomWithPartner(socket.m_name, email_partner)
		.then(row =>{
			console.log(JSON.stringify(row));
			if(row.length == 1){
				socket.m_room = row[0].id_room;
				db.updateDateSeenRoomOfUser(socket.m_room, socket.m_name);
				socket.emit("server-get-message-in-room", JSON.stringify(db.getAllMessageInRoom(socket.m_room)));
			}else if(row.length == 0){
				db.createRoom(socket.m_name+", "+email_partner)
				.then(value => {
					console.log("added room with key: "+value.insertId);
					socket.join(value.insertId)

					db.addUserToRoom(value.insertId, email_partner)
					.then(val => {
						console.log(`Add user ${email_partner} to room ${value.insertId} SUCCESS`);
					})
					.catch(error => {
						console.log(`Error when add user ${email_partner} to room ${value.insertId}`);
					});

					db.addUserToRoom(value.insertId, socket.m_name)
					.then(val => {
						console.log(`Add user ${socket.m_name} to room ${value.insertId} SUCCESS`);
					})
					.catch(error => {
						console.log(`Error when add user ${socket.m_name} to room ${value.insertId}`);
					});
					db.saveMessage(value.insertId,socket.m_name,socket.m_name+" create this room")
					.catch(error => {
						console.log(`Error when add user ${socket.m_name} to room ${value.insertId}`);
					});
					for (var i = 0; i < listClient.length; i++) {
						if(listClient[i].m_name == email_partner)
							listClient[i].join(value.insertId);
					}
				})
				.catch(error => {
					console.log(error);
				});
				db.getListRoomOfUser(email_partner)
				.then(rows => {
					var list = JSON.stringify(rows)
					if( list.length!=undefined){
						for (var i = list.length - 1; i >= 0; i--) {
							socket.join(list[i].room_id);
						}
						socket.emit('list-room', list);
					}

				})
				.catch(error => {
					console.log(error);
				});
			}
		})
		.catch(error => {
			console.log(error);
		});
	});

	socket.on('change-name-room', (room_name_new) => {
		db.changeRoomName(socket.m_room, room_name_new);

		db.write()

		for (var i = 0; i < listClient.length; i++) {
			db.getListRoomOfUser(listClient[i].m_name)
			.then(rows => {
				var list = JSON.stringify(rows)
				//console.log(Object.keys(list).length + list);
				if( list.length!=undefined){
					listClient[i].emit('list-room', list);
				}
				//console.log(JSON.stringify(rows));
			})
			.catch(error => {
				console.log(error);
			});
		}
	});
});

server.listen(2018, () => {
	console.log('server SOCKET started with PORT 2018');
});