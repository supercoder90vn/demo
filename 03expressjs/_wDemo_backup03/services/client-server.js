
module.exports = new function(){
	///////////////////////////////////////////////////////////////////
	// I.  DB HELPER
	// 1. comment
	this.createComment = function(req_body){
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
	this.createArticle = function(req_body){
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
};