//console.log($("h1").attr("reply"));
var myApp = angular.module('myApp',['ngMessages', 'ngResource']);
//=> error  for minification : myApp.controller('mainController',function($scope, $log,$filter, $resource){});
myApp.controller('mainController',['$scope','$filter','$timeout',function($scope, $filter,$timeout){
    $scope.handle = '';
    $scope.lowercasehandler = function(){
        return $filter('lowercase')($scope.handle);
    };
    
    $scope.$watch('handle',function(newValue, oldValue){
        console.info('Changed!');              
        console.log('Old:' + oldValue);
        console.log('New:' + newValue);
    });
    //TIME_OUT_01
    setTimeout(function(){
        $scope.$apply(function(){// apply for angular: data binding & watcher
            $scope.handle = 'newtwitterhandle 1';
            console.log('Scope changed! 1');
        });        
    },3000);
    
    //TIME_OUT_02
    
     $timeout(function(){
        $scope.handle = 'newtwitterhandle 2';
        console.log('Scope changed! 2');   
    },4000);
    
}]);

