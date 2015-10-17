var myApp = angular.module('myApp',[]);

myApp.controller('mainController',['$scope', '$http',function($scope, $http){
    // 1. GET
    $http.get('/api')
        .success(function(result){
        
            $scope.rules = result;
        
        })
        .error(function(data, status){
        
            console.log(data);
        
        });
    
    // 2. POST
    $scope.newRule = '';
    
    $scope.addRule = function(){
        $http.post( '/api', {newRule: $scope.newRule} )
            .success(function(result) {
        
                $scope.rules = result;
                $scope.rule = '';            

            })
            .error(function(data, status){

                console.log(data);

            });
        
    };
}]);

