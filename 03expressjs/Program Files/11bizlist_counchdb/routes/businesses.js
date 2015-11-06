var express = require('express');
var router = express.Router();
var nodeCouchDB = require('node-couchdb');
var couch = new nodeCouchDB('localhost', 5984);
var uuid = require('node-uuid');


router.get('/', function(req, res, next) {
	var dbName = 'bizlist';
	var viewUrl = '_design/all/_view/all';
	var queryOptions = {};

	couch.get(dbName, viewUrl, queryOptions, function(err, resData){
		if(err){
			res.send(err);
		} else {
			res.render('businesses',{
				businesses: resData.data.rows
			});
		}
	});
});

router.get('/add', function(req, res, next) {
  res.render('addbusiness');
});

router.get('/show/:id', function(req, res, next) {
  couch.get('bizlist', req.params.id, function(err, resData){
  	if(err){
  		res.send(err);
  	} else {
  		res.render('show', {
  			business:resData.data
  		});
  	}
  });
});

router.get('/edit/:id', function(req, res, next) {
	couch.get('bizlist', req.params.id, function(err, resData){
  	if(err){
  		res.send(err);
  	} else {
  		res.render('editbusiness', {
  			business:resData.data
  		});
  	}
  });
});

router.get('/category/:category', function(req, res, next) {
    var dbName = 'bizlist';
	var viewUrl = '_design/by_category/_view/by_category';
	var queryOptions = {key: req.params.category};

	couch.get(dbName, viewUrl, queryOptions, function(err, resData){
		if(err){
			res.send(err);
		} else {
			res.render('businesses',{
				businesses: resData.data.rows
			});
		}
	});
});

router.post('/add', function(req, res, next) {
	 req.checkBody('name', 'Name is required').notEmpty();
	 req.checkBody('category', 'Category is required').notEmpty();
	 req.checkBody('city', 'City is required').notEmpty();

	 var errors = req.validationErrors();

	 if(errors){
	 	res.render('addbusiness', {
	 		errors: errors
	 	});
	 } else {
	 	couch.insert('bizlist', {
	 		_id: uuid.v1(),
	 		name: req.body.name,
	 		category: req.body.category,
	 		website: req.body.website,
		    phone: req.body.phone,
		    address: req.body.address,
		    city: req.body.city,
		    state: req.body.state,
		    zip: req.body.zip
	 	}, function(err, resData){
	 		if(err){
	 			res.send(err);
	 		} else {
	 			req.flash('success', 'Business Added!');
	 			res.redirect('/businesses');
	 		}
	 	});
	 }
});


router.post('/edit/:id', function(req, res, next) {
	 req.checkBody('name', 'Name is required').notEmpty();
	 req.checkBody('category', 'Category is required').notEmpty();
	 req.checkBody('city', 'City is required').notEmpty();

	 var errors = req.validationErrors();

	 if(errors){
	 	res.render('editbusiness', {
	 		errors: errors
	 	});
	 } else {
	 	couch.get('bizlist',req.params.id, function(err, resData){
	 		var rev = resData.data._rev

	 		// Do Update
	 		couch.update('bizlist', {
	 		_id: req.params.id,
	 		_rev: rev,
	 		name: req.body.name,
	 		category: req.body.category,
	 		website: req.body.website,
		    phone: req.body.phone,
		    address: req.body.address,
		    city: req.body.city,
		    state: req.body.state,
		    zip: req.body.zip
	 	}, function(err, resData){
	 		if(err){
	 			res.send(err);
	 		} else {
	 			req.flash('success', 'Business Updated!');
	 			res.redirect('/businesses');
	 		}
	 	});
	 	});
	 }
});


router.post('/delete/:id', function(req, res){
	couch.get('bizlist',req.params.id, function(err, resData){
	 		var rev = resData.data._rev
	 		// Do Delete
	 		couch.del('bizlist',req.params.id, rev, function(err, resData){
	 		if(err){
	 			res.send(err);
	 		} else {
	 			req.flash('success', 'Business Removed!');
	 			res.redirect('/businesses');
	 		}
	 	});
	 	});
});

module.exports = router;
