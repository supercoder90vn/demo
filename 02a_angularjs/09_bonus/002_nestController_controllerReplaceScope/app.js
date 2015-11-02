// MODULE
var myApp = angular.module('myApp',['ngRoute', 'ngResource']);

myApp.controller('parent1Controller', ['$scope', function($scope){
    $scope.message = 'Parent 1 Message!';
}]);

myApp.controller('child1Controller', ['$scope', function($scope){
    $scope.message = 'Child 1 Message!';
}]);

myApp.controller('parent2Controller', [ function(){
    this.message = 'Parent 2 Message!';
}]);


myApp.controller('child2Controller', [function(){
    this.message = 'Child 2 Message!';
}]);