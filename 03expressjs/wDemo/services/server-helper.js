module.exports = new function(){
	
	// avoid bug of override model after compile
	this.Category = require('../models/category.model.js');
	this.Article = require('../models/article.model.js');	
	
	
}

module.exports.log =  function(text){
		console.log('\n* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\n');
		for(var i=0; i< arguments.length;i++){
			console.log(arguments[i]);
		}
		return 	logger;	
	}
	var logger = new function(){
		this.next = function(arg){
			console.log();
			for(var i=0; i< arguments.length;i++){
				console.log(arguments[i]);
			}
			return logger;
		}
		this.end = function(){
			console.log('\n================================================================================\n');
		}
		this.keys = function(obj){
			for (var key in obj) {
				if (obj.hasOwnProperty(key)) {
					console.log(key);
				}
			}
			return logger;
		}
		this.props = function(obj){
			for (var key in obj) {
				if (obj.hasOwnProperty(key)) {
					console.log('\n---'+key);
					console.log(obj[key]);
				}
			}
			return logger;
		}
	}	