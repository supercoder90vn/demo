module.exports = new function(){
	console.log();console.log("manager__________________________________test");console.log();
	
	// avoid bug of override model after compile
	this.category = require('../models/Category.js');
	this.article = require('../models/article.js');
	
	
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