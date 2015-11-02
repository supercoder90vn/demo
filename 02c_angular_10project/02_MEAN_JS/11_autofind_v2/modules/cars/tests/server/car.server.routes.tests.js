'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Car = mongoose.model('Car'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, car;

/**
 * Car routes tests
 */
describe('Car CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new car
    user.save(function () {
      car = {
        title: 'Car Title',
        content: 'Car Content'
      };

      done();
    });
  });

  it('should be able to save an car if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new car
        agent.post('/api/cars')
          .send(car)
          .expect(200)
          .end(function (carSaveErr, carSaveRes) {
            // Handle car save error
            if (carSaveErr) {
              return done(carSaveErr);
            }

            // Get a list of cars
            agent.get('/api/cars')
              .end(function (carsGetErr, carsGetRes) {
                // Handle car save error
                if (carsGetErr) {
                  return done(carsGetErr);
                }

                // Get cars list
                var cars = carsGetRes.body;

                // Set assertions
                (cars[0].user._id).should.equal(userId);
                (cars[0].title).should.match('Car Title');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an car if not logged in', function (done) {
    agent.post('/api/cars')
      .send(car)
      .expect(403)
      .end(function (carSaveErr, carSaveRes) {
        // Call the assertion callback
        done(carSaveErr);
      });
  });

  it('should not be able to save an car if no title is provided', function (done) {
    // Invalidate title field
    car.title = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new car
        agent.post('/api/cars')
          .send(car)
          .expect(400)
          .end(function (carSaveErr, carSaveRes) {
            // Set message assertion
            (carSaveRes.body.message).should.match('Title cannot be blank');

            // Handle car save error
            done(carSaveErr);
          });
      });
  });

  it('should be able to update an car if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new car
        agent.post('/api/cars')
          .send(car)
          .expect(200)
          .end(function (carSaveErr, carSaveRes) {
            // Handle car save error
            if (carSaveErr) {
              return done(carSaveErr);
            }

            // Update car title
            car.title = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing car
            agent.put('/api/cars/' + carSaveRes.body._id)
              .send(car)
              .expect(200)
              .end(function (carUpdateErr, carUpdateRes) {
                // Handle car update error
                if (carUpdateErr) {
                  return done(carUpdateErr);
                }

                // Set assertions
                (carUpdateRes.body._id).should.equal(carSaveRes.body._id);
                (carUpdateRes.body.title).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of cars if not signed in', function (done) {
    // Create new car model instance
    var carObj = new Car(car);

    // Save the car
    carObj.save(function () {
      // Request cars
      request(app).get('/api/cars')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single car if not signed in', function (done) {
    // Create new car model instance
    var carObj = new Car(car);

    // Save the car
    carObj.save(function () {
      request(app).get('/api/cars/' + carObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('title', car.title);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single car with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/cars/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Car is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single car which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent car
    request(app).get('/api/cars/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No car with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an car if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new car
        agent.post('/api/cars')
          .send(car)
          .expect(200)
          .end(function (carSaveErr, carSaveRes) {
            // Handle car save error
            if (carSaveErr) {
              return done(carSaveErr);
            }

            // Delete an existing car
            agent.delete('/api/cars/' + carSaveRes.body._id)
              .send(car)
              .expect(200)
              .end(function (carDeleteErr, carDeleteRes) {
                // Handle car error error
                if (carDeleteErr) {
                  return done(carDeleteErr);
                }

                // Set assertions
                (carDeleteRes.body._id).should.equal(carSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an car if not signed in', function (done) {
    // Set car user
    car.user = user;

    // Create new car model instance
    var carObj = new Car(car);

    // Save the car
    carObj.save(function () {
      // Try deleting car
      request(app).delete('/api/cars/' + carObj._id)
        .expect(403)
        .end(function (carDeleteErr, carDeleteRes) {
          // Set message assertion
          (carDeleteRes.body.message).should.match('User is not authorized');

          // Handle car error error
          done(carDeleteErr);
        });

    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Car.remove().exec(done);
    });
  });
});
