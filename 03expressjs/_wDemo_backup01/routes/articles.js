//"use strict";
var express = require('express');
var router = express.Router();


var Manage = require('../services/manage.js');
var Category = Manage.category;
var Article = Manage.article;
//var Category = require('../models/category.js');

/* GET home page. */
router.get('/', function(req, res, next) {	
	Article.getArticles(function(err, articles){
		if(err){
			res.send(err);
		} else {
			res.render('articles/articles', { 
				title: 'All Articles',
				articles: articles
			 });
		}
	},5);
});

router.get('/add', function(req, res, next) {	
	Category.getCategories(function(err, categories){
		res.render('articles/article_add', { 
			title: 'Create Article',
			// for selecting category input
			categories: categories });
	});
});
router.post('/add', function(req, res){
	// validate later and send error later
	
	var article = new Article();
	article.title = req.body.title;
	article.subtitle = req.body.subtitle;
	article.category = req.body.category;
	article.body = req.body.body;
	article.seller = req.body.seller;

	Article.addArticle(article, function (err, article) {
		if (err) {
			res.send(err);
		} else {
			req.flash('success', 'Article Added');
			res.redirect('/articles');
		}
	});
});

router.get('/show/:id', function(req, res, next) {
	Article.getArticleById([req.params.id], function(err, article){
		
		if(err){
			res.send(err);
		} else {
			res.render('articles/article', {
				article: article
			    });
		}
	});
});
// III. EDIT _____________________________________________________________________________________________________
// 1. GET
router.get('/edit/:id', function (req, res, next) {	
	Article.getArticleById(req.params.id, function (err, article) {
		if (err) {
			res.send(err);
		} else {
			Category.getCategories(function (err, categories) {
				res.render('articles/article_edit', {
					title: 'Edit Article',
					article: article,
					categories: categories
				});
			});
		}
	});
});
// 2. POST
router.post('/edit/:id', function(req, res, next){  
    	var articleId = req.params.id;
        var update = {
            title:req.body.title, 
            subtitle:req.body.subtitle,
            category:req.body.category,
            seller:req.body.seller,
			body: req.body.body
        };
        
        Article.updateArticleById(articleId, update, function(err, article){
            if(err){
				res.send('Error: '+err);				
			} else {
				req.flash('success', 'Article Updated');
                res.redirect('/articles/show/'+articleId);
            }
        });
    }
);
// 3. DELETE ==> research more about router.delete
router.post('/delete/:id', function (req, res){
	console.log("/delete/:id_________________________________\n")	
	console.log('\n_______________________________________');
	  
    Article.removeArticleById(req.params.id, function(err){
        if(err){
				res.send('Error: '+err);
        } else {
			console.log("/delete/:id_________________________________\n")
			console.log('delete successfully');	
			console.log('\n_______________________________________');
            //res.status(204)			
			req.flash('danger', 'Article Deleted');
			res.redirect('/articles');
        }
    });
});
module.exports = router;