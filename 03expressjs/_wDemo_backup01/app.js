var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var nodemailer = require('nodemailer');
var mongoose = require('mongoose');

var flash = require('connect-flash');
//Mongoose Connect
var Manage = require('./services/manage.js');
mongoose.connect('mongodb://localhost/technologies');
var db = mongoose.connection;





var routes = require('./routes/index');
var about = require('./routes/about');
var services = require('./routes/services');
var contact = require('./routes/contact');

var articles = require('./routes/articles');
var categories = require('./routes/categories');

var app = express();

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.locals.moment = require('moment');





// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//  I.1 ???
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//I.2 ???
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));


app.use(flash());


app.use(function(req, res, next){  
  // test res.locals.localName = "localMessages";
  res.locals.Manage = Manage;
  
  //res.locals.message = req.flash();
  res.locals.messages = require('express-messages')(req, res);
  
  next();
});


app.use('/', routes);
app.use('/about', about);
app.use('/services', services);
app.use('/contact', contact);

app.use('/articles', articles);
app.use('/categories', categories);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);// handler at IV.1 or IV.2 
});



// error handlers


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.log("_________env = development");

    // PHUC_COMMENT: look at nodes.SHEET for explanation
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}


// production error handler
// no stacktraces leaked to user


app.use(function(err, req, res, next) {
  console.log("_________env = production");
  res.status(err.status || 500);  
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
