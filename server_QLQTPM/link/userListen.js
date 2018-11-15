var user = require('../process/userProcess'),
	express = require('express');

var router = express.Router();

router.route('/')
.get(user.showAll)
.post(user.update); // u (email - require), p 

// API relate user
router.route('/login') 
.post(user.login); // accept: u (username), p (passwordnew), 

router.route('/register') 
.post(user.register); // accept: uname (username), email, password, phone, comid

router.route('/logout')
.get(user.logout);

router.route('/logged')
.get(user.checkLoggedIn);

module.exports = router;