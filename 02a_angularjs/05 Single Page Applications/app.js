var myApp = angular.module('myApp',['ngRoute'])

.config(function($routeProvider){
    
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
})

.service('nameService', function(){
    
    this.name = this.name || 'John Doe';
    var self = this;
    this.namelength = function(){
        return self.name.length;
    }
    
})


.controller('mainController',['$scope', '$log','nameService',function($scope, $log,nameService){
    $scope.name = nameService.name;
    
    $scope.$watch('name', function(){
        nameService.name = $scope.name;
    });
    
    
    $log.log(nameService.name);
    $log.log(nameService.namelength());
    
}])

.controller('secondController',['$scope', '$log','$routeParams','nameService',function($scope, $log, $routeParams,nameService){
    
    $scope.num = $routeParams.num || 1;
    
     $scope.name = nameService.name;
    
    $scope.$watch('name', function(){
        
        nameService.name = $scope.name;
        
    });
    
}]);

