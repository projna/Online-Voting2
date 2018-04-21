var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/person');
var voteModel= require.main.require('./models/vote');
var candidateModel= require.main.require('./models/candidate');
var approvalModel = require.main.require('./models/approval');


router.get('/insert/:id',ensurelogin, function(request, response){
	var catid = request.params.id;
	var user=request.session.loggedUsername;
	var cat=
	{
		voteid:catid,
		NID:user.NID
	}
	approvalModel.insert(cat,function(success)
	{
		response.render('vote/approve');
	});
});
router.get('/update/:id',ensurelogin,function(request,response)
	{
		var catid=request.params.id;
		userModel.getpersonbyid(catid,function(result)
		{

			response.render('profile/update',
			{
				catlist:result,
				errors:null
			});

		});

	});
router.post('/update/:id',ensurelogin,function(request,response)
{
	request.checkBody('Address','Address is requried').notEmpty();
	request.checkBody('phnNo','Phone No is requried').isNumeric();
	request.checkBody('phnNo','Phone No must be number').notEmpty();
	request.checkBody('Email','Email is requried').notEmpty();
	request.checkBody('Password','Password is requried').notEmpty();
	request.checkBody('Password','Password length at least 8').isLength({ min: 5 });
	var errors=request.validationErrors();
	if(errors)
	{
		var catid=request.params.id;
		userModel.getpersonbyid(catid,function(result)
		{

			response.render('profile/update',
			{
				catlist:result,
				errors:errors
			});

		});
	}
	else
	{
		var user=
		{
			NID:request.body.NID,
			Address:request.body.Address,
			phoneno:request.body.phnNo,
			email:request.body.Email,
			Password:request.body.Password
		}
		console.log(user);
		userModel.update(user,function(success)
		{
			response.redirect('/logout');
		});
	}

});
//access control
function ensurelogin(request,response,next)
{
	if(request.session.loggedUsername != null)
	{
		return next();
	}
	else
	{
		response.redirect('/home');
	}
}

module.exports = router;