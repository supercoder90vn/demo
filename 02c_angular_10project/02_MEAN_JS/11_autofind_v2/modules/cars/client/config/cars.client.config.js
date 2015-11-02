'use strict';

// Configuring the Cars module
angular.module('cars').run(['Menus',
  function (Menus) {
    // Add the cars dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Cars',
      state: 'cars',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'cars', {
      title: 'List Cars',
      state: 'cars.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'cars', {
      title: 'Create Cars',
      state: 'cars.create',
      roles: ['user']
    });
  }
]);
