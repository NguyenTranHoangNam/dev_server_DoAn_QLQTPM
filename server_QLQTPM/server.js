
var http = require('http');
var bodyParser = require("body-parser");
var num_port = 1742;
var port = process.env.port || num_port;


var server = require("express");
var user = require("./fun/userController");


server.route('/login')
	.post(user.login);

server.route('/register')
	.post(user.register);

server.route('/logout')
	.get()
	.post()
	.put()
	.delete();


server.listen(port);
console.log("Link server: localhost:" + process.env.port + " and localhost:" + num_port);

// user.showAll();
console.log("Running server!!!");


/*http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' }); //'text/html' });
    res.end(JSON.stringify());
    console.log(req.url.split("?")[0]);
});*/