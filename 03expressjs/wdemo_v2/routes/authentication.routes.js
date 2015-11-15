var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var fs = require('fs');

/* GET home page. */

var features;
router.get('/', 
	function(req, res, next) {
		// NEED AUTHENTICATION
		if(!req.user){
			req.flash('error','You are not logged in');
			res.redirect('/authentication/login');
		} else {
			next();
					
		}
	},
	function(req, res, next) {
		//	load json data
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
		// RENDER		
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
	// AUTHENTICATE
	passport.authenticate('local-login', {
		successRedirect:'/authentication',
		failureRedirect: '/authentication/login',
		failureFlash: true,
		successFlash: true
	})(req, res, next);
});

router.get('/logout', function(req, res){
	req.logout();
	req.flash('success', 'You are now logged out');
	res.redirect('/authentication');
});

router.get('/register', function(req, res, next) {
  res.render('authentication/register', { title: 'Register' });
});




router.post('/register',
	function(req, res, next){	
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
			next();
		}
	},
	function(req, res, next){
		passport.authenticate('local-register',{
			successRedirect: '/',
			failureRedirect: '/authentication/register',			
			failureFlash: true,
			successFlash: true
		})(req, res, next)
	}
);





module.exports = router;
