var app = angular.module('myApp', [])
.controller('myCtrl', function($scope, $http) {
	
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
		$http.get("data.json")  //=> only support firefox
		//$http.get("http://www.w3schools.com/angular/customers.php")
		.success(function(response) {
			 console.log(response);
			$scope.jsJsonData = response.records;
		})
		.error(function(data, status){        
            console.log(data);
        
        });
		
		
	}
});