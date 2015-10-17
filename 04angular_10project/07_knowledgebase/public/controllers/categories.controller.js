app

.controller('CategoriesCtrl',['$scope','$http', function($scope, $http){
    console.log('...CategoriesCtrl');
    $http.get('/categories').success(function(data){        
        $scope.categories = data;
    });
}]);