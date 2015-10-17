angular.module('galPhoto')

.factory('instagram', function($resource){
    return  {
        //__ph_reference__https://instagram.com/developer/endpoints/media/
        fetchPopular: function(callback){
            var api = $resource('https://api.instagram.com/v1/media/popular?client_id=:client_id&callback=JSON_CALLBACK', {
                //__phuc_reference__https://instagram.com/developer/clients/manage/
                client_id: '43e632609e18480aa5065919199f6a81'
            },{
                fetch:{method:'JSONP'}
            });
            
            api.fetch(function(response){
                callback(response.data);
            });
        }
    }
})