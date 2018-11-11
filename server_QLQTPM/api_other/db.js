var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'www.db4free.net',
	port: '3306',
	user: 'teamnat',
	password: 'abcghi2356',
	database: 'chamsockhachhang',
});


exports.load = function(sql) {
	return new Promise((resolve, reject) => {

		connection.connect();

		return connection.query(sql, (error,results,fields) => {
			if(error) 
				reject(error);
			else resolve(results);

			connection.end();
		});
	});
}