var myApp = angular.module('myApp',['ngRoute']);

myApp.config(function($routeProvider){
    
    $routeProvider
    
    .when('/',{
        templateUrl: 'pages/main.html',
        controller: 'mainController'
    })
    
    .when('/second',{
        templateUrl: 'pages/second.html',
        controller: 'secondController'
    })
    .when('/second/:num',{
        templateUrl: 'pages/second.html',
        controller: 'secondController'
    })
});



myApp.controller('mainController',['$scope', '$log','nameService',function($scope, $log){
    

    
}]);

myApp.controller('secondController',['$scope', '$log','$routeParams','nameService',function($scope, $log, $routeParams){
    

    
}]);

