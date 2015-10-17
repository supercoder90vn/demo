var express = require('express');
var bodyParser = require('body-parser')
var app = express();

var port = process.env.PORT || 3000; 

var urlencoedParser = bodyParser.urlencoded({extended:false});
var jsonParser = bodyParser.json();
// static file
app.use('/assets', express.static(__dirname + '/public')); 

app.set('view engine','ejs');



// middleware
app.use('/', function(req, res, next){
	console.log('Reqest Url: ' + req.url);
	next();
});

app.get('/', function(req,res){
	res.render("index");
});

//app.get('person/:page/:id',function(req, res){
app.get('/person/:id',function(req, res){
	res.render('person', {ID: req.params.id, Qstr: req.query.qstr}); //localhost:3000/person/Tony?qstr=123
});

// form action
app.post('/person',urlencoedParser,function(req, res){
	res.send('Thank you!');
	console.log(req.body.firstname)
	console.log(req.body.lastname)
});

app.get('/person_send/:id/:page',function(req, res){
	res.send('<html><head></head><body><h1>Person: ' + req.params.id + '</h1>'+ req.params.page+ '</body></html>');
});

// RESTful api
app.get('/api/person/:id',function(req,res){
	// get that data from database
	res.json({firstname: 'John', lastname: 'Doe'});
});

app.post('/api/person', jsonParser, function(req,res){
	// save to the database
});

app.delete('/api/person/:id',function(req,res){
	// delete from the database
});


app.listen(port);