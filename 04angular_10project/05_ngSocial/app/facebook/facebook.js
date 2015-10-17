'use strict';

angular.module('ngSocial.facebook', ['ngRoute', 'ngFacebook'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/facebook', {
    templateUrl: 'facebook/facebook.html',
    controller: 'FacebookCtrl'
  });
}])

.config( function( $facebookProvider ) {
     console.log('...config ngSocial.facebook');
  $facebookProvider.setAppId('914680531949161');
  $facebookProvider.setPermissions("email, public_profile, user_posts, publish_actions, user_photos");
})

.run( function( $rootScope ) {
    console.log('...facebook  run( function( $rootScope )');
  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
})
.controller('FacebookCtrl', ['$scope','$facebook',function($scope, $facebook) {
     console.log('...controller FacebookCtrl');
    $scope.isLoggedIn = false;
    $scope.login = function(){
        $facebook.login().then(function(){
            console.log('LOGGED IN');
            $scope.isLoggedIn = true;
            refresh();
        });                     
    };
    
    $scope.logout = function(){
        $facebook.logout().then(function(){
            console.log('LOGGED IN');
            $scope.isLoggedIn = false;
            refresh();
        });                     
    };
    
    function refresh(){
        $facebook.api("/me",{
                fields: ['first_name','last_name','email','gender','locale','link','name']
            }).then(function(response){
            $scope.welcomeMsg = "Welcom " + response.name;
            $scope.isLoggedIn = true;
            $scope.userInfo = response;
            $facebook.api('/me/picture').then(function(response){
                $scope.picture = response.data.url;
                $facebook.api('/me/permissions').then(function(response){
                    $scope.permissions = response.data;
                    $facebook.api('/me/posts').then(function(response){
                        $scope.posts = response.data;
                    });
                    
                });
            });
        },
        function(err){
            $scope.welcomeMsg = "Please Log In";
        });        
    };
    
    $scope.postStatus = function(){   
        var self  = this;
        $facebook.api('/me/feed', 'post', {message: self.body}).then(function(){
            $scope.msg = 'Thanks for Posting';
            refresh();     
            self.body ="";
        });
    };
    
    refresh();
}]);