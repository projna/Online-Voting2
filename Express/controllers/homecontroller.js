var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/person');


router.get('/', function(request, response, next){
	if(request.session.loggedUsername == null)
	{
		response.redirect('/logincontroller');
	}
	else
	{
		next();
	}
});

router.get('/', function(request, response){
	var user=request.session.loggedUsername;
	if(user['persontypeid']==1)
	{
		response.render('profile/adminhome');
	}
	else if(user['persontypeid']==2)
	{
		var user1={
			data :user
		}
		response.render('profile/voterhome',user1);
	}
	else if(user['persontypeid']==3)
	{
		var user1={
			data :user
		}
		response.render('profile/candidatehome',user1);
	}
	//response.render('home/index');
});

module.exports = router;