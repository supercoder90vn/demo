var myApp = angular.module('myApp',['ngMessages', 'ngResource']);

myApp.controller('mainController',['$scope','$filter','$timeout', '$http',function($scope, $filter,$timeout,$http){
    
    $scope.handle = '';
    
    $scope.lowercasehandler = function(){
        return $filter('lowercase')($scope.handle);
    };
    
    $scope.characters = 5;
    
    $scope.alertClick = function(){
        $scope.name = 'John';
        alert("Clicked!");
    }

     /*~~~~~~~~~~~~~~~~~~~~~~~~~
        WAY 1  : use XMLHttpRequest of  AJAX
    ~~~~~~~~~~~~~~~~~~~~~~~~*/
    /*var rulesrequest = new XMLHttpRequest();
    rulesrequest.onreadystatechange = function(){
       $scope.$apply(function(){ // for $watch works
            if(rulesrequest.readyState == 4 && rulesrequest.status ==200){               
                $scope.rules = JSON.parse(rulesrequest.responseText);
            }
       });
    }
    
    rulesrequest.open("GET", "http://localhost:2844/02angularjs/04_Data_Binding_and_Directives/api",true);
    rulesrequest.send();*/
    /*~~~~~~~~~~~~~~~~~~~~~~~~~
        WAY 2  : use $http of Angular
    ~~~~~~~~~~~~~~~~~~~~~~~~*/
    var api = '/02angularjs/04_Data_Binding_and_Directives/api';
    $http.get(api)
        .success(function(result){        
            $scope.rules = result;        
        })
        .error(function(data, status){        
            console.log(data);
        
        });
    $scope.newRule = '';
    $scope.addRule = function(){
        $http.post( api, {newRule: $scope.newRule} )
            .success(function(result) {
        
                $scope.rules = result;
                $scope.rule = '';            

            })
            .error(function(data, status){

                console.log(data);

            });
        
    };

    
}]);

