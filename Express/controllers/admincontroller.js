var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/person');
var approvalModel = require.main.require('./models/approval');
var candidateModel= require.main.require('./models/candidate');
var voteModel= require.main.require('./models/vote');

router.get('/showallvoter',ensurelogin, function(request, response){
	userModel.getallvoter(function(result)
	{
		var data=
		{
			catlist: result
		}
		response.render('admin/showallvoter',data);
		//console.log(result);
	});
	
});
router.get('/showallparticipant',ensurelogin, function(request, response){
	userModel.getallparticipant(function(result)
	{
		var data=
		{
			catlist: result
		}
		response.render('admin/showallparticipant',data);
		//console.log(result);
	});
	
});
router.get('/showalladmin',ensurelogin, function(request, response){
	userModel.getalladmin(function(result)
	{
		var data=
		{
			catlist: result
		}
		response.render('admin/showallparticipant',data);
		//console.log(result);
	});
	
});

router.get('/details/:id',ensurelogin, function(request, response){
	var catid = request.params.id;
	userModel.getallbyid(catid,function(result)
	{
		var data=
		{
			catlist: result
		}
		response.render('admin/voterdeails',data);
		
	});
});

	router.get('/asadmin/:id',ensurelogin,function(request,response)
	{
		var catid= request.params.id;
		userModel.updateasadmin(catid,function(success)
		{
			if(success)
			{
				response.redirect('/admin/showalladmin');
			}
		});
	});
	
	
router.get('/addasavoter/:id',ensurelogin,function(request,response)
	{
		var catid= request.params.id;
		userModel.updateasavoter(catid,function(success)
		{
			if(success)
			{
				response.redirect('/admin/showallvoter');
			}
		});
	});

router.get('/deletevoter/:id',ensurelogin,function(request,response)
	{
		var catid= request.params.id;
		userModel.Deletevoter(catid,function(success)
		{
			if(success)
			{
				response.redirect('/admin/showallvoter');
			}
		});
	});

router.get('/approval',ensurelogin,function(request,response)
	{
		approvalModel.getallapproval(function(result)
		{
			if(result.length>0)
			{
				var data=
				{
					catlist:result
				}
				response.render('admin/showallapproval',data);
			}
			else
			{
				response.render('admin/noapproval');
			}
		});

	});

router.get('/approval/reject/:nid/:vid',ensurelogin,function(request,response)
	{

		var nid=request.params.nid;
		var voteid=request.params.vid;
		var cat=
		{
			NID:nid,
			Voteid:voteid
		}
		approvalModel.deleteapproval(cat,function(success)
		{
			response.redirect('/admin/approval');
		});

	});
router.get('/approval/accept/:nid/:vid',ensurelogin,function(request,response)
	{
		var nid=request.params.nid;
		var voteid=request.params.vid;
		var cat=
		{
			NID:nid,
			Voteid:voteid,
			total:0
		}
		candidateModel.insert(cat,function(success)
		{
			userModel.updateascandidate(nid,function(success)
			{
				var cat=
				{
					NID:nid,
					Voteid:voteid,
					total:0
				}
				approvalModel.deleteapproval(cat,function(success)
				{
					response.redirect('/admin/approval');
				});
			});

		});
	});

router.get('/addnewvote',ensurelogin,function(request,response)
{
	response.render('admin/createvote',
	{
		errors:null,
		flash:null
	});
});

router.post('/addnewvote',ensurelogin,function(request,response)
{
	request.checkBody('voterid','Voterid is requried').notEmpty();
	request.checkBody('voterid','Voterid must be number').isNumeric();
	request.checkBody('title','Title is requried').notEmpty();
	var errors=request.validationErrors();
	if(errors)
	{
		response.render('admin/createvote',{
			errors:errors,
			flash:null
		});
	}
	else
	{
		var user=
		{
			Voterid:request.body.voterid,
			Title:request.body.title,
			status:'not started',
			totalvote:0
		}
		voteModel.getallvotebyid(user.Voterid,function(result)
		{
			if(result.length>0)
			{
				
				response.render('admin/createvote',{
					errors:errors,
					flash:{msg:"Voterid already availabe"}
				});
				
			}
			else
			{
				voteModel.insert(user,function(success)
				{
					response.redirect('/vote');

				});

			}
		});

	}

});
//access control
function ensurelogin(request,response,next)
{
	if(request.session.loggedUsername != null)
	{
		var type=request.session.loggedUsername.persontypeid;
		if(type==1)
		{
			return next();
		}
		else
		{
			response.redirect('/home');
		}
		
	}
	else
	{
		response.redirect('/home');
	}
}



module.exports = router;