//console.log($("h1").attr("reply"));
var myApp = angular.module('myApp',['ngMessages', 'ngResource']);
//=> error  for minification : myApp.controller('mainController',function($scope, $log,$filter, $resource){});
myApp.controller('mainController',['$scope','$filter',function($scope, $filter){
    $scope.handle = '';
    $scope.lowercasehandler = function(){
        return $filter('lowercase')($scope.handle);
    };
    
}]);

