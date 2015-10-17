var bodyParser = require('body-parser');
var urlencoedParser = bodyParser.urlencoded({extended:false});
//var jsonParser = bodyParser.json();

module.exports = function(app){
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
};

