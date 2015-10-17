var bodyParser	= require('body-parser');
var express		= require('express');
var morgan		= require('morgan');
var app			= express();

var methodOverride = require('method-override');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.listen(3000);
console.log("App listening on port 3000");