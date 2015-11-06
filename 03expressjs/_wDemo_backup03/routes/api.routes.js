var express = require('express');
var router = express.Router();


router.get('/test', function(req, res, next) {  
  res.json({test:"Hello world!!!"});
});


module.exports = router;
