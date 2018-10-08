var connect = require('connectDB');

exports.login = function(req, res){
	var un = req.params.u;
	var pw = req.params.p;

	connect.load('select MaTk, Email, Ten N\'TenCty\' from TaiKhoan, CongTy where MaCty = MaCty '+
		'and Email like \''+un+'\' and Password like \''+pw+'\'')
	.then(users => {
		if(users.lenth === 0){
			res.status(400).send({ message: 'Nhập sai tài khoản' });
		}else if(users[0].Email == un && users[0].Password == pw){
			res.status(200).send(users[0]);
		}else {
			res.status(400).send({ message: 'Nhập sai tài khoản' });
		}
	})
	.catch((error) => res.status(400).send(error));
}

exports.register = function(req, res) {
	let email = req.params.email;
	let pw = req.params.pw;
	let macty = req.params.macty;

	connect.load('insert into TaiKhoan(Email, Password, MaCty) values(\''+email+'\',\''+pw+'\',\''+macty+'\');')
	.then(() => {
			res.status(200).send({message: 'Tạo tài khoản thành công.'});
	})
	.catch((error) => res.status(400).send(error))''
}