var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

module.exports = function(app){
	app.get('/api/person/:id',function(req,res){
		// get that data from database
		res.json({firstname: 'John', lastname: 'Doe'});
	});
	
	app.post('/api/person', function(req,res){
		// save to the database
	});
	
	app.delete('/api/person/:id',function(req,res){
		// delete from the database
	});
	
	
	app.post('/personjson', jsonParser, function(req,res){
		res.send('Thank you for the JSON data!');
		console.log(req.body.firstname);
		console.log(req.body.lastname);
	});
}