var mail = require('../process/mailProcess'),
	express = require('express'),
	company = require('../process/companyProcess');

var router = express.Router();

// API relate company
router.route('/')
.get(mail.emailReceive)
.post(company.add); // id:... name:... comid:...


router.route('/:id')
.get(company.getCompany)
.delete(company.delete);

module.exports = router;