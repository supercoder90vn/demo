'use strict';


// Reference: https://github.com/angular/bower-angular-messages
angular.module('phApp', ['ngMessages',
  'ngRoute',
  'phApp.view1',
  'phApp.view2',
  'phApp.view_bootstrap',
  'phApp.service_custom', 'phApp.view_udemy',
  'phApp.view_taskrabbit',
  'phApp.version'
]).
  config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({ redirectTo: '/view1' });
  }])

  ;
