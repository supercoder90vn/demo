app

.controller('ArticlesCtrl',['$scope','$http', function($scope, $http){
    console.log('...ArticlesCtrl');
    $http.get('/articles').success(function(data){
        $scope.articles = data;
    });
}])

.controller('ArticlesCategoryCtrl',['$scope','$http',  '$routeParams',function($scope, $http,$routeParams){
    console.log('...ArticlesCategoryCtrl');
    $http.get('/articles/category/' + $routeParams.category).success(function(data){
        $scope.cat_articles = data;
        $scope.category = $routeParams.category;
    });
}])

.controller('ArticleDetailsCtrl',  ['$scope','$http','$routeParams','$location', 
                            function($scope,  $http,  $routeParams,  $location){
    console.log('...ArticlesDetailsCtrl');
    $http.get('/articles/'+$routeParams.id).success(function(data){
        $scope.article = data;
    });
    
    $scope.removeArticle = function(){
        $http.delete('/articles/' +$routeParams.id).success(function(data){
            console.log(data);
        });
        $location.path('/articles');
    }
}])

.controller('ArticleCreateCtrl', ['$scope','$http','$routeParams','$location', 
                          function($scope,  $http,  $routeParams,  $location){
    console.log('...ArticleCreateCtrl');
    $http.get('/categories').success(function(data){
        $scope.categories = data;
    });
                              
    $scope.addArticle = function(){
        var data = {
            title: $scope.title,
            body: $scope.body,
            category: $scope.category        
        }
        
        $http.post('/articles',data).success(function(data, status){
            console.log(status);
        });
        
        $location.path('/articles');
    }
}])

.controller('ArticleEditCtrl', ['$scope','$http','$routeParams','$location', 
                          function($scope,  $http,  $routeParams,  $location){
    console.log('...ArticleEditCtrl');
                              
    $http.get('/categories').success(function(data){
        $scope.categories = data;
    });
                              
    $http.get('/articles/'+$routeParams.id).success(function(data){
        $scope.article = data;
    });
                                    
    $scope.updateArticle = function(){
        var data = {
            id:         $routeParams.id,
            title:      $scope.article.title,
            body:       $scope.article.body,
            category:   $scope.article.category        
        }
        
        $http.put('/articles',data).success(function(data, status){
            console.log(status);
        });
        
        $location.path('/articles');
    }
}])
;