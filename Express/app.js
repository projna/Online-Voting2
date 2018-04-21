// DECLARATION

var express = require('express');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var expressValidator=require('express-validator');
var flash=require('connect-flash');

var app = express();

var logincontroller = require('./controllers/logincontroller');
var home=require('./controllers/homecontroller');
var admin=require('./controllers/admincontroller');
var vote=require('./controllers/votecontroller');
var logout=require('./controllers/logoutcontroller');
var voter=require('./controllers/votercontroller');
var register=require('./controllers/registercontroller');

// CONFIGURATION
app.set('view engine', 'ejs');

app.use(expressValidator({
	errorFormatter:function(param,msg,value)
	{
		var namespace =param.split('.'),
		root = namespace.shift(),
		formParam= root;
		while (namespace.length)
		{
			formParam+='['+namespace.shift()+']';
		}
		return {
			param:formParam,
			msg : msg,
			value :value
		};
	}

}));

// MIDDLEWARES
app.use(bodyParser.urlencoded({extended:false}));
app.use(expressSession({secret: 'my top secret password', saveUninitialized: true, resave: false}));
app.use(flash());
// ROUTES
app.use('/logincontroller', logincontroller);
app.use('/home', home);
app.use('/admin',admin);
app.use('/vote',vote);
app.use('/logout',logout);
app.use('/voter',voter);
app.use('/registration',register);


app.get('/',function(req,res){
	res.redirect('/logincontroller');
});

app.listen(3000,function()
{
	console.log('Server started on port 3000....');
});
