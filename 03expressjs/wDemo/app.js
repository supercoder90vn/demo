var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var passport = require('passport');

var nodemailer = require('nodemailer');
var mongoose = require('mongoose');

var flash = require('connect-flash');

var expressValidator = require('express-validator');

//Mongoose Connect
mongoose.connect('mongodb://user:123123@ds051524.mongolab.com:51524/expressjs');
require('./config/passport')(passport);











var db = mongoose.connection;

var tests = require('./routes/tests/tests.routes');
var contact = require('./routes/contact.routes');

var articles = require('./routes/client/articles.routes');
var categories = require('./routes/client/categories.routes');
var authentication = require('./routes/authentication.routes');



var api_categories = require('./routes/api.categories.routes');
var api_articles = require('./routes/api.articles.routes');

var app = express();
var ClientHelper = require('./services/client-helper.js');
global.phlog = require('./services/server-helper.js').log;
app.locals.ClientHelper = ClientHelper;







// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.locals.moment = require('moment');





// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

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
  res.locals.messages = require('express-messages')(req, res);  
  res.locals.user = req.user;
  next();
});

app.get('/', function(req, res, next) {
    res.redirect('/authentication');
});
app.use('/tests', tests);
app.use('/api/categories', api_categories);
app.use('/api/articles', api_articles);

app.use('/authentication', authentication);
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
