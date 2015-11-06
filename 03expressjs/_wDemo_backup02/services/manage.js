module.exports = new function(){
	
	// avoid bug of override model after compile
	this.Category = require('../models/category.model.js');
	this.Article = require('../models/article.model.js');
	
	
	
	
	this._ = require('underscore');
	
	
	
	// (another option: style='white-space: pre')
	this.textareaParse = function (content){
		content = content.replace(/\n?\r\n/g, '<br />' );
		return content;
	}
	
	this.connectflashParse = function(message){		
		message = message.replace('<ul class="success">', '<ul class="alert alert-success">');
		message = message.replace('<ul class="info">', '<ul class="alert alert-info">');
		message = message.replace('<ul class="warning">', '<ul class="alert alert-warning">');
		message = message.replace('<ul class="danger">', '<ul class="alert alert-danger">');
		return message;
	}
	
}