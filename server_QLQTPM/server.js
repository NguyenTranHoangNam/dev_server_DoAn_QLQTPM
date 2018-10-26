
var express = require('express'),
session = require('express-session'),
bodyparser = require('body-parser');
var app = express();

var num_port = 1742;
var port = process.env.port || num_port;

app.use(morgan('dev'));
app.use(cors());
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(session({secret: 'QLPM'}));


app.use('/user', require('./controller/userCtrl'));

app.listen(port, () =>{
	console.log("Link server: "+require("ip").address()+":" + port);
	console.log("Running server!!!");
})