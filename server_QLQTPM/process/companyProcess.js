var connect = require('../api_other/db');

exports.getListCompany = function(req,res) {
	connect.load('select * from CompanyInfo')
	.then(companis =>{
		console.log(companis);
		res.status(200).send(JSON.stringify(companis));
	})
	.catch((error) => {
		console.log(error);
		res.status(400).send(error);
	});
}