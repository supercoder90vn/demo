'use strict';

console.log("...global  myContacts");
angular.module('myContacts', [
  'ngRoute',
    'firebase',
    'myContacts.contacts'
]).
config(['$routeProvider', function($routeProvider) {
     console.log("...config route  myContacts");
  $routeProvider.otherwise({redirectTo: '/contacts'});
}]);
