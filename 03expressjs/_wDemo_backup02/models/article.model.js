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
		subject:{
			type: String
		},
		body:{
			type: String
		},
		author:{
			type: String
		},
		email:{
			type: String
		},
		time:{
			type: Date,
			default: Date.now
		}
	}]
});

var Article = module.exports = mongoose.model('Article', articleSchema);

///////////////////////////////////////////////////////////////////////////
// I.
// 1. Get list of Articles
module.exports.getArticles = function(callback, limit){
	Article.find({}, callback).limit(limit).sort([['created_at', 'descending']]);;
}

// 2. Add Article
module.exports.addArticle = function(article, callback){
	Article.create(article, callback);
}

// 3.a Get Single Article
module.exports.getArticleById = function(id, callback){
	Article.findById(id, callback);
}
// 3.b Get Single Article
module.exports.getArticlesByCategory  = function(category, callback,limit){
	Article.find({category:category}, callback).limit(limit).sort([['created_at', 'descending']]);;
}
// 4. Update Article by Id
module.exports.updateArticleById = function(id, update, callback){
	Article.findByIdAndUpdate(id, update, callback)
}

// 5. remove Article by Id
module.exports.removeArticleById = function(id,  callback){	
	//Article.findByIdAndRemove(id, options, callback)
	Article.findByIdAndRemove(id, callback) ;
}
///////////////////////////////////////////////////////////////////////////
// II. Comment

// 1. Add Comment
module.exports.addCommentByArticleId = function(id, comment, callback){
	// ref: https://docs.mongodb.org/manual/reference/operator/update/push/
	Article.findByIdAndUpdate(id,
		{ $push: {"comments": comment}},
		callback
	);
};
///////////////////////////////////////////////////////////////////////////
//  OHTER SERVICES

// 1. comment
module.exports.createComment = function(req_body){
	if(req_body){
		return {
			"subject": req_body.comment_subject,
			"author": req_body.comment_author,
			"email": req_body.comment_email,
			"body": req_body.comment_body			
		}
	}
	else{
		return {
			subject:"",			
			author:"",
			email: "",
			body:""
		};
	}	
};
// 2. articles
module.exports.createArticle = function(req_body){
	if(req_body){
		return {
			"title": req_body.title,
			"subtitle": req_body.subtitle,
			"email": req_body.email,
			"category": req_body.category,
			"body": req_body.body,
			"seller": req_body.seller,		
		};
	}
	else{
		return {
			title: "",
			subtitle: "",
			email: "",
			category: "",
			body: "",
			seller: "",
		};
	}
};