'use strict';
/******************************************************/
// PHUC LOG
  //console.log(":::::::::::Server::controller::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::");
  var phCount = 0;
  var phlog = function(message) {
    /*phCount+=1;
    console.log('*--------------------------------------------------------------------------------------');
    console.log(phCount+' ____'+message);
    console.log('--------------------------------------------------------------------------------------*');*/
  };
/******************************************************/
/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));
  
/**
 * List of Articles
 */
exports.list = function (req, res) {
  phlog("____Server::exports.list..");
  Article.find().sort('-created').populate('user', 'displayName').exec(function (err, articles) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(articles);
    }
  });
};
  
  
/**
 * Create a article
 */
exports.create = function (req, res) {
  phlog("____Server::exports.create..");
  var article = new Article(req.body);
  console.log(req.body);
  console.log("------------------");
  console.log(req.user);
  article.user = req.user;

  article.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(article);
    }
  });
};
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//phuc: read, update, delete has param articleId, then it gets articleByID() as middleware ( route.js)
//~~~~~~~~~~~~~

// 1. READ a article
exports.read = function (req, res) {
  phlog("____ Server::exports.read..");
  res.json(req.article);
};
// 2. UPDATE a article
exports.update = function (req, res) {
  phlog("____Server::exports.update..");
  var article = req.article;

  article.title = req.body.title;
  article.content = req.body.content;

  article.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(article);
    }
  });
};
// 3. UPDATE a article
exports.delete = function (req, res) {
  phlog("____Server::exports.delete..");
  var article = req.article;

  article.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(article);
    }
  });
};



/**
 * Article middleware
 */
exports.articleByID = function (req, res, next, id) {
  phlog("<middleware> ___Server::exports.articleByID... ");
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Article is invalid'
    });
  }

  Article.findById(id).populate('user', 'displayName').exec(function (err, article) {
    if (err) {
      return next(err);
    } else if (!article) {
      return res.status(404).send({
        message: 'No article with that identifier has been found'
      });
    }
    req.article = article;
    next();
  });
};
