var mongodb = require('mongodb');
var url = "mongodb://localhost:27017/";


exports.createDB = function() {
	mongodb.connect(url+"ChamSocKhachHang", function(err, db) {
		if (err) throw err;
		console.log("Database created!");
		db.close();
	});
}

exports.createCollection = function(collection_name) {
	mongodb.connect(url,function(err,db) {
		if(err) throw err;
		var dbo = db.db("ChamSocKhachHang");		
		dbo.createCollection(collection_name, function(err,res) {
			if (err) throw err;
			console.log("Collection created!");
			db.close();
		});
	});
}