'use strict';

angular.module('phApp.view_taskrabbit', [])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view_taskrabbit', {
    templateUrl: 'view_taskrabbit/view_taskrabbit.html',
    controller: 'ViewTaskRabbitCtrl'
  });
}])

.controller('ViewTaskRabbitCtrl', ['$scope','$rootScope',function($scope, $rootScope) {
  	$rootScope.view = 'view_taskrabbit';
	  
   
}]);