//"use strict";
var express = require('express');
var router = express.Router();
var Manage = require('../services/manage.js');
var Category = Manage.category;


router.get('/', function(req, res, next) {
	Category.getCategories(function(err, categories){
		if(err){
			res.send(err);
		} else {
			res.render('categories/categories', { 
				title: 'Categories',
				categories: categories
			});
		}
	});
});
router.get('/add', function(req, res, next) {
  res.render('categories/category_add', { title: 'Create Category' });
});

router.post('/add', function(req, res){
	// add validation and flash later
	
	var category = new Category();
	category.title = req.body.title;
	category.description = req.body.description;

	Category.addCategory(category, function(err, data){
		if(err){
			res.send(err);
		} else {			
			res.redirect('/categories');
		}
	});
	
});



module.exports = router;