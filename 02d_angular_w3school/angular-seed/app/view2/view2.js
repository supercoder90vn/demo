'use strict';

angular.module('phApp.view2', [])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope','$rootScope',function($scope, $rootScope) {
  	$rootScope.view = 'view2';
	  
	$scope.init_VII =function(){
    // 1.
		$scope.master = {firstName: 'John', lastName: 'Doe'}; 
    $scope.reset = function() {
      $scope.user = angular.copy($scope.master);
    };
    $scope.reset();
	  // 2.
		$scope.up_to_low_1 = "JOHN";
    $scope.up_to_low_2 = angular.lowercase($scope.up_to_low_1);
    
    $scope.low_to_up_1 = "john";
    $scope.low_to_up_2 = angular.uppercase($scope.low_to_up_1);
    // 3.
    $scope.string_or_number = "John"
    $scope.isString = angular.isString( $scope.string_or_number);
    $scope.isNumber = angular.isNumber( $scope.string_or_number);
    // 4. json
    var jsonString='{"prop":"value"}';
    var object2 = {prop2:'value2'};
    /// option 1
    $scope.eval=$scope.$eval(jsonString);
    /// option 2 (faster than option1)
    $scope.fromJson=angular.fromJson(jsonString);
    $scope.stringFromObject = angular.toJson(object2);
	};
   
}]);