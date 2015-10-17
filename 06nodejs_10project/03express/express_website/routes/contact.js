var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var urlencoedParser = bodyParser.urlencoded({extended:false});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

router.post('/send',urlencoedParser, function(req, res, next){
    console.log('req.body_____________________________________________________')
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'hongocphuc90dn.test@gmail.com',
          pass: 'Test123!'
        }
    });
    
    var mailOptions = {
      from:  'from_ebrain <ebrainstudiogame@gmail.com>',
      to:'hongocphuc90dn@gmail.com',
      subject: 'Website Submission',
      text: 'You have a new submission with the following details... Name: ' + req.body.name + 'Email: ' + req.body.email+ 'Message: '+ req.body.message,
      html: '<p>You got a new submission with the following details..</p><ul><li>Name: '+req.body.name+'</li><li>Email: '+ req.body.email+'</li><li>Message: '+req.body.message+'</li></ul>'
    }
    
    transporter.sendMail(mailOptions, function(error,info){ 
      if(error){
        console.log(error);
        res.redirect('/');
      }else{
        console.log('Message Sent: '+ info.response);
        res.redirect('/');
      }
    });
  
});

module.exports = router;
