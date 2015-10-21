'use strict';

// Setting up route
angular.module('cars').config(['$stateProvider',
  function ($stateProvider) {
    // Cars state routing
    $stateProvider
      .state('cars', {
        abstract: true,
        url: '/cars',
        template: '<ui-view/>'
      })
      .state('cars.list', {
        url: '',
        templateUrl: 'modules/cars/client/views/list-cars.client.view.html'
      })
      .state('cars.create', {
        url: '/create',
        templateUrl: 'modules/cars/client/views/create-car.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('cars.view', {
        url: '/:carId',
        templateUrl: 'modules/cars/client/views/view-car.client.view.html'
      })
      .state('cars.search', {
        url: '/search/:make/:model/:state/:type',
        templateUrl: 'modules/cars/client/views/search-car.client.view.html'
      })
      .state('cars.edit', {
        url: '/:carId/edit',
        templateUrl: 'modules/cars/client/views/edit-car.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      });
  }
]);
