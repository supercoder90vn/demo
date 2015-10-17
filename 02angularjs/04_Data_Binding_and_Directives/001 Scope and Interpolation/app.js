//console.log($("h1").attr("reply"));
var myApp = angular.module('myApp',['ngMessages', 'ngResource']);
//=> error  for minification : myApp.controller('mainController',function($scope, $log,$filter, $resource){});
myApp.controller('mainController',['$scope','$log','$timeout',function($scope, $log, $timeout){  
   
   $scope.name = 'Tony';
    $timeout(function(){
        $scope.name = 'Everybody';
    },3000);
}]);

