var db = require('../api_other/db');

exports.getListRoomOfUser = function(userName) {
	connect.load(`select r.name from `)
	.then(list =>{
		return list;
	})
	.catch((error) => {
		return error;
	});
}