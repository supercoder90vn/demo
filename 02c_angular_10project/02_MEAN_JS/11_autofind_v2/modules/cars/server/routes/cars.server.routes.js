'use strict';

/**
 * Module dependencies.
 */
var carsPolicy = require('../policies/cars.server.policy'),
  cars = require('../controllers/cars.server.controller');

module.exports = function (app) {
    
  app.route('/api/cars').all(carsPolicy.isAllowed)
    .get(cars.list)
    .post(cars.create);
    
  app.route('/api/cars/:carId').all(carsPolicy.isAllowed)
    .get(cars.read)
    .put(cars.update)
    .delete(cars.delete);

  app.param('carId', cars.carByID);
  
};
