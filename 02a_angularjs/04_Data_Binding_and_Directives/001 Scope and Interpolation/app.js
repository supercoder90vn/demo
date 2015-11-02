//console.log($("h1").attr("reply"));
var myApp = angular.module('myApp',['ngMessages', 'ngResource']);
//=> error  for minification : myApp.controller('mainController',function($scope, $log,$filter, $resource){});
myApp.controller('mainController',['$scope','$log','$timeout',function($scope, $log, $timeout){     
	$scope.setTimeout = function(){
		$scope.name_timeout = '______';
	    $timeout(function(){
	        $scope.name_timeout = 'Everybody';
	    },2000);	
	}   
	$scope.setTimeout();
}]);

