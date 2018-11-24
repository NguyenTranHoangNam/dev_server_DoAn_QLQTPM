var mysql = require('mysql');

var infoConnect = {
	host: 'www.db4free.net',
	port: '3306',
	user: 'teamnat',
	password: 'abcghi2356',
	database: 'chamsockhachhang'
	// host: 'localhost',
	// //connectionLimit: 10,
	// port: '3306',
	// user: 'root',
	// password: '',
	// database: 'chamsockhachhang',
};


exports.load = function(sql) {
	return new Promise((resolve, reject) => {
		var connection = mysql.createConnection({
			host: infoConnect.host,	port: infoConnect.port, user: infoConnect.user, password: infoConnect.password, database: infoConnect.database
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

exports.write = function(sql) {
	return new Promise((resolve, reject) => {
		var connection = mysql.createConnection({
			host: infoConnect.host,	port: infoConnect.port, user: infoConnect.user, password: infoConnect.password, database: infoConnect.database
		});

		connection.connect();
		connection.query(sql, (error, value) => {
			if (error)
				reject(error);
			else resolve(value);

			connection.end();
		});
	});
}