var express = require('express');
var router = express.Router();

var ServerHelper = require('../services/server-helper.js');
var ClientServer = require('../services/client-server.js');
var Category = ServerHelper.Category;
var Article = ServerHelper.Article;


//////////////////////////////////////////////////////////////////
// LIST
router.get('/', function (req, res, next) {
	Article.getArticles(function (err, articles) {
		if (err) {
			res.send(err);
		} else {
			res.status(200);
			res.json(articles);
		}
	}, 10);
});
//////////////////////////////////////////////////////////////////
//  ARTICLE
// 1. GET
router.get('/show/:id', function (req, res, next) {
	Article.getArticleById([req.params.id], function (err, article) {
		if (err) {
			res.send(err);
		} else {
			res.status(200);
			res.json(article);
		}
	});
});

// 2. CREATE
router.post('/add', function (req, res) {
	req.checkBody('title', 'Title is required').notEmpty();
	req.checkBody('seller', 'Seller field is required').notEmpty();
	req.checkBody('category', 'Category field is required').notEmpty();
	var errors = req.validationErrors();
	if (errors) {
		res.status(400).json(errors);
	}
	else {// AFTER VALIDATION	
		var article = ClientServer.createArticle(req.body);
		Article.addArticle(article, function (err, data) {
			if (err) {
				res.send(err);
			} else {
				res.status(200).send();
			}
		});
	}
});

// 2. UPDATE
router.put('/edit/:id', function (req, res) {

	req.checkBody('title', 'Title is required').notEmpty();
	req.checkBody('seller', 'Seller field is required').notEmpty();
	req.checkBody('category', 'Category field is required').notEmpty();
	var errors = req.validationErrors();
	if (errors) {
		res.status(400).json(errors);
	}
	else {// AFTER VALIDATION	
		var articleId = req.params.id;
		var update = ClientServer.createArticle(req.body);
		Article.updateArticleById(articleId, update, function (err, data) {
            if (err) {
				res.send(err);
			} else {
				res.status(200).send();
            }
        });
	}
});


router.delete('/delete/:id', function (req, res, next) {
	Article.removeArticleById(req.params.id, function (err, article) {
        if (err) {
			res.send("Error: " + err);
        } else {
            res.status(204).send();
        }
    });
});

//////////////////////////////////////////////////////////////////
//  COMMENTS
// 1. ADD
router.post('/comments/add/:article_id', function (req, res) {
	var articleId = req.params.article_id;	
	// Validation Rules
    req.checkBody('subject', 'Subject field is required').notEmpty();
    req.checkBody('author', 'Author field is required').notEmpty();
    req.checkBody('body', 'Body field is required').notEmpty();
    // Check Errors
	var errors = req.validationErrors();

    if (errors) {
		res.status(400).json(errors);
    } else {// ___AFTER VALIDATION		

		Article.addCommentByArticleId(articleId, req.body, function (err, article) {
			if (err) {
				res.send('Error: ' + err);
			} else {
				res.status(200).send();
			}
		});
	}
});
module.exports = router;