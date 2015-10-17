var express = require('express');
var mysql = require('mysql');
var app = express();

var apiController = require('./controller/apiController');
var htmlController = require('./controller/htmlController');

var port = process.env.PORT || 3000; 



// static file
app.use('/assets', express.static(__dirname + '/public')); 

app.set('view engine','ejs');

// middleware
app.use('/', function(req, res, next){
	console.log('Request Url: ' + req.url);
	
	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database: "addressbook"
	});
	
	con.connect();
	con.query('SELECT People.ID, Firstname, Lastname, Address FROM People INNER JOIN personaddresses ON People.ID = PersonAddresses.PersonID INNER JOIN Addresses ON PersonAddresses.AddressID = Addresses.ID',
		function(err, rows){
			if(err) throw err;
			console.log(rows);
			console.log(rows[0].Firstname);
		}
	);
	
	next();
});


apiController(app);
htmlController(app);

app.listen(port);