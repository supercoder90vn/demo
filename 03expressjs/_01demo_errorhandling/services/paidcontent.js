var express = require('express');

var error;
var doc;

var  createDoc = function(){
	doc = {title:'weather',content:'This day is good'};
	error = null;
};

var createError = function(){
	doc = null;
	error = new Error('error at paidcontent service');	
};

var paidcontent  = function(){	
	this.find = function(callback){
		createDoc();
		callback(error,doc);
	};	
	this.find2 = function(callback){
		createError();
		callback(error,doc);
	};	
};


module.exports = new paidcontent();
