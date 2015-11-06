var express = require('express');
var router = express.Router();

router.get('/people', function(req, res, next) {
  console.log("\n       GET api/people      \n");
	var people = [
    {
      name:"phuc"
    },
    {
      name:"lan",
      address:"danang"
      
    }
  ];
  res.json(people);
});

router.post('/people', function(req, res, next) {
  var data = req.body;
  console.log("\n       POST      api/people      \n");
  console.log();  console.log(data);  console.log();
  res.json(data);
});

router.put('/people', function(req, res, next) {
  console.log("\n       PUT      api/people      \n");
  var data = req.body;
  console.log();  console.log(data);  console.log();
  res.json(data);
});

router.delete('/people', function(req, res, next) {
  console.log("\n       DELETE      api/people      \n");
  var data = req.body;
  console.log();  console.log(data);  console.log();
  res.json(data);
});


module.exports = router;
