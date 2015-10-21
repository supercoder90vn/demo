'use strict';
/******************************************************/
// PHUC LOG
  //console.log("article:::::::::::Client::controller::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::");
  var phCount = 0;
  var phlog = function(message) {
    /*
    phCount+=1;
    console.log('article----------Client::controller------------------------------------------------------');
    console.log(phCount+' ____'+message);
    console.log('--------------------------------------------------------------------------------------*');*/
  };
/******************************************************/
// Articles controller
angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles',
  function ($scope, $stateParams, $location, Authentication, Articles) {
    $scope.authentication = Authentication;

    // Create new Article
    $scope.create = function (isValid) {
     phlog(" $scope.remove(isValid)");
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'articleForm');

        return false;
      }

      // Create new Article object
      var article = new Articles({
        title: this.title,
        content: this.content
      });
      article.extra = "testAtServer";
      console.log(article);
      // Redirect after save
      article.$save(function (response) {// article is req.body at server
        $location.path('articles/' + response._id);

        // Clear form fields
        $scope.title = '';
        $scope.content = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Article
    $scope.remove = function (article) {
      phlog(" $scope.remove(article)");
      if (article) {
        article.$remove();

        for (var i in $scope.articles) {
          if ($scope.articles[i] === article) {
            $scope.articles.splice(i, 1);
          }
        }
      } else {
        $scope.article.$remove(function () {
          $location.path('articles');
        });
      }
    };

    // Update existing Article
    $scope.update = function (isValid) {
      phlog(" $scope.update(isValid)");
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'articleForm');

        return false;
      }

      var article = $scope.article;
      console.log(article.$update);
      article.$update(function () {
        phlog(" article.$update");
        $location.path('articles/' + article._id);
        
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Articles
    $scope.find = function () {
      $scope.articles = Articles.query();
    };

    // Find existing Article
    $scope.findOne = function () {
      phlog(" $scope.findOne");
      $scope.article = Articles.get({
        articleId: $stateParams.articleId
      });
    };
  }
]);
