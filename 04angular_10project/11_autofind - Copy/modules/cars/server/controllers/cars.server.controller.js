'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Car = mongoose.model('Car'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a car
 */
exports.create = function (req, res) {
  var car = new Car(req.body);
  car.user = req.user;

  car.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(car);
    }
  });
};

/**
 * Show the current car
 */
exports.read = function (req, res) {
  res.json(req.car);
};

/**
 * Update a car
 */
exports.update = function (req, res) {
  var car = req.car;

  car.title = req.body.title;
  car.content = req.body.content;

  car.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(car);
    }
  });
};

/**
 * Delete an car
 */
exports.delete = function (req, res) {
  var car = req.car;

  car.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(car);
    }
  });
};

/**
 * List of Cars
 */
exports.list = function (req, res) {
  Car.find().sort('-created').populate('user', 'displayName').exec(function (err, cars) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(cars);
    }
  });
};

/**
 * Car middleware
 */
exports.carByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Car is invalid'
    });
  }

  Car.findById(id).populate('user', 'displayName').exec(function (err, car) {
    if (err) {
      return next(err);
    } else if (!car) {
      return res.status(404).send({
        message: 'No car with that identifier has been found'
      });
    }
    req.car = car;
    next();
  });
};
