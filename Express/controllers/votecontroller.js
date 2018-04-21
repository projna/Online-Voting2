var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/person');
var voteModel= require.main.require('./models/vote');
var candidateModel= require.main.require('./models/candidate');


router.get('/',ensurelogin,function(request,response)
{
	var users=request.session.loggedUsername;
	console.log(users);
	voteModel.getallvote(function(result)
	{
		var data=
		{
			catlist:result,
			user:users
		}
		response.render('vote/showallvote',data);
		

	});

});
router.get('/showallcandidate/:id',ensurelogin, function(request, response){
	var catid = request.params.id;
	var users=request.session.loggedUsername;
	candidateModel.getallcandidatebyvoteid(catid,function(result)
	{
		if(result.length>0)
		{
			var data=
		{
			catlist: result,
			user:users
		}
		response.render('vote/showallcandidate',data);
		}
		else
		{
			response.render('vote/nocandidate');
		}
		
		
	});
});
router.get('/startvote/:id',ensurelogin,function(request,response)
	{
		var catid= request.params.id;
		voteModel.startvote(catid,function(success)
		{
			if(success)
			{
				response.redirect('/vote');
			}
		});
	});
router.get('/endvote/:id',ensurelogin,function(request,response)
	{
		var catid= request.params.id;
		voteModel.endvote(catid,function(success)
		{
			if(success)
			{
				response.redirect('/vote');
			}
		});
	});

router.get('/votenow/:id',ensurelogin,function(request,response)
{
	var catid=request.params.id;
	var users=request.session.loggedUsername;
	var cat=
	{
		voteid: catid,
		NID: users.NID
	}
	voteModel.checkvotestatus(cat,function(result)
	{
		
		if(result.length<=0)
		{
			var cat=
			{
				voteid:catid,
				NID:users.NID
			}
			voteModel.getcandidatenames(cat,function(result)
			{
				if(result.length>0)
				{
					var candidatename=result;
				voteModel.getVotetitle(catid,function(result)
				{
					var title=result;
					var data={
						catlist :candidatename,
						titles:title
					}
					response.render('vote/votenow',data);
				});
				}
				else
				{
					response.render('vote/nocandidate');
				}
				
			});
		}
		else
		{
			response.render('vote/denyvote');
		}

	});
	router.post('/votenow/:id',ensurelogin,function(request,response)
	{
		var name=request.body.candidate;
		var voteid=request.params.id;
		var user=request.session.loggedUsername;
		if(name==undefined)
		{
			response.redirect('/vote/votenow/'+voteid);
		}
		else
		{
			var cat=
			{
				Name:user.NID,
				Voteid:voteid
			}
			voteModel.votestatusinsert(cat,function(success)
			{

					
					candidateModel.getcandidatebyid(name,function(result)
					{
						var totalvote=result[0].totalvote;
						totalvote++;
						var cat=
						{
							Totalvote:totalvote,
							NID:name
						}
						candidateModel.updatecandidatetotalvotebyid(cat,function(success)
						{
							voteModel.getallvotebyid(voteid,function(result)
							{
								vote=result[0].totalvotes;
								vote++;
								var cat=
								{
									Vote:vote,
									Voteid:voteid
								}
								voteModel.updatetotalvotebyid(cat,function(success)
								{
									response.redirect('/vote/generateresult/'+voteid);
								});
							});
						});
					});
					
				

			});

		}
	});
	

});


	router.get('/generateresult/:id',ensurelogin,function(request,response)
	{
		
        catid=request.params.id;
        candidateModel.getallcandidatebyvoteid(catid,function(result)
        {
        	var total=[];
        	
        	if(result.length>0)
        	{
        		var counter=0;
        		for (var i=0;i<result.length;i++)
        		{
        			total[counter]=result[i].totalvote;
        			counter++;
        		}
        		var a=total.sort(function(a, b){return b-a});
        		

        	
        	voteModel.getallvotebyid(catid,function(result)
        	{
        		
        		var cat=
        		{
        			totalVote:a[0],
        			voteTopic:result[0].votetopic
        		}
        		candidateModel.getallcandidatejoin(cat,function(result)
        		{
        			
        			var data=
        			{
        				catlist:result
        			}
        			response.render('vote/result',data);
        		});
        	});
        }
        else
        {
        	response.render('vote/nocandidate');
        }
        });


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