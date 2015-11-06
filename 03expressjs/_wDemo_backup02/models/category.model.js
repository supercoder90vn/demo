var mongoose = require('mongoose');

// Category Schema
var categorySchema = mongoose.Schema({
	title: {
		type: String
	},
	created_at: {
		type: Date,
		default: Date.now
	}
});

var Category = module.exports = mongoose.model('Category', categorySchema);

//1. Get Categories
module.exports.getCategories = function(callback, limit){
	Category.find(callback).limit(limit).sort([['title', 'ascending']]);
}

//2. Add Category
module.exports.addCategory = function(category, callback){
	Category.create(category, callback);
}

//3. remove Category by Id
module.exports.removeCategoryById = function(id,  callback){	
	Category.findByIdAndRemove(id, callback) ;
}

