var connect = require('./connectDB');

exports.login = function(req, res){
	var un = req.params.u;
	var pw = req.params.p;

	connect.load('select MaTk, Email, Ten N\'TenCty\' from TaiKhoan, CongTy where MaCty = MaCty '+
		'and Email like \''+un+'\' and Password like \''+pw+'\'')
	.then(users => {
		if(users.lenth === 0){
			res.status(400).send({ message: 'Đăng nhập thất bại' });
		}else if(users[0].Email == un && users[0].Password == pw){
			res.status(200).send(users[0]);
		}else {
			res.status(400).send({ message: 'Đăng nhập thất bại' });
		}
	})
	.catch((error) => res.status(400).send(error));
}

exports.register = function(req, res) {
	let email = req.params.email;
	let pw = req.params.pw;
	let f_name = req.params.fname;
	let l_name = req.params.lname;

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

exports.logout = function(req,res) {
	
}