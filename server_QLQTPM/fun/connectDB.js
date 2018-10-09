var mysql = require('mysql');

exports.load = function(sql) {
	return new Promise((resolve, reject) => {
		var connection = mysql.createConnection({
			host: 'www.db4free.net',
			//connectionLimit: 10,
			port: '3306',
			user: 'teamnat',
			password: 'abcghi2356',
			database: 'chamsockhachhang',
		});

		connection.connect();

		return connection.query(sql, (error,results,fields) => {
			if(error) 
				reject(error);
			else resolve(results);

			connection.end();
		});
	});
}