var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/person');
var approvalModel = require.main.require('./models/approval');
var candidateModel= require.main.require('./models/candidate');


router.get('/',function(request ,response)
{
	response.render('registration/register',{
		errors:null,
		flash:null
	});
});
router.post('/',function(request,response)
{
	request.checkBody('name','Name is requried').notEmpty();
	request.checkBody('NID','NID is requried').notEmpty();
	request.checkBody('NID','NID must be number').isNumeric();
	request.checkBody('date','Birthdate is requried').notEmpty();
	request.checkBody('Address','Address is requried').notEmpty();
	request.checkBody('phoneno','Phone No is requried').isNumeric();
	request.checkBody('phoneno','Phone No must be number').notEmpty();
	request.checkBody('email','Email is requried').notEmpty();
	request.checkBody('Password','Password is requried').notEmpty();
	request.checkBody('Password','Password length at least 8').isLength({ min: 5 });
	var errors=request.validationErrors();
	if(errors)
	{
		response.render('registration/register',{
			errors:errors,
			flash:null
		});
	}
	else
	{
		var user=
		{
			Name:request.body.name,
			NID:request.body.NID,
			date:request.body.date,
			Address:request.body.Address,
			phoneno:request.body.phoneno,
			email:request.body.email,
			Password:request.body.Password,
			type:2
		}
		userModel.getpersonbyid(user.NID,function(result)
		{
			if(result.length>0)
			{
				
				response.render('registration/register',{
					errors:errors,
					flash:{msg:"UserName already availabe"}
				});
				
			}
			else
			{
				userModel.insert(user,function(success)
				{
					response.redirect('/home');
				});
			}

		});

		//console.log(user.NID);
	}
});


module.exports = router;