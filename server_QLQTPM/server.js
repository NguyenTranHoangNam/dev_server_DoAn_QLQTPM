
var express = require('express');
var session = require('express-session')
var app = express();
var router = express.Router();

var bodyparser = require('body-parser');

var num_port = 1742;
var port = process.env.port || num_port;



var user = require('./fun/userController');

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(session({secret: 'QLPM'}));

app.route('/')
.get(user.testConnectDB);

app.route('/login')
.post(user.login);

app.route('/register')
.post(user.register);

app.route('/logout')
.get()
.post()
.put()
.delete();

app.route('/logged')
.get(user.checkLoggedIn);

app.listen(port);
console.log("Link server: "+require("ip").address()+":" + process.env.port + " and "+require("ip").address()+":" + num_port);

// user.showAll();
console.log("Running server!!!");


/*http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' }); //'text/html' });
    res.end(JSON.stringify());
    console.log(req.url.split("?")[0]);
});*/