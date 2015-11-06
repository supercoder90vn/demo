//"use strict";
var express = require('express');
var router = express.Router();
var Manage = require('../services/manage.js');
var Category = Manage.Category;
var Article = Manage.Article;

///////////////////////////file:///d%3A/__git/demo/03expressjs/wDemo/routes/articles.routes.js/////////////////////////
// I. LIST
// 1. GET
router.get('/', function (req, res, next) {
	Category.getCategories(function (err, categories) {
		if (err) {
			res.send(err);
		} else {
			res.render('categories/list-categories_view', {
				title: 'Categories',
				categories: categories
			});
		}
	});
});
// 2. GET
router.get('/articles/:category', function (req, res, next) {
	var category = req.params.category;
	Article.getArticlesByCategory(category,function (err, articles) {
		if (err) {
			res.send(err);
		} else {
			res.render('categories/list-category-articles_view', {
				title: "Category's Articles",
				articlesCategory: category,
				articles: articles
			});
		}
	});
});
// 3. DELETE
router.delete('/delete/:id', function (req, res, next) {
	Category.removeCategoryById(req.params.id, function (err, category) {
        if (err) {
			res.send('Error: ' + err);
        } else {
            res.status(204).send();
			/*req.flash('danger', 'Category Deleted');
			res.redirect('/categories');*/
        }
    });
});


////////////////////////////////////////////////////
// II. ADD
// 1. GET
router.get('/add', function (req, res, next) {
	res.render('categories/create-category_view', { title: 'Create Category' });
});
// 2. POST
router.post('/add', function (req, res) {
	// add validation and flash later
	
	var category = new Category();
	category.title = req.body.title;

	Category.addCategory(category, function (err, data) {
		if (err) {
			res.send(err);
		} else {
			req.flash('success', 'Categories Added');
			res.redirect('/categories');
		}
	});

});



module.exports = router;