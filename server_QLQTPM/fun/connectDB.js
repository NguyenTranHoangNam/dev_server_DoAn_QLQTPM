var mysql = require('mysql');

exports.load = function(query) {
	return new Promise((resolve, reject) => {
		var connection = mysql.createConnection({
			host: '172.0.0.1',
			port: '3306',
			user: 'root',
			password: '',
			database: 'ChamSocKhachHang'
		});

		connection.connect();

		connection.query(sql, (error,results,fields) => {
			if(error) 
				reject(error);
			else resolve(results);

			connection.end();
		});
	});
}