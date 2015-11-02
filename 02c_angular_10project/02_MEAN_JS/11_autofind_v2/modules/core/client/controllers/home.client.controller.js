'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication','Cars','$location',
  function($scope, Authentication, Cars, $location) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    // Find a list of Cars
    $scope.find = function() {
      $scope.query = {
        make : 0, model:0 , state :0, type :0
      };
      
      $scope.cars = Cars.query();
    };
    
    // Search List
    $scope.search = function() {
      console.log('home search________________________________________________________');      
      $location.path('cars/search/'+$scope.query.make+'/'+$scope.query.model+'/'+$scope.query.state+'/'+$scope.query.type);
    };
  }
]);