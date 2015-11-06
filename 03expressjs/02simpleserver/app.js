
//mI
var express = require('express');
//mII
var path = require('path');
//mIII
var bodyParser = require('body-parser');

var app = express();
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/// aI.use
//mIII.1  bodyParser.jso
app.use(bodyParser.json()); // ??? 
//mIII.2 bodyParser.urlencoded
app.use(bodyParser.urlencoded({extended: false})); // => for use req.res // ???? extend: false 


//mI.1. Set Static Path  //mII.1. path.join	//gI. __dirname
app.use(express.static(path.join(__dirname, 'public')));


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// aII.get  (json)  http://localhost:3000/people
app.get('/people', function(req, res){
	var people = [
		{
			first_name: "John",
			last_name: "Doe",
			age: 34,
			gender: "male"
		},
		{
			first_name: "Tom",
			last_name: "Jackson",
			age: 27,
			gender: "male"
		},
		{
			first_name: "Tracy",
			last_name: "Smith",
			age: 30,
			gender: "female"
		}
	];
	
	
	//iI. res.json
	res.json(people);
	
});
	// (download) http://localhost:3000/download
app.get('/download', function(req, res){
	//iI.2. res.download
	res.download(path.join(__dirname, '/downloads/pdf-sample.pdf'));
	//console.log(res);
});
	
app.get('/about', function(req, res){	
	//iI.3.a res.send
	///res.send("_______");
	//iI.3.b res.sendFile => use iI.3.b for shorter
	///res.sendFile(path.join(__dirname, 'public/about.html'));
	//iI.3.c res.redirect	
	res.redirect('/about.html');
	
});
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// aIII.post  
			/*related to bodyParser
				(often for getting data from client to update database)*/
app.post('/subscribe', function(req, res){
	//iII.1 req.body
	var name = req.body.name;
	var email = req.body.email;
	console.log(req.body);
	console.log('_____'+name+' has subscribed with '+email);
});

//aLAST.listen
app.listen(3000, function(){
	console.log('Server started on port 3000');
});