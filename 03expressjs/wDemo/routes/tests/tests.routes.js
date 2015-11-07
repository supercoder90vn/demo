var express = require('express');
var router = express.Router();

var ServerHelper = require('../../services/server-helper.js');
var ClientHelper = require('../../services/client-helper.js');

var Category = ServerHelper.Category;
var Article = ServerHelper.Article;

var _ = ClientHelper._;
var data = require('./tests.data.js');


/* 
module help 1> auto CREATE Database for Categories and articles
			2> DELETE all Database  for Categories and articles
*/


var categories = _(data.categories).map(function(x){return {title:x}});

var randomArticle = function(){
	return {
		title: _.sample(data.articleTitles),
		subtitle: _.sample(data.articleSubtiles),
		category: _.sample(data.categories),
		reporter: data.randomFullname(),
		body:_.sample(data.articleBodies)
	}
}
var randomComments = function(){	
	var comments = _.sample(data.comments,_.random(0, 5));
	
	return _(comments).map(function(comment){
		var nameArr = data.randomTwoNames();
		return {
			subject:_.sample(data.commentSubjects),
			body:comment,
			author:data.fullnameFrom2Name(nameArr),
			email:data.emailFrom2Name(nameArr)
		}
	});
}



var deleteAllDatabases = function(req, res, next) {
	// delete all
	Category.remove({},function(){
		Article.remove({},function(){
			next();					
		});				
	});		
}
router.get('/data/delete'
	, deleteAllDatabases
	,function(req, res, next){
		res.redirect('/articles');
	}
)
router.get('/data/generate'
	, deleteAllDatabases
	,function(req, res, next) {
		// Create Database for Categories
		var count = 0; var length = categories.length;
		for(var i=0; i<length;i++){						
			Category.addCategory(categories[i], function(){
				count++;
				if(count === length){
					next();
				}	
			});
		}		
	},function(req, res, next) {
		// Create Database for Articles
		var completed_articles_count = 0; var length = 10; 
		for(var i=0; i<length;i++){				
			Article.addArticle(randomArticle(), function(err, article){
				// call back from creating Article				
				var comments = randomComments();
				var commentsLength =  comments.length; var commentCount = 0;
				if(commentsLength===0){//* finish 1 article
					completed_articles_count++;					
				}else{
					for(var j=0; j< commentsLength; j++){
						Article.addCommentByArticleId(article._id, comments[j], function(){
							// call back from creating Comment
							commentCount++;
							if (commentCount===commentsLength){ //* finish 1 article							
								completed_articles_count++;
								if(completed_articles_count===length){// finish all articles
									next();	
								}							
							}
						});
					}		
				}							
			});
		}			
	},function(req, res, next) {
		req.flash('success','Created database for Articles, Comments & Categories Successfully');
		res.redirect('/categories');
	}
);
module.exports = router;
