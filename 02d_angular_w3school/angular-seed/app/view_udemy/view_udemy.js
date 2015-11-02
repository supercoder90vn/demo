'use strict';

angular.module('phApp.view_udemy', [])
	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/view_udemy/:page', {
			templateUrl: 'view_udemy/view_udemy.html',
			controller: 'ViewUdemyCtrl'
		});
	}])

	.controller('ViewUdemyCtrl', ['$scope', '$rootScope', '$timeout', '$filter', '$http', 'ServiceCustom', '$routeParams', function ($scope, $rootScope, $timeout, $filter, $http, ServiceCustom, $routeParams) {

		$rootScope.view = 'view_udemy';

		$scope.init_XII = function () {
			$scope.$watch('name_timeout', function (newValue, oldValue) {
				console.info('$watch(name_timeout)~~~~~');
				console.log('Old:' + oldValue);
				console.log('New:' + newValue);
			});

			$scope.set_timeout = function () {
				$scope.name_timeout = '______';
				//TIME_OUT_01 (from java script)
				setTimeout(function () {
					$scope.$apply(function () {// apply for angular: data binding & watcher
						$scope.name_timeout = 'Everybody 1';
						console.log('Scope changed! 1');
					});
				}, 2000);


				$timeout(function () {//TIME_OUT_02  (better)
					$scope.name_timeout = 'Everybody 2';
				}, 3000);
			}
			$scope.set_timeout();

		}
		$scope.init_XIII = function () {
			$scope.up_to_low = $filter('lowercase')('PHUC');
			var api = 'http://localhost:8000/app/'+'view_udemy/api.json';
			$http.get(api)
				.success(function(result){				
					$scope.rules = result;
					$scope.filteredData = $filter('filter')(result, function(d){
						return d.ID == 3;
					});				
				})
				.error(function(data, status){				
					console.log(data);				
				});
			
		}
		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		$scope.init_XIV = function () {
			$scope.characters = 5;
			/*var api = 'http://localhost:8000/app/'+'view_udemy/api.json';
			$http.get(api)
				.success(function(result){				
					$scope.rules = result;				
				})
				.error(function(data, status){				
					console.log(data);				
				});
			$scope.newRule = '';
			$scope.addRule = function(){
				$http.post( 'C:/Program Files/api.json', {newRule: $scope.newRule} )
					.success(function(result) {				
						$scope.rules = result;
						$scope.rule = '';		
					})
					.error(function(data, status){		
						console.log(data);		
					});				
			};*/
		}

		$scope.init_XV = function () {
			$scope.serviceCustom = ServiceCustom;
		}
		$scope.init_XVI = function () {
			$scope.routeParams = $routeParams;			
		}
		$scope.init_XVII = function () {
			//1
			$scope.person ={
				name: 'John Doe',
				address: '555 Main St., New York, NY 1111'
    		}		
			//2
			$scope.person02 ={
				firstname: 'Phuc',
				lastname: 'Ho'
    		}
			$scope.getFullName = function(person){
				return person.firstname + ' ' +person.lastname;
			}
			//3
			$scope.people =[
				{
					name: 'David',
					lastname: 'Smith'
				},
				{
					name: 'Tim',
					lastname: 'Heaven'
				},
				{
					name: 'Mary',
					lastname: 'Swift'
				}
			];
		}
	}])
	//
	.controller('parent1Controller', ['$scope', function($scope){
		$scope.message = 'Parent 1 Message!';
	}])	
	.controller('child1Controller', ['$scope', function($scope){
		$scope.message = 'Child 1 Message!';
	}])	
	.controller('parent2Controller', [ function(){
		this.message = 'Parent 2 Message!';
	}])	
	.controller('child2Controller', [function(){
		this.message = 'Child 2 Message!';
	}])
	
	
	// custom directive
	// myDirective => my-directive
	.directive("myDirective", function () {	  
    return {
      restrict: 'AECM', //'A', 'C','M', 'E', 'AE'(default) => element, attribute, class, comment
      template: ' <a href="#" class="list-group-item active"><h4 class="list-group-item-heading">Doe, John</h4><p class="list-group-item-text">555 Main St., New York, NY 11111 </p></a>',
      replace: true
    }})
	.directive("myDirectiveWithUrl", function(){
    return {
        restrict: 'E', 
        templateUrl: 'view_udemy/directives/myDirective.html',
        replace: true
    }})
	.directive("myDirectiveWithScope", function(){
    return {
        restrict: 'E', 
        templateUrl: 'view_udemy/directives/myDirective_scope.html',
        replace: true,
        scope:{
            personName: "@", // primitive
            personAddress: "@", 
        }
    }})
	.directive("myDirectiveWithScope02", function(){
    return {
        restrict: 'E', 
        templateUrl: 'view_udemy/directives/myDirective_scope02.html',
        replace: true,
		// OTHER OPTIONS~~~~~~~
        scope:{
			personObject: "=", // object => be careful
			getFullName: "&" // method
        },
        compile: function(elem, attrs){// RARE OR NEVER use ( use link instead )
            //console.log('Compiling...');
            //elem.removeAttr('class');
            //console.log(elem);
           // console.log(elem.html());
            
            return{
                /*pre: function(scope, elements, attrs){// avoid to use
                    console.log('Pre-linking...');
                    console.log(elements);
                },*/
                post: function(scope, elements, attrs){
                    //console.log('Post-linking...');
                   // console.log(scope);
                    if(scope.personObject.name == 'Tim'){
                        scope.personObject.name = scope.personObject.name +'____________is changed at COMPILE_POST _____________________________________';
                    }
                    
                    //console.log(elements);
                }
            }
        },
		// Cannot use link if already using compile
        link: function(scope, elements, attrs){
            console.log('Linking...');
            console.log(scope);
            if(scope.personObject.name == 'Mary'){
				scope.personObject.name = scope.personObject.name +'____________is changed at LINK _____________________________________';
			}

           //console.log(elements);
        } 
    }})
;
	