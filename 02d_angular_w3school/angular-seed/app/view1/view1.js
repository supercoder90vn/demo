'use strict';

angular.module('phApp.view1', [])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$rootScope','$scope','$http','ServiceCustom',function($rootScope,$scope, $http,ServiceCustom) {
	$rootScope.view = 'view1';
	$scope.init_I_4 =function(){
		$scope.jsArr = [1,2,3 , 3]
		$scope.jsArr.push('jsArr.push');
	}
	
	$scope.init_II =function(){
		$scope.jsFirstName= "John";
		$scope.jsLastName= "Doe";	
	}
	
	$scope.init_III_3 =function(){
		$scope.jsNames = [
			{name:'Jani',country:'Norway'},
			{name:'Hege',country:'Sweden'},
			{name:'Kai',country:'Denmark'}
		];
	}			
	
	$scope.init_IV =function(){
		var url = 'http://localhost:8000/app/';
		$http.get(url+'view1/data.json')  //=> only support http://
		//$http.get("http://www.w3schools.com/angular/customers.php")
		.success(function(response) {
			$scope.jsJsonData = response.records;
		})
		.error(function(data, status){        
            console.log(data);
        
        });		
	}
}]);