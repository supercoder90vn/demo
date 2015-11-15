//"use strict";
var express = require('express');
var router = express.Router();


var ClientHelper = require('../../services/client-helper.js');
var ClientServer = require('../../services/client-server.js');
var _ = ClientHelper._;
var request = require('request');

//////////////////////////////////////////////////////////////////
// I. LIST
router.get('/', function(req, res, next) {
	var api = 'http://localhost:3000/api/articles';
	request.get(api, function(err, response, body) {
		if (!err && response.statusCode == 200) {
			res.render('articles/list-articles_view',{
				title: 'Articles',
				articles: JSON.parse(body)
			});
		}
		else{
			res.send("Error in accessing "+ api);
		}
	});
});
//////////////////////////////////////////////////////////////////
// II. SHOW A ARTICLE
// 1. GET

// re-use at 1> view-article &&  2> reload view-article for invalide-comment-validation  
var renderArticleView = function(res, articleId, props){
	var api = 'http://localhost:3000/api/articles/show/'+articleId;
	request.get(api, function(err, response, body, errors) {
		if (!err && response.statusCode == 200) {
			var article = JSON.parse(body);
			res.render('articles/view-article_view',{
				title: 'Article',
				article: article,
				comments: _.sortBy(article.comments, function(c) { return c.comment_date; }),
				comment: props.comment,
				errors: props.errors
			});
		}
		else{
			res.send("Error in accessing "+ api);
		}
	});	
}
router.get('/show/:id', function(req, res, next) {	
	renderArticleView(res,req.params.id, {
		"comment":ClientServer.createComment()
	});
});
//////////////////////////////////////////////////////////////////
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
	function(req, res, next) {
		ClientHelper.findCategories(res,function(categories){
			res.render('articles/create-article_view', { 
				title: 'Add Article',
				categories: JSON.parse(categories),
				article: ClientServer.createArticle(),
			});
		});
	}
);


// 2. POST
router.post('/add', function(req, res){		
	var article = ClientServer.createArticle(req.body);
	var api = 'http://localhost:3000/api/articles/add';
	
	request.post({url:api, form: article}, function(err,response,body){
		if (!err) {
			if(response.statusCode == 200){
				// 1.a SUCCESSFUL
				req.flash('success', 'Articles Added');
				res.redirect('/articles');	
			}else if(response.statusCode == 400){
				// 1.b VALIDATION ERROR

				ClientHelper.findCategories(res,function(categories){
					res.render('articles/create-article_view', { 
						title: 'Add Article',
						categories: JSON.parse(categories),
						article: article,
						errors: JSON.parse(body)
					});
				});
			}else{
				// 1.c UNKNOWN EROR
				console.log(response);
				res.send("Unknown error. Read console for more information");				
			}		
		}else{
			// 2. wrong API
			res.send("Error in POST to api "+ api);
		}
	});
	
});

////////////////////////////////////////////////////////////////////////////////////////
// III. EDIT A ARTICLE
// 1. GET
router.get('/edit/:id', function (req, res, next) {	
	var articleId = req.params.id;
	var api = 'http://localhost:3000/api/articles/show/'+articleId;
	request.get(api, function(err, response, body) {
		if (!err && response.statusCode == 200) {
			ClientHelper.findCategories(res,function(categories){				
				
				res.render('articles/edit-article_view', { 
					title: 'Update Article',
					categories: JSON.parse(categories),
					article: JSON.parse(body)
				});
			});
		}
		else{
			res.send("Error in accessing "+ api);
		}
	});
	
});

// 2. POST
router.post('/edit/:id', function(req, res, next){  
	var article = ClientServer.createArticle(req.body);
	var articleId = req.params.id;
	var api = 'http://localhost:3000/api/articles/edit/'+articleId;
	
	request.put({url:api, form: article}, function(err,response,body){
		if (!err) {
			if(response.statusCode == 200){
				// 1.a SUCCESSFUL
				req.flash('success', 'Articles Updated');
				res.redirect('/articles/show/'+articleId);	
			}else if(response.statusCode == 400){
				// 1.b VALIDATION ERROR
				ClientHelper.findCategories(res,function(categories){
					res.render('articles/edit-article_view', { 
						title: 'Update Article',
						categories: JSON.parse(categories),
						article: article,
						errors: JSON.parse(body)
					});
				});
			}else{
				// 1.c UNKNOWN EROR
				console.log(response);
				res.send("Unknown error. Read console for more information");				
			}		
		}else{
			// 2. wrong API
			res.send("Error in POST to api "+ api);
		}
	});
 });
///////////////////////////////////////////////////////////////
// IV. DELETE A ARTICLE
// 1. DELETE ==> use AJAX at main.js because I don't know how use method DELETE at link


////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
// B. COMMENT A ARTICLE
// I.  
router.post('/comments/add/:article_id', function (req, res) {
	var articleId =req.params.article_id;
	var comment = ClientServer.createComment(req.body);
	var api = 'http://localhost:3000/api/articles/comments/add/'+articleId;
	
	request.post({url:api, form: comment}, function(err,response,body){
		if (!err) {
			if(response.statusCode == 200){
				// 1.a SUCCESSFUL
				req.flash('success', 'Comment Added');
				res.redirect('/articles/show/'+articleId);	
			}else if(response.statusCode == 400){
				// 1.b VALIDATION ERROR
				renderArticleView(res,articleId, {
					"comment": comment,
					"errors": JSON.parse(body)
				});
			}else{
				// 1.c UNKNOWN EROR
				console.log(response);
				res.send("Status Code:"+response.statusCode+"<br>API:"+api+"<br>Read console for more information");				
			}		
		}else{
			// 2. wrong API
			res.send("Error in POST to api "+ api);
		}
	});

});

module.exports = router;