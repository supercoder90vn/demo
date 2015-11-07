var express = require('express');
var router = express.Router();
var passport = require('passport');

router.post('/login', function(req, res, next){
	/*var username = req.body.username;
	var password = req.body.password;*/

	passport.authenticate('local-login', {
		successRedirect:'/authentication',
		failureRedirect: '/authentication/login',
		//failureFlash: true
	})(req, res, next);
});





module.exports = router;
