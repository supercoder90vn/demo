var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');


router.get('/', function (req, res, next) { 
    
    res.render('contact_view', { 
        title: 'Contact',
        name: "",
        yourEmail: "",
        toEmail: "",
        message: ""
    });
});



// Send Email
router.post('/send', 
    function (req, res, next) {        
        req.checkBody('name', 'Name is required').notEmpty();
        req.checkBody('yourEmail', 'Your Email is required').notEmpty();
        req.checkBody('toEmail', 'To Email is required').notEmpty();
        req.checkBody('message', 'Message is required').notEmpty();
        var errors = req.validationErrors();
        if(errors){     
            res.render('contact_view', { 
                title: 'Contact',errors:errors,
                name: req.body.name,
                yourEmail: req.body.yourEmail,
                toEmail: req.body.toEmail,
                message: req.body.message
            });         
        }
        else{
            next();
        }
        
    }, function (req, res, next) {
        // create Reusable Transporter
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'hongocphuc90dn.test@gmail.com',
                pass: 'Test123!'
            }
        });
    
        // Email Setup
        var mailOptions = {
            from: 'Ho Ngoc Phuc  <info.envelope.from@gmail.com>',// show Ho Ngoc Phuc  instead of hongocphuc90dn.test@gmail.com
            to: req.body.yourEmail, // to: 'hongocphuc90dn@gmail.com, hongocphuc90dn_2@gmail.com'
            subject: 'Website Submission from phuc',
            // Plain Text Version( not work if there is html configuration)
            text: 'You have a submission with the following details... Name: ' + req.body.name + 'Email: ' + req.body.yourEmail + 'Message: ' + req.body.message,
            html: '<p>You got a website submission with the following details...</p><ul><li>Name: <b>' + req.body.name + '</b></li><li>Email: <b>' + req.body.yourEmail + '</b></li><li>Message: <b>' + req.body.message + '</b></li></ul>'
        };
    
        // Send
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);            
                // PHUC_COMMENT: 
                req.flash("error","Slow internet may cause ERROR: ETIMEOUT  !")
                res.send(error + '<br>' + JSON.stringify(error));    
            } else {            
                next();
            }
        });
    },
    function (req, res, next) {
        req.flash("success","Message is sent successfully !")
        res.redirect('/contact');
    }
);

module.exports = router;
