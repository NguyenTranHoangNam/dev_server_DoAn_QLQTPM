var connect = require('./connectDB.js');

exports.getListCompany = function(req,res) {
	connect.load('select * from CompanyInfo;')
	.then(companys =>{
		res.status(200).send(JSON.stringify(companys))
	})
	.catch((error) => res.status(400).send(error));
}