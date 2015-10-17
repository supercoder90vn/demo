'use strict';

angular.module('ngSocial.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    console.log('...config ngSocial.view1');
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', [function() {
    console.log('...config View1Ctrl');
}]);