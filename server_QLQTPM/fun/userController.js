var connect = require('./connectDB');

var session = require('express-session')

exports.login = function(req, res){
	if(req.session.Email){
		res.status(100).send({message: 'Đã đăng nhập'});
	}else{
		var un = req.body.u;
		var pw = req.body.p;
		console.log('select MaTK, Email, Password from TaiKhoan where '+
			'Email like \''+un+'\' and Password like \''+pw+'\'');
		connect.load('select MaTK, Email, Password from TaiKhoan where '+
			'Email like \''+un+'\' and Password like \''+pw+'\'')
		.then(users => {
			console.log(JSON.stringify(users));
			if(users.lenth === 0){
				res.status(400).send({ message: 'Đăng nhập thất bại' });
			}else if(users[0].Email == un && users[0].Password == pw){
				req.session.Email = users[0].Email; 
				users[0].Password = undefined;
				res.status(200).send(JSON.stringify(users[0]));
			}else {
				res.status(400).send({ message: 'Đăng nhập thất bại' });
			}
		})
		.catch((error) => res.status(400).send(error));
	}
}

exports.register = function(req, res) {
	if(req.session.Email){
		res.status(100).send({message: 'Đã đăng nhập'});
	}

	let email = req.body.email;
	let pw = req.body.pw;
	let f_name = req.body.fname;
	let l_name = req.body.lname;

	connect.load('insert into TaiKhoan(TenHienThi, Email, Password) values(\''+f_name+' '+l_name+'\', \''+email+'\',\''+pw+'\');')
	.then(() => {
		res.status(200).send({message: 'Tạo tài khoản thành công.'});
	})
	.catch((error) => res.status(400).send(error));
}

exports.testConnectDB = function(req, res) {
	connect.load('SELECT sqrt(72) test')
	.then(user =>{
		console.log(user);
		res.status(200).send(user);
	})
	.catch((error) => res.status(400).send(error));
}


exports.showAll = function(req, res) {
	connect.load('SELECT * from TaiKhoan')
	.then(user =>{
		console.log(user);
		res.status(200).send(user);
	})
	.catch((error) => res.status(400).send(error));
}

exports.logout = function(req,res) {
	req.session.destroy(function(err) {
		if(err){
			res.negotiate(err);			
		}else{
			res.redirect('/');
		}
	});
}

exports.checkLoggedIn = function(req,res){
	if(req.session.Email){
		res.status(200).sent({loggedin: 'true'});
	}else{
		res.status(400).sent({loggedin: 'false'});
	}
}