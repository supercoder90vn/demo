'use strict';

/**
 * @ngdoc function
 * @name pnChatApp.controller:JoinCtrl
 * @description
 * # JoinCtrl
 * Controller of the pnChatApp
 */
angular.module('pnChatApp')
  .controller('JoinCtrl',['$scope','$rootScope','$location', 'PubNub',function ($scope,$rootScope,$location,PubNub) {
     console.log('... Controller JoinCtrl Initialized');
    $scope.data ={
        username: 'User_'+ Math.floor(Math.random()*1000)
    };
    $scope.join = function(){
        console.log('Joining...');
    	var _ref, _ref1;
        $rootScope.data || ($rootScope.data = {});
        $rootScope.data.username = (_ref = $scope.data) != null ? _ref.username : void 0;
        $rootScope.data.city = (_ref1 = $scope.data) != null ? _ref1.city : void 0;
        $rootScope.data.uuid = Math.floor(Math.random() *1000000) +'__'+$scope.data.username;

        console.log($rootScope);
        
        PubNub.init({
            subscribe_key: 'sub-c-74a21190-6d07-11e5-b6e2-0619f8945a4f',
            publish_key: 'pub-c-92a170d2-09b1-4348-88fb-0d3affd451d7',
            uuid: $rootScope.data.uuid
        });
        return $location.path('/main');
    }
  }]);
