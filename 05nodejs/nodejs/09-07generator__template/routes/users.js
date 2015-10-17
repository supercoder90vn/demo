var express = require('express');
var router = express.Router();

/* GET users listing. */
// _ph_cmt_  add prePath /user/xxx   at app.js
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
