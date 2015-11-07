//"use strict";
var request = require('request');

var express = require('express');
var router = express.Router();

var ClientHelper = require('../../services/client-helper.js');



// I. LIST
// 1. GET
router.get('/', function (req, res, next) {
	ClientHelper.findCategories(res,function(categories){
		res.render('categories/list-categories_view',{
			title: 'Categories',
			categories: JSON.parse(categories)
		});
	});
});

// 2. GET

router.get('/articles/:category', function(req, res, next) {
	var category = req.params.category;
	var api = 'http://localhost:3000/api/categories/articles/'+category;
	request.get(api, function(err, response, articles) {
		if (!err && response.statusCode == 200) {
			res.render('categories/list-category-articles_view', {
				title: "Category's Articles",
				articlesCategory: category,
				articles: JSON.parse(articles)
			});
		}
		else{
			res.send("Error in accessing "+ api);
		}
	});
});


////////////////////////////////////////////////////
// II. ADD
// 1. GET
router.get('/add',
	function(req, res, next) {
		if(!req.user){
			res.redirect('/');
		}else{
			next();
		}		
	},
	function (req, res, next) {	
		res.render('categories/create-category_view', { title: 'Add Category' });
	}
);

router.post('/add', function (req, res, next) {	
	var api = 'http://localhost:3000/api/categories/add';
	
	request.post({url:api, form: {title:req.body.title}}, function(err,response,body){
		if (!err && response.statusCode == 200) {
			req.flash('success', 'Category Added');
			res.redirect('/categories');
		}else{
			res.send("Error in POST to api "+ api);
		}
	});
});

module.exports = router;