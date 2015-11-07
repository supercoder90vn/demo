var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var fs = require('fs');
var request = require('request');
/* GET home page. */

var features;
router.get('/', 
	function(req, res, next) {
		if(!req.user){
			req.flash('error','You are not logged in');
			res.redirect('/authentication/login');
		} else {
			next();
					
		}
	},
	function(req, res, next) {
		if(!features){
			fs.readFile('json/features.json','utf8', function(err, data){
				features = JSON.parse(data);
				next();
			});
		}else{
			next();
		}
	},
	function(req, res, next) {
		res.render('authentication/dashboard', { 
			title: 'Home', 
			features:features
		});
	}
);


router.get('/login', function(req, res, next) {
  res.render('authentication/login', { title: 'Login' });
});

router.post('/login', function(req, res, next){
	var user = {
		username:username;
		password:password;
	}	

	var api = 'http://localhost:3000/api/authentication/login';
	
	request.post({url:api, form: user}, function(err,response,body){
		if (!err && response.statusCode == 200) {
			req.flash('success', 'Login Successed');
			res.redirect('/');
		}else{
			res.send("Error in POST to api "+ api);
		}
	});
});

router.get('/logout', function(req, res){
	req.logout();
	req.flash('success', 'You are now logged out');
	res.redirect('/authentication');
});

router.get('/register', function(req, res, next) {
  res.render('authentication/register', { title: 'Register' });
});




router.post('/register', function(req, res, next){
	/*var name     	    = req.body.name;
	var email    		= req.body.email;
	var username 		= req.body.username;
	var password 		= req.body.password;
	var password2 		= req.body.password2;*/

	req.checkBody('name', 'Name field is required').notEmpty();
	req.checkBody('email', 'Email field is required').notEmpty();
	req.checkBody('email', 'Email must be a valid email address').isEmail();
	req.checkBody('username', 'Username field is required').notEmpty();
	req.checkBody('password', 'Password field is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if(errors){
		res.render('authentication/register',{
			errors: errors
		});
	} else {
		passport.authenticate('local-register',{
			successRedirect: '/',
			failureRedirect: '/authentication/register',
			//failureFlash: true
		})(req, res, next)
	}
});





module.exports = router;
