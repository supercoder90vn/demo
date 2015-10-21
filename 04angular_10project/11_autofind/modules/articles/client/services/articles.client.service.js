'use strict';
/******************************************************/
// PHUC LOG
  //console.log("article:::::::::::Client::services::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::");
  var phCount = 0;
  var phlog = function(message) {
    /*phCount+=1;
    console.log('*article----------Client::services------------------------------------------------------');
    console.log(phCount+' ____'+message);
    console.log('--------------------------------------------------------------------------------------*');*/
  };
/******************************************************/
//Articles service used for communicating with the articles REST endpoints
angular.module('articles').factory('Articles', ['$resource',  function ($resource) {
    phlog("___factory: function($resource)");
    return $resource('api/articles/:articleId', {
      articleId: '@_id' // ??????????
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
