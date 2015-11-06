var express = require('express');
var router = express.Router();

var ServerHelper = require('../services/server-helper.js');
var Category = ServerHelper.Category;
var Article = ServerHelper.Article;

//1. LIST
router.get('/', function (req, res, next) {
	console.log();console.log("api/categrories GET");console.log();
	Category.getCategories(function (err, categories) {
		if (err) {
			res.send(err);
		} else {
			res.status(200);
			res.json(categories);
		}
	});	
});

// 2. POST
router.post('/add', function (req, res) {	
	var category = new Category();
	category.title = req.body.title;

	Category.addCategory(category, function (err, data) {
		if (err) {
			res.send(err);
		} else {
			res.status(200).send();
		}
	});
});

// 3. DELETE
router.delete('/delete/:id', function (req, res, next) {
	Category.removeCategoryById(req.params.id, function (err, category) {
        if (err) {
			res.send(err);
        } else {
            res.status(204).send();
        }
    });
});



router.get('/articles/:category', function (req, res, next) {
	var category = req.params.category;
	Article.getArticlesByCategory(category,function (err, articles) {
		if (err) {
			res.send(err);
		} else {
			res.status(200).json(articles);
		}
	});
});




module.exports = router;