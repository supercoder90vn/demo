var request = require('request');


module.exports = new function(){	
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
		message = message.replace('<ul class="error">', '<ul class="alert alert-danger">');
		return message;
	}	
}

///////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////
// II.  Reuse many time for ROUTERS
/* (1. Show list of category at category VIEW 
 	2. at selecting tag for category at add-article VIEW, eding-article VIEW.*/

module.exports.findCategories = function(res, callback){
	var api = 'http://localhost:3000/api/categories';
	request.get(api, function(err, response, categories) {
		if (!err && response.statusCode == 200) {
			callback(categories);
		}
		else{
			var error = "Error in accessing "+ api;
			res.send(error);
		}
	});
}