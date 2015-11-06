var mongoose = require('mongoose');

// Article Schema
var articleSchema = mongoose.Schema({
	title: {
		type: String
	},
	subtitle: {
		type: String
	},
	category: {
		type: String
	},
	body: {
		type: String
	},
	seller: {
		type: String
	},
	created_at: {
		type: Date,
		default: Date.now
	},
	comments: [{
		comment_subject:{
			type: String
		},
		comment_body:{
			type: String
		},
		comment_author:{
			type: String
		},
		comment_email:{
			type: String
		},
		comment_date:{
			type: String
		}
	}]
});

var Article = module.exports = mongoose.model('Article', articleSchema);

// 1. Get Articles
module.exports.getArticles = function(callback, limit){
	Article.find({}, callback).limit(limit).sort([['created_at', 'descending']]);;
}

// 2. Add Article
module.exports.addArticle = function(article, callback){
	Article.create(article, callback);
}

// 3. Get Single Article
module.exports.getArticleById = function(id, callback){
	Article.findById(id, callback);
}

// 4. Update Article by Id
module.exports.updateArticleById = function(id, update, callback){
	Article.findByIdAndUpdate(id, update, callback)
}

// 4. remove Article by Id
module.exports.removeArticleById = function(id,  callback){
	
	//Article.findByIdAndRemove(id, options, callback)
	Article.findByIdAndRemove(id, callback) ;
}