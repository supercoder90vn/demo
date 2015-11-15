'use strict';

//Cars service used for communicating with the cars REST endpoints
angular.module('cars').factory('Cars', ['$resource', function ($resource) {
    return $resource(
                'api/cars/:carId', 
                { carId: '@_id' },  // _id is a field of car at client, :carId is parameter at url
                {update: {method: 'PUT'}}
            );
}]);

  