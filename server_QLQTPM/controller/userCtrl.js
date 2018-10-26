var user = require('../repos/userController.js'),
	express = require('express');

var router = express.Router();

router.route('/')
.get(user.showAll);

// API relate user
router.route('/login') 
.post(user.login); // accept: u (username), p (password)

router.route('/register') 
.post(user.register); // accept: uname (username), email, password, phone, comid

router.route('/logout')
.get(user.logout);

router.route('/logged')
.get(user.checkLoggedIn);

// API relate company
router.route('/getlistcompany')
.get(company.getListCompany);

module.exports = router;