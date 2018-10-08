var connectDB = require('./fun/connectDB')


loadAllHangSX = function() {
	return connectDB.load("select * from 'hang_sx'");
}


loadAllHangSX()
	.then(name => {
		for(c of name){
			console.log(c.truso);
		}
	})
	.catch(err => console.log('${err.code} => ${err.sqlMessage}'));