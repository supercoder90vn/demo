module.exports = new function(){
	
	// avoid bug of override model after compile
	this.Category = require('../models/category.model.js');
	this.Article = require('../models/article.model.js');	
	
}