'use strict';

// Cars controller
angular.module('cars').controller('CarsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Cars',
	function($scope, $stateParams, $location, Authentication, Cars) {
		$scope.authentication = Authentication;

		// Create new Car
		$scope.create = function() {
			// Create new Car object
			var car = new Cars({
				title: this.title,
				make: this.make,
				model: this.model,
				type: this.type,
				year: this.year,
				price: this.price,
				description: this.description,
				imageurl: this.imageurl,
				state: this.state,
				contact_email: this.contact_email
			});

			// Redirect after save
			car.$save(function(response) {
				$location.path('cars/' + response._id);

				// Clear form fields
				$scope.title = '';
				$scope.make = '';
				$scope.model = '';
				$scope.type = '';
				$scope.year= '';
				$scope.price= '';
				$scope.imageurl = '';
				$scope.description = '';
				$scope.state = '';
				$scope.contact_email = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Car
		$scope.remove = function(car) {
			if (car) {
				car.$remove();

				for (var i in $scope.cars) {
					if ($scope.cars[i] === car) {
						$scope.cars.splice(i, 1);
					}
				}
			} else {
				$scope.car.$remove(function() {
					$location.path('cars');
				});
			}
		};

		// Update existing Car
		$scope.update = function() {
			var car = $scope.car;

			car.$update(function() {
				$location.path('cars/' + car._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Cars
		$scope.find = function() {
			$scope.cars = Cars.query();
			console.log($scope.cars);
		};

		

		// Find existing Car
		$scope.findOne = function() {
			$scope.car = Cars.get({
				carId: $stateParams.carId
			});
		};
		
		$scope.search = function(){
			console.log("search_____________________________");
			
			var query = {};
			if($stateParams.make !=='0' ){
				query.make = $stateParams.make;	
			}
			if($stateParams.model !== '0' ){
				query.model = $stateParams.model;	
			}
			if($stateParams.state !== '0' ){
				query.state = $stateParams.state;	
			}
			if($stateParams.type !== '0' ){
				query.type = $stateParams.type;	
			}			
			console.log(query);
			$scope.cars = Cars.query(query);
		};
	}
]);