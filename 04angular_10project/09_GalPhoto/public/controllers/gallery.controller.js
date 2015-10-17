/*__ph_reference_
    https://github.com/compact/angular-bootstrap-lightbox
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

angular.module('galPhoto')

.controller('GalleryCtrl',['$scope','instagram','Lightbox',function($scope,instagram, Lightbox){
    
    $scope.images = [];
    var imgArray = [];
    
    
    instagram.fetchPopular(function(data){
        //console.log(data);
        $scope.images = data;    
        angular.forEach(data, function(value){
            imgArray.push(value.images.standard_resolution);
        });
        
        
       $scope.openLightboxModal = function (index) {
            Lightbox.openModal(imgArray, index);
       };
    });

}])