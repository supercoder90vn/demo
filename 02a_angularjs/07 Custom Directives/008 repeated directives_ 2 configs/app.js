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





myApp.controller('mainController',['$scope', '$log',function($scope, $log){

    $scope.people =[
        {
            name: 'John Doe',
            address: '555 Main St.',
            city: 'New York',
            state: 'NY',
            zip: '1111',
        },
        {
            name: 'John Doe 2',
            address: '555 Main St.2',
            city: 'New York 2',
            state: 'NY 2',
            zip: '1111 2',
        },
    ];
    
    $scope.formattedAddress = function(person){
        return person.address + ', ' + person.city + ', ' + person.state + ' ' + person.zip;
    };
    
}]);

myApp.controller('secondController',['$scope', '$log','$routeParams',function($scope, $log, $routeParams){
    $scope.num = '2';
    
}]);

myApp.directive("searchResult", function(){
    return {
        restrict: 'AECM', //'A', 'C','M', 'E', 'AE'(default) => element, attribute, class, comment
        templateUrl: 'directives/searchresult.html',
        replace: true,
        scope:{
            personObject: "=", // be careful
            formattedAddressFunction: "&"
            
        }
    };

});




