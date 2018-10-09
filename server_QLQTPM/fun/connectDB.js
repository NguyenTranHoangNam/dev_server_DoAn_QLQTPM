var mysql = require('mysql');

exports.load = function(query) {
	return new Promise((resolve, reject) => {
		var connection = mysql.createConnection({
			host: 'databases.000webhost.com',
			port: '3306',
			user: 'id7411466_jeremy',
			password: '0908325568',
			database: 'chamsockhachhang',
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