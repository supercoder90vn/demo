'use strict';

// Jobs controller
angular.module('jobs').controller('JobsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Jobs',
	function($scope, $stateParams, $location, Authentication, Jobs) {
		$scope.authentication = Authentication;

		// Create new Job
		$scope.create = function() {
			// Create new Job object
			var job = new Jobs ({
				company: this.company,
				title: this.title,
				job_type: this.job_type,
                location: this.location,
                how_to_apply: this.how_to_apply,
                contact_email: this.contact_email,
                contact_website: this.contact_website,
                contact_phone: this.contact_phone,
                job_description: this.job_description
			});

			// Redirect after save
			job.$save(function(response) {
				$location.path('jobs/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Job
		$scope.remove = function(job) {
			if ( job ) { 
				job.$remove();

				for (var i in $scope.jobs) {
					if ($scope.jobs [i] === job) {
						$scope.jobs.splice(i, 1);
					}
				}
			} else {
				$scope.job.$remove(function() {
					$location.path('jobs');
				});
			}
		};

		// Update existing Job
		$scope.update = function() {
			var job = $scope.job;

			job.$update(function() {
				$location.path('jobs/' + job._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Jobs
		$scope.find = function() {
			$scope.jobs = Jobs.query();
		};

		// Find existing Job
		$scope.findOne = function() {
			$scope.job = Jobs.get({ 
				jobId: $stateParams.jobId
			});
		};

		$scope.filterOptions = {
			job_types: [
				{name: 'Show All'},
				{name: 'Accounting'},
				{name: 'Automotive'},
                {name: 'Banking'},
                {name: 'Construction'},
                {name: 'Education'},
                {name: 'Engineering'},
                {name: 'General Business'},
                {name: 'Human Resources'},
                {name: 'Hotel'},
                {name: 'Insurance'},
                {name: 'Legal'},
                {name: 'Manufacturing'},
                {name: 'Marketing'},
                {name: 'Other'},
                {name: 'Retail'},
                {name: 'Technology'},
                {name: 'Telecommunications'},
                {name: 'Transportation'}
			]
		};

		$scope.filterItem = {
			job_type: $scope.filterOptions.job_types[0]
		}

		$scope.customFilter = function(data){
			if(data.job_type == $scope.filterItem.job_type.name){
				return true;
			} else if($scope.filterItem.job_type.name === 'Show All'){
				return true;
			} else {
				return false;
			}
		}
	}
]);