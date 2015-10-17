var express = require('express');

var app = express();
//generator_fake ~~~~~~~~~~~~~~~~~~~~~
var apiController = require('./controller/apiController');
var htmlController = require('./controller/htmlController');
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~.
var port = process.env.PORT || 3000; 



// static file
app.use('/assets', express.static(__dirname + '/public')); 

app.set('view engine','ejs');

// middleware
app.use('/', function(req, res, next){
	console.log('Reqest Url: ' + req.url);
	next();
});


apiController(app);
htmlController(app);

app.listen(port);