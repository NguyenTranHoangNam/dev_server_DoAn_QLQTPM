var company = require('../process/companyProcess'),
	express = require('express');

var router = express.Router();

// API relate company
router.route('/')
.get(company.getListCompany);

module.exports = router;