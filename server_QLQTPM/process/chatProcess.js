var connect = require('../api_other/db');
//var fs = require('fs');
const websocket = require('socket.io');
const http = require('http');
const express = require('express');
const app = express();

const server = http.Server(app);
wss = require("socket.io")(server);
//app.on('upgrade', wss.handleUpgrade);

wss.on('connection', function(socket) {
	console.log(`${socket.id} ket noi toi`);

	socket.on('disconnect',function() {
		console.log(`${socket.id} ngat ket noi`);
	});

	socket.on('client-sent', function(arg) {
		var data = JSON.parse(arg);
		if(data.message.length != 0)
			socket.broadcast.emit('server-sent',JSON.stringify(arg));

		console.log(`${socket.id}: ${JSON.stringify(arg)}`);
	});
});

server.listen(2018, () => {
    console.log('server started on PORT 2018');
});
/*var WebSocket = require('ws');

var SOCKET_PORT = process.env.SOCKET_PORT || 2018;
var socketServer;

if (!socketServer) {
	socketServer = new WebSocket.Server({
		port: SOCKET_PORT
	});

	socketServer.on('connection', clientSocket => {
		console.log('1 new client connected');

		clientSocket.on('message', msg =>{
			console.log(`receive: ${msg}`);
		})
	});

	console.log('WS runinit on port '+SOCKET_PORT);
}

var broadcastAll = msg => {
	for(var c of socketServer.clients) {
		if (c.readyState === WebSocket.OPEN) {
			c.send(msg);
		}
	}
}

module.exposts = {socketServer}

/*exports.getAllConversation = function(req,res) {
	connect.load(`select m1.TopicID, case when m1.SenderID like '${req.params.idPeople}' then m1.SenderID else m1.ReceiverID end PartnerID, m1.SendTime, m1.Content, m1.TypeID `+
				`from Messages m1, Messages m2 `+
				`where m1.SenderID = m2.SendID `+
					`and m1.ReceiverID = m2.ReceiverID `+
					`and m1.SendTime < m2.SendTime `+
					`and (m1.SenderID like '${req.params.idPeople}' `+
						`or m1.ReceiverID like '${req.params.idPeople}') `+
				`order by m1.SendTime desc`)
	.then(messages_with_parter =>{
		res.status(200).send(JSON.stringify(messages_with_parter));
	})
	.catch((error) => {
		console.log(error);
		res.status(400).send(error);
	});
}

exports.getCompany = function(req,res) {
	connect.load(`select  * from CompanyInfo where Id = '${req.params.id}'`)
	.then(company =>{
		//console.log(company);
		if(company.length > 0){
			res.status(204).send(JSON.stringify(company));
		} else {
			res.status(200).send({ message: 'Dữ liệu không có'});
		}
	})
	.catch((error) =>{
		console.log(error);
		res.status(400).send(error);
	})
}

exports.test = function(req,res) {
	console.log(".....");
};

exports.addMessage = function(req,res) {
	console.log('gone to  this');
	console.log(req.body);
	console.log(req.files);
	if(req.files){
		console.log(req.files);
		res.status(200).send({message: 'Đã nhận file thành công.'});
	}/*
	connect.write(`INSERT INTO Messages(TopicID, SenderID, ReceiverID, SendTime, Content, TypeID) VALUES ([value-1],[value-2],[value-3],[value-4],[value-5],[value-6])`)
	.then(() => {
		res.status(200).send({message: 'Thêm công ty thành công.'});
	})
	.catch((error) => res.status(400).send(error));
	res.status(400).send({message: 'Không nhận file.'});
}

exports.delete = function(req,res) {
	connect.write(`DELETE FROM CompanyInfo WHERE Id = ${req.params.id}`)
	.then(() => {
		res.status(200).send({message: 'Thêm công ty thành công.'});
	})
	.catch((error) => res.status(400).send(error));
}*/