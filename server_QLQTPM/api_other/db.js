var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	port: '3306',
	user: 'root',
	password: '',
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
exports.write = function(sql) {
    return new Promise((resolve, reject) => {
        connection.connect();

        connection.query(sql, (error, value) => {
            if (error)
                reject(error);
            else resolve(value);

            connection.end();
        });
    });
}