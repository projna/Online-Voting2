var express = require('express');
var router = express.Router();

router.get('/', function(request, response){
	request.session.loggedUsername = null;
	response.redirect('/logincontroller');
});

module.exports = router;