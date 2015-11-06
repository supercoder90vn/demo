var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

//var methodOverride = require('method-override');

var PaidContent = require('./services/paidcontent');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// 


//app.use(methodOverride());
app.get('/user',
  function checkIfPaidSubscriber(req, res, next) {
    var hasPaid = true;
    
    if (!hasPaid) {     
      // continue handling this request 
      next('route');
    }
    next();
  }, function getPaidContent(req, res, next) {
    PaidContent.find2(function (err, doc) {
      if (err) return next(err);
      res.json(doc);
    });
  });
//~~~~~~~~~~ ERROR-HANDLING
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

function logErrors(err, req, res, next) {
  console.log("______________logErrors");  
  next(err);
}


function clientErrorHandler(err, req, res, next) {
   console.log("______________clientErrorHandler");
  if (req.xhr) {
      console.log("if (req.xhr) ");
    res.status(500).send({ error: 'Something blew up!' });
  } else {    
    next(err);
  }
}
function errorHandler(err, req, res, next) {
  console.log("______________errorHandler");
  res.status(500);  
  console.log(err.stack);
  res.send(err.stack);
}
// The Default Error Handler

function df_errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  console.log(err.stack);
  res.render('error', { error: err });
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//aLAST.listen
app.listen(3000, function () {
  console.log('Server started on port 3000');
});