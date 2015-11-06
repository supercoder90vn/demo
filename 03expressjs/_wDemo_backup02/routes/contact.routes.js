var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');


router.get('/', function (req, res, next) {
    
    
    res.render('contact_view', { title: 'Contact' });
});

// Send Email
router.post('/send', function (req, res, next) {
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
        from: 'from_phuc_TEST <info.envelope.from@gmail.com>',// show from_phuc_TEST instead of hongocphuc90dn.test@gmail.com
        to: 'hongocphuc90dn@gmail.com',// to: 'hongocphuc90dn@gmail.com, hongocphuc90dn_2@gmail.com
        subject: 'Website Submission from phuc',
        // Plain Text Version( not work if there is html configuration)
        text: 'You have a submission with the following details... Name: ' + req.body.name + 'Email: ' + req.body.email + 'Message: ' + req.body.message,
        // HTML Version
        // ???? try to get from file.html
        html: '<p>You got a website submission with the following details...</p><ul><li>Name: <b>' + req.body.name + '</b></li><li>Email: <b>' + req.body.email + '</b></li><li>Message: <b>' + req.body.message + '</b></li></ul>'
    };

    // Send
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            //res.redirect('/');    
            // 
            // PHUC_COMMENT: 
            // slow internet can cause ERROR: ETIMEOUT
            // - info is undefined here        
            // - res.send(error +' '); // => Error: Invalid login
            // - res.send(error);// => {"code":"EAUTH","response":"535-5.7.8 Username and Password not accepted. Learn more at\n535 5.7.8  https://support.google.com/mail/answer/14257 cs5sm27386557pbc.15 - gsmtp","responseCode":535}
      
            res.send(error + '<br>' + JSON.stringify(error));


        } else {            
            console.log(info)
            res.redirect('/');
        }
    });
});

module.exports = router;
