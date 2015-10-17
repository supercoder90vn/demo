var express = require('express');
var router = express.Router();

var Category = require('../models/category');
/* GET users listing. */
router.get('/', function(req, res, next) {
  //~~~ph_old res.send('respond with a resource');
    Category.getCategories(function(err,categories){
        if(err){
            console.log(err);
        }
        console.log('_______________get categories');
        res.json(categories);
    });
});

router.get('/:id', function(req, res, next) {
  //~~~ph_old res.send('respond with a resource');
    Category.getCategoryById(req.params.id,function(err, category){
        if(err){
            console.log(err);
        }
       console.log('_______________get category by Id');
        res.json(category);
    });
});


module.exports = router;


