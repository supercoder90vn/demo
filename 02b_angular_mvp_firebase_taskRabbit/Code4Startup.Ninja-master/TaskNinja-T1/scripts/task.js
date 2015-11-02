'use strict';

app.controller('TaskController', function($scope, $firebase, FURL, $location, $routeParams) {

	var ref = new Firebase(FURL);
	$scope.tasks = $firebase(ref.child('tasks')).$asArray();
    console.log($scope.tasks );
	var taskId = $routeParams.taskId;

	
	
	if(taskId) {
		$scope.selectedTask = getTask(taskId);
	}

	function getTask(taskId) {
		return $firebase(ref.child('tasks').child(taskId)).$asObject();
	};

	$scope.postTask = function(task) {
		$scope.tasks.$add(task);
		$location.path('/');
	};	

	$scope.updateTask = function(task) {
		$scope.selectedTask.$save(task);
		$location.path('/');
	};
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	/*
	var ref = new Firebase(FURL);
	$scope.tasks = $firebase(ref.child('tasks')).$asArray();
    $scope.postTask = function(task) {
		$scope.tasks.$add(task);
		$location.path('/');
	};*/	

});