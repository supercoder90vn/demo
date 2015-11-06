var express = require('express');
var router = express.Router();
var fs = require('fs');

var results;


router.get('/', function(req, res, next) {
  fs.readFile('json/services.json','utf8', function(err, data){
    if(err){
        throw err;
    } else {
       res.render('services_view', { 
        title: 'Services',
        services: JSON.parse(data)
      });
    }
  });
});

module.exports = router;