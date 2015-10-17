var express = require('express');
var router = express.Router();

var Article = require('../models/article');
/* GET users listing. */
router.get('/', function(req, res, next) {
  //~~~ph_old res.send('respond with a resource');
    Article.getArticles(function(err,articles){
        if(err){
            console.log(err);
        }
        console.log('_______________get artiles');
        res.json(articles);
    });
});

router.get('/:id', function(req, res, next) {
  //~~~ph_old res.send('respond with a resource');
    Article.getArticleById(req.params.id,function(err,article){
        if(err){
            console.log(err);
        }
       console.log('_______________get artile by Id');
        res.json(article);
    });
});

router.get('/category/:category', function(req, res, next) {
  //~~~ph_old res.send('respond with a resource');
    Article.getArticlesByCategory(req.params.category,function(err,articles){
        if(err){
            console.log(err);
        }
       console.log('_______________get artile by Category');
        res.json(articles);
    });
});


// Add Article
router.post('/', function(req, res, next){
    // Get Form Values
     console.log('_______router.post()');
    var title = req.body.title;
    var category = req.body.category;
    var body = req.body.body;
    
    // Article Object
    var newArticle = new Article({
        title: title,
        category: category,
        body: body
    });
    
    // Create Article
    Article.createArticle(newArticle, function(err,article){
        if(err){
            console.log(err);
        }
        console.log('_______________ after create article');
        res.location('/articles');
        res.redirect('/articles');
        
    }); 
    
    
});

// Update Article
router.put('/', function(req, res, next){
    var id = req.body.id;
    var data = {
        title: req.body.title,
        category: req.body.category,
        body: req.body.body
    }
    
    // Create Article
    Article.updateArticle(id, data, function(err,article){
        if(err){
            console.log(err);
        }
        console.log('_______________ update article');
        res.location('/articles');
        res.redirect('/articles');
        
    });   
});

// remove Article
router.delete('/:id', function(req, res, next){
    var id = req.params.id
    

    // Create Article
    Article.removeArticle(id, function(err,article){
        if(err){
            console.log(err);
        }
        
        console.log('_______________ remove article');
        res.location('/articles');
        res.redirect('/articles');
        
    });
    
    
});

module.exports = router;


