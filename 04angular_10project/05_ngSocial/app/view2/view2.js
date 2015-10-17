'use strict';

angular.module('ngSocial.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    console.log('...config ngSocial.view2');
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', [function() {
     console.log('...controller View2Ctrl');
}]);