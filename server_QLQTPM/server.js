
var express = require('express');
var session = require('express-session')
var app = express();
var router = express.Router();

var bodyparser = require('body-parser');

var num_port = 1742;
var port = process.env.port || num_port;


var company = require('./fun/companyController');
var user = require('./fun/userController');

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(session({secret: 'QLPM'}));

app.route('/')
.get(user.showAll);

// API relate user
app.route('/login') 
.post(user.login); // accept: u (username), p (password)

app.route('/register') 
.post(user.register); // accept: uname (username), email, password, phone, comid

app.route('/logout')
.get(user.logout);

app.route('/logged')
.get(user.checkLoggedIn);

// API relate company
app.route('/getlistcompany')
.get(company.getListCompany);

app.listen(port);

console.log("Link server: "+require("ip").address()+":" + process.env.port + " and "+require("ip").address()+":" + num_port);
console.log("Running server!!!");