/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   reference: 
    -   http://node-machine.org/machinepack-passwords
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
module.exports = {
	// Sign User Up
    signup: function(req, res){ // POST
        console.log('Backend Signup');
        
        var Passwords = require('machinepack-passwords');
        
        // Encrypt Password
        Passwords.encryptPassword({
            password: req.param('password'),
            difficulty: 10
        }).exec({
            error: function(err){
                return res.negotiate(err);
            },
            success: function(encryptedPassword){
                require('machinepack-gravatar').getImageUrl({
                    emailAddress: req.param('email')
                }).exec({
                    error: function(err){
                        return res.negotiate(err);
                    },
                    success: function(GravatarUrl){
                        // Create User
                        User.create({
                            name: req.param('name'),
                            email: req.param('email'),
                            password: encryptedPassword,
                            lastLoggedIn: new Date(),
                            gravatarUrl: GravatarUrl
                        }, function userCreated(err, newUser){
                            if(err){
                                console.log('Error: '+err);
                                return res.negotiate(err);
                            }
                            
                            //SESSION VAR
                            console.log('User Added');
                            return res.json({
                                id: newUser.id
                            });
                        })
                    }
                })
            }
        })
    },
    login: function(req,res){ // PUT
        // Validate User
        User.findOne({
            email: req.param('email')
        }, function foundUser(err, user){
            if(err){
                return res.neogtiate(err);
            }
            if(!user){
                return res.notFound();
            }
            
            require('machinepack-passwords').checkPassword({
                passwordAttempt: req.param('password'),
                encryptedPassword: user.password
            }).exec({
                error: function(error){
                     console.log('Password Error');
                    return res.negotiate(err);
                },
                incorrect: function(){
                    console.log('Password incorrect');
                    return res.notFound();
                },
                success: function(){
                    req.session.me = user.id;
                    console.log('SUCCESS');
                    return res.ok();
                }
            })
        })
    },
    logout: function(req, res){ //GET
        User.findOne({id: req.session.me}, function(err, user){
            console.log('logout try to redirect...');
            if(err){
                return res.neogtiate(err);
            }
            if(!user){
                return res.notFound();
            }
            req.session.me = null;
            
            return res.redirect('/');
        })
    }
    
   
};

