var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// I. Application-level middleware
// 1. 
// a middleware with no mount path; gets executed for every request to the app
app.use(function (req, res, next) {
	console.log('__app.use(__,...Time:', Date.now(), "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
	next();
});

// a middleware mounted on /user/:id; will be executed for any type of HTTP request to /user/:id
app.use('/user01/:id', function (req, res, next) {
	console.log('__app.use("/user/:id,...', req.method);
	next();
});

// a route and its handler function (middleware system) which handles GET requests to /user/:id
app.get('/user01/:id', function (req, res, next) {
	console.log('__app.get("/user/:id",...:', req.method);
	res.send('USER');
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// I. Application-level middleware
// 2. 

// a middleware sub-stack which prints request info for any type of HTTP request to /user/:id
app.use('/user02/:id', function (req, res, next) {
	console.log('__app.use.1("/user/:id",...:', 'Request URL:', req.originalUrl);
	next();
}, function (req, res, next) {
	console.log('__app.use.2("/user/:id",...:', 'Request URL:', req.originalUrl);
	console.log('__app.use.2("/user/:id",...:', 'Request Type:', req.method);
	next();
});

// a route and its handler function (middleware system) which handles GET requests to /user/:id
app.get('/user02/:id', function (req, res, next) {
	console.log('__app.get("/user/:id",...:', req.method);
	res.send('USER');
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// I. Application-level middleware
// 3. 

// a middleware sub-stack which prints request info for any type of HTTP request to /user/:id
app.use('/user03/:id', function (req, res, next) {
	console.log('__app.use.1("/user/:id",...:', 'Request URL:', req.originalUrl);
	next();
}, function (req, res, next) {
	console.log('__app.use.2("/user/:id",...:', 'Request Type:', req.method);
	next();
});

// a middleware sub-stack which handles GET requests to /user/:id
app.get('/user03/:id', function (req, res, next) {
	console.log('__app.get.1.a("/user/:id",...::', 'ID:', req.params.id);
	next();// move to next sub stack
}, function (req, res, next) {
	console.log('__app.get.1.b("/user/:id",...:');
	//res.send('User Info');
	next();// move to next same get with same path
});

// handler for /user/:id which prints the user id
app.get('/user03/:id', function (req, res, next) {
	console.log('__app.get.2("/user/:id",...:', 'body: ', req.body);
	res.send(req.params.id);
});
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// I. Application-level middleware
// 4. 


// a middleware sub-stack which handles GET requests to /user/:id
app.get('/user/:id', function (req, res, next) {
  // if user id is 0, skip to the next route
  console.log('2');
  console.log("__Before next()");
  if (req.params.id == 0) next('route');// PHUC_COMMENT: skip next stack, move to next route~~~~~~~~~~~~~~~~~
  // else pass the control to the next middleware in this stack
  else next();
}, function (req, res, next) {
  // render a regular page
  res.send('id != 0 => send from next stack');
});

// handler for /user/:id which renders a special page
app.get('/user/:id', function (req, res, next) {
	console.log('3');
  res.send('id == 0 => send from next route');
});

// a middleware sub-stack which prints request info for any type of HTTP request to /user/:id
app.use('/user/:id', function (req, res, next) {
	console.log('__app.use.1("/user/:id",...:', 'Request URL:', req.originalUrl);
	next();
}, function (req, res, next) {
	console.log('__app.use.2("/user/:id",...:', 'Request Type:', req.method);
	next();
});
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//aLAST.listen
app.listen(3000, function () {
	console.log('Server started on port 3000');
});