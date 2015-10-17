var express = require('express');
var mysql = require('mysql');
var app = express();
var mongoose = require('mongoose');

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//  MONGO_DB

//username:password@...
mongoose.connect('mongodb://user:1234@ds047742.mongolab.com:47742/addressbook');
/* 1. long model
var Schema = mongoose.Schema;

var personSchema = new Schema({
	firstname: String,
	lastname: String,
	address: String
});

var Person = mongoose.model('Person', personSchema);
*/
//
/* 2. short model */
var Person = mongoose.model('Person', new mongoose.Schema({
	firstname: String,
	lastname: String,
	address: String
}));
Person.remove({},function(err){
	if(err){
		throw err;
	}
	console.log('delete all people!');
});
// object 1
var john = Person({
	firstname: 'John',
	lastname: 'Doe',
	address: '555 Main st.'
});

// save the user
john.save(function(err){
	if(err) throw err;
	
	console.log('person saved!');	
});

// object 2
var jane = Person({
	firstname: 'jane',
	lastname: 'Doe',
	address: '555 Main st.'
});

// save the user
jane.save(function(err){
	if(err) throw err;
	
	console.log('person saved!');	
});


// MONGO_DB
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var apiController = require('./controller/apiController');
var htmlController = require('./controller/htmlController');

var port = process.env.PORT || 3000; 



// static file
app.use('/assets', express.static(__dirname + '/public')); 

app.set('view engine','ejs');

// middleware
app.use('/', function(req, res, next){	
	console.log('Request Url: ' + req.url);
	
	
	// get all the users
	Person.find({},function(err, users){		
		console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ callback from :' + req.url)
		if(err) throw err;
		
		// object of all the users
		console.log(users);
	});
	
	
	next();
});


apiController(app);
htmlController(app);

app.listen(port);