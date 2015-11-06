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

var expressValidator = require('express-validator');

//Mongoose Connect
var ClientHelper = require('./services/client-helper.js');
mongoose.connect('mongodb://localhost/technologies');
var db = mongoose.connection;





var routes = require('./routes/index.routes');
var about = require('./routes/about.routes');
var services = require('./routes/services.routes');
var contact = require('./routes/contact.routes');

var articles = require('./routes/articles.routes');
var categories = require('./routes/categories.routes');

var api = require('./routes/api.routes');
var api_categories = require('./routes/api.categories.routes');
var api_articles = require('./routes/api.articles.routes');

var app = express();

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.locals.moment = require('moment');
app.locals.ClientHelper = ClientHelper;




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

app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));
app.use(flash());


app.use(function(req, res, next){  
  
  
  //res.locals.message = req.flash();
  res.locals.messages = require('express-messages')(req, res);
  
  next();
});


app.use('/', routes);
app.use('/api', api);
app.use('/api/categories', api_categories);
app.use('/api/articles', api_articles);

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
    console.log();
    console.log("_________env = development");

    res.status(err.status || 500);
    res.render('error_view', {
      message: err.message,
      error: err
    });
  });
}


// production error handler
// no stacktraces leaked to user


app.use(function(err, req, res, next) {
  console.log();
  console.log("_________env = production");
  res.status(err.status || 500);  
  res.render('error_view', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
