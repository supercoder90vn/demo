//console.log($("h1").attr("reply"));
var myApp = angular.module('myApp',['ngMessages', 'ngResource']);
//=> error  for minification : myApp.controller('mainController',function($scope, $log,$filter, $resource){    });
myApp.controller('mainController',['$scope','$log','$filter','$resource',function($scope, $log,$filter, $resource){   
   
    $log.log($scope);
     $log.log($resource);
    $log.log($log);
}]);


var searchPeople = function(firstName, lastName, height, age, occupation){
    return 'Jane Doe';
}
console.log(angular.injector().annotate(searchPeople));