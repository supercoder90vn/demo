var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var bcrypt = require('bcryptjs');

module.exports = function(passport){
	passport.serializeUser(function(user, done) {
		// get user by id
  	done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
  		User.getUserById(id, function(err, user) {
  			// set for req.user
  			// you may choose only {username:"xxx"} to return

    		done(err, {name:user.name,_id:user._id});
  		});
	});

	// Login
	passport.use('local-login', 
		new LocalStrategy({
				passReqToCallback: true 
			},
			function(req, username, password, done){
				/*phlog("local-login")
					.next("req.body",req.body)// form input at login
					.end();*/
				User.getUserByUsername(username, function(err, user){
					if(err){
						return done(err);
					}
					// Does user Exist?
					if(!user){
						return done(null, false, {message:'User Not Found'});
					}
					// Is Password Valid?
					if(!isValidPassword(user, password)){
						return done(null, false,{message:'Invalid Password'});
					}
		
					return done(null, user,{message:'You are now logged in'});
				});
			}
		)
	);

	// Register
	passport.use('local-register', new LocalStrategy({
		//usernameField: 'email', // default: username
		//passwordField: 'passwd' // default: password
		passReqToCallback: true
	},
		function(req, username, password, done){
			findOrCreateUser = function(){
				// Find a user with this username
				User.findOne({username: username}, function(err, user){
					if(err){
						console.log('Error: '+err);
						return done(err);
					}
					// Does user exist?
					if(user){
						return done(null, false, req.flash('error','User already exists'));
					} 
					else {
						var newUser = new User();// new =? auto create _id & default value here but not need to use
						phlog("new User()",newUser).end();
						newUser.username = username;
						newUser.password = createHash(password);
						newUser.email = req.body.email;
						newUser.name = req.body.name;
						/*phlog('local-register')
							.next("newUser:",newUser)
							.next('req.body:',req.body)// function 
							.end();*/
						// Add User
						User.addUser(newUser, function(err, user){
							if(err){
								console.log('Error: '+err);
								throw err;
							} else {
								phlog("callback user",user).end();
								return done(null, newUser, {message:'You are now registered and logged in'});
							}
						});
					}
				});
			};
			//https://gist.github.com/maisnamraju/1f4846db3c519ee55513
			// from above link but there is no error when not use asynchronous here
			
			process.nextTick(findOrCreateUser);
			
		}
	));

	var isValidPassword = function(user, password){
		return bcrypt.compareSync(password, user.password);// pass & hashPash
	}

	var createHash = function(password){
		return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
	}
}