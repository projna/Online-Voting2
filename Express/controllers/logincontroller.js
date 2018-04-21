var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/person');

router.get('/', function(request, response){
	if(request.session.loggedUsername == null)
	{
		response.render('login/index',
			{
				errors:null,
				flash:null
			});
	}
	else
	{
		response.redirect('/home');
	}
	
});

router.post('/', function(request, response){
	request.checkBody('NID','NID is requried').notEmpty();
	request.checkBody('Password','Password is requried').notEmpty();
	var errors=request.validationErrors();
	if(errors)
	{	
		console.log(errors);
		response.render('login/index',{
			errors:errors,
			flash:null
		});
	}
	else
	{
		var user = {
		username: request.body.NID,
		password: request.body.Password
	};

	userModel.validate(user, function(result){
		if(result.length>0 )
		{	
			console.log("Hellofromvalid");
			request.session.loggedUsername = result[0];
			response.redirect('/home');
		}
		else
		{
			console.log("I am here");	
			response.render('login/index',
			{
				errors:null,
				flash:{msg:"UserName or Password invalid"}
			});
		}
		
	});
	}
	
	
});

module.exports = router;