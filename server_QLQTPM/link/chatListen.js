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

wss.on('connection', function(socket) {
	console.log(`${socket.id} ket noi toi`);

	if(typeof socket.m_name == "undefined") {
		socket.emit('check-name');
		console.log(socket.id + "re-check name.");
	}

	// event khi client ngắt kết nối với server socket
	socket.on('disconnect',function() {
		listActing.splice(listActing.indexOf(socket.m_name), 1);
		 console.log(socket.m_name + ' disconnectted ');
		wss.sockets.emit("list-user", listActing);
	});

	// khi client gửi tên hiển thị (hay tên hiển thị,...) cho server 
	socket.on('login', function(arg) {
		// khi phát hiện đã phát hiện trung tên client (có ng khác login thì cho out)
		if(listActing.indexOf(arg)>=0){
			// console.log(arg + " logged in false");
			socket.emit("login-error");
		} else{
			listActing.push(arg);
			socket.m_name = arg;
			socket.emit("login-success");
			
			wss.sockets.emit("list-user", listActing);
			console.log(arg + " logged in true.");
		}
	});

	// khi client muốn ngắt kết nối với server
	socket.on('logout',function() {
		listActing.splice(listActing.indexOf(socket.m_name), 1);
		console.log(socket.m_name + ' logged out');
		wss.sockets.emit("list-user", listActing);
	});

	// khi client gửi tin nhắn cho server 
	socket.on('client-sent', function(arg) {
		if(arg.length == 0) return;

		wss.sockets.in(socket.m_room).emit('server-sent',{name: socket.m_name, message: arg});
		// console.log(`${socket.m_name}: ${arg}`);
	});

	socket.on('add-room', (data) => {
		console.log("Request add room with name "+data);
		console.log(db.createRoom(data));
		socket.join(data);
		socket.m_room = data;

		if(listRoom.indexOf(data) > -1) return;
		else {
			listRoom.push(data);

			wss.sockets.emit('list-room', listRoom);
		}
	});
});

server.listen(2018, () => {
	console.log('server SOCKET started with PORT 2018');
});