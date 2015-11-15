'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Car = mongoose.model('Car'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

var phlog = require(path.resolve('./config/lib/services/phuc-server-helper.js')).logger.log;


/**
 * I.1 Create a car
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
 * I.2 Show the current car
 */
exports.read = function (req, res) {
  res.json(req.car);
};

/**
 * I.3 Update a car
 */
exports.update = function (req, res) {
  var car = req.car;// at middleware
  
  // v3 use _.extend(car, req.body); => it may be more dangerous test it later
  car.title = req.body.title;
  car.type = req.body.type;
  car.make = req.body.make;
  car.model = req.body.model;
  car.year = req.body.year;
  car.price = req.body.price;
  car.imageurl = req.body.imageurl;
  car.state = req.body.state;
  car.description = req.body.description;
  car.contact_email = req.body.contact_email;

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
 * I.4 Delete an car
 */
exports.delete = function (req, res) {
  var car = req.car; // at middleware

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
 * II.1 List of Cars  ?????
 */
exports.list = function (req, res) {
  Car.find(req.query).sort('-created').populate('user', 'displayName').exec(function (err, cars) {
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
 * III. Car middleware
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
    //_phlog('car',car).end();
    req.car = car;
    next();
  });
};
