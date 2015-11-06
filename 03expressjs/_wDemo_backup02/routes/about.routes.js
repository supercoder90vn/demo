var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('about_view', { title: 'About' });
});

module.exports = router;
