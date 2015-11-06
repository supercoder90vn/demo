//"use strict";
var express = require('express');
var router = express.Router();


var Manage = require('../services/manage.js');
var Category = Manage.Category;
var Article = Manage.Article;
var _ = Manage._;


//////////////////////////////////////////////////////////////////
// II. LIST
router.get('/', function(req, res, next) {	
	Article.getArticles(function(err, articles){
		if(err){
			res.send(err);
		} else {
			res.render('articles/list-articles_view', { 
				title: 'All Articles',
				articles: articles
			 });
		}
	},5);
});
//////////////////////////////////////////////////////////////////
// II. ADD
// 1. GET
router.get('/add', function(req, res, next) {	
	Category.getCategories(function(err, categories){
		res.render('articles/create-article_view', { 
			title: 'Create Article',
			categories: categories,
			article: Article.createArticle() 
		});
	});
});
// 2. POST
router.post('/add', function(req, res){
	var article = Article.createArticle(req.body);
	req.checkBody('title', 'Title is required').notEmpty();
	req.checkBody('seller','Seller field is required').notEmpty();
	req.checkBody('category','Category field is required').notEmpty();
	var errors = req.validationErrors();
	
	if(errors){
		Category.getCategories(function(err, categories){
			res.render('articles/create-article_view', {
				errors: errors,
				title: "Add Article",
				categories: categories,
				article: article
			});
		});
	}
	else{// AFTER VALIDATION	
	
		Article.addArticle(article, function (err, article) {
			if (err) {
				res.send(err);
			} else {
				req.flash('success', 'Article Added');
				res.redirect('/articles');
			}
		});
	}	
});
//////////////////////////////////////////////////////////////////
// II. SHOW A ARTICLE
// 1. GET
router.get('/show/:id', function(req, res, next) {
	
	Article.getArticleById([req.params.id], function (err, article) {

		if (err) {
			res.send(err);
		} else {
			
			res.render('articles/view-article_view', {
				article: article,
				comments: _.sortBy(article.comments, function(c) { return c.comment_date; }),
				comment: Article.createComment()
			});
		}
	});
});
//////////////////////////////////////////////////////////////////
// III. EDIT A ARTICLE
// 1. GET
router.get('/edit/:id', function (req, res, next) {	
	Article.getArticleById(req.params.id, function (err, article) {
		if (err) {
			res.send(err);
		} else {
			Category.getCategories(function (err, categories) {
				res.render('articles/edit-article_view', {
					title: 'Edit Article',
					article: article,
					categories: categories
				});
			});
		}
	});
});

var validateArticle = function(article,req){
	
}



// 2. POST
router.post('/edit/:id', function(req, res, next){  

	var update =  {		
		title: req.body.title,
		subtitle: req.body.subtitle,
		body: req.body.body,
		seller: req.body.seller,
		category: req.body.category,
		_id: req.params.id
	};
	// Validation Rules
    req.checkBody('title','Title field is required').notEmpty();
    req.checkBody('seller','Seller field is required').notEmpty();
    req.checkBody('category','Category field is required').notEmpty();
    // Check Errors
	var errors = req.validationErrors();
    if(errors){
		Category.getCategories(function (err, categories) {
			res.render('articles/edit-article_view', {
				errors: errors,
				article: update,
				categories: categories
			});
		});
    } else { // AFTER VALIDATION
	
    	var articleId = req.params.id;
		        
        Article.updateArticleById(articleId, update, function(err, article){
            if(err){
				res.send('Error: '+err);				
			} else {
				req.flash('success', 'Article Updated');
                res.redirect('/articles/show/'+articleId);
            }
        });
	}
 });
///////////////////////////////////////////////////////////////
// IV. DELETE A ARTICLE
// 1. DELETE ==> research more about router.delete
router.post('/delete/:id', function (req, res) {

    Article.removeArticleById(req.params.id, function (err) {
        if (err) {
			res.send('Error: ' + err);
        } else {
            //res.status(204)			
			req.flash('danger', 'Article Deleted');
			res.redirect('/articles');
        }
    });
});
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
// B. COMMENT A ARTICLE
// I.  
router.post('/comments/add/:article_id', function (req, res) {
	var articleId =req.params.article_id;
	var comment = Article.createComment(req.body);
	// Validation Rules
    req.checkBody('comment_subject', 'Subject field is required').notEmpty();
    req.checkBody('comment_author', 'Author field is required').notEmpty();
    req.checkBody('comment_body', 'Body field is required').notEmpty();
    // Check Errors
	var errors = req.validationErrors();

    if (errors) {
		//console.log();console.error(errors);console.log();
        Article.getArticleById(articleId, function (err, article) {
            if (err) {
                console.log(err);
                res.send(err);
            } else { 
				res.render('articles/view-article_view', {
                    "errors": errors,
                    "article": article,
                    "comment": comment,
					"comments": _.sortBy(article.comments, function(c) { return c.comment_date; }),
                });
            }
		});
    } else {// ___AFTER VALIDATION		

		Article.addCommentByArticleId(articleId, comment, function (err, article) {
			if (err) {
				res.send('Error: ' + err);
			} else {
				req.flash('success', 'Comment Added');
				res.redirect('/articles/show/' + articleId);
			}
		});
	}
});

module.exports = router;