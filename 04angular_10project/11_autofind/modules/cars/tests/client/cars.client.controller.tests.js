'use strict';

(function () {
  // Cars Controller Spec
  describe('Cars Controller Tests', function () {
    // Initialize global variables
    var CarsController,
      scope,
      $httpBackend,
      $stateParams,
      $location,
      Authentication,
      Cars,
      mockCar;

    // The $resource service augments the response object with methods for updating and deleting the resource.
    // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
    // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
    // When the toEqualData matcher compares two objects, it takes only object properties into
    // account and ignores methods.
    beforeEach(function () {
      jasmine.addMatchers({
        toEqualData: function (util, customEqualityTesters) {
          return {
            compare: function (actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
    });

    // Then we can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_, _Authentication_, _Cars_) {
      // Set a new global scope
      scope = $rootScope.$new();

      // Point global variables to injected services
      $stateParams = _$stateParams_;
      $httpBackend = _$httpBackend_;
      $location = _$location_;
      Authentication = _Authentication_;
      Cars = _Cars_;

      // create mock car
      mockCar = new Cars({
        _id: '525a8422f6d0f87f0e407a33',
        title: 'An Car about MEAN',
        //content: 'MEAN rocks!'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Cars controller.
      CarsController = $controller('CarsController', {
        $scope: scope
      });
    }));

    it('$scope.find() should create an array with at least one car object fetched from XHR', inject(function (Cars) {
      // Create a sample cars array that includes the new car
      var sampleCars = [mockCar];

      // Set GET response
      $httpBackend.expectGET('api/cars').respond(sampleCars);

      // Run controller functionality
      scope.find();
      $httpBackend.flush();

      // Test scope value
      expect(scope.cars).toEqualData(sampleCars);
    }));

    it('$scope.findOne() should create an array with one car object fetched from XHR using a carId URL parameter', inject(function (Cars) {
      // Set the URL parameter
      $stateParams.carId = mockCar._id;

      // Set GET response
      $httpBackend.expectGET(/api\/cars\/([0-9a-fA-F]{24})$/).respond(mockCar);

      // Run controller functionality
      scope.findOne();
      $httpBackend.flush();

      // Test scope value
      expect(scope.car).toEqualData(mockCar);
    }));

    describe('$scope.create()', function () {
      var sampleCarPostData;

      beforeEach(function () {
        // Create a sample car object
        sampleCarPostData = new Cars({
          title: 'An Car about MEAN',
          //content: 'MEAN rocks!'
        });

        // Fixture mock form input values
        scope.title = 'An Car about MEAN';
        //scope.content = 'MEAN rocks!';

        spyOn($location, 'path');
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (Cars) {
        // Set POST response
        $httpBackend.expectPOST('api/cars', sampleCarPostData).respond(mockCar);

        // Run controller functionality
        scope.create(true);
        $httpBackend.flush();

        // Test form inputs are reset
        expect(scope.title).toEqual('');
        //expect(scope.content).toEqual('');

        // Test URL redirection after the car was created
        expect($location.path.calls.mostRecent().args[0]).toBe('cars/' + mockCar._id);
      }));

      it('should set scope.error if save error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectPOST('api/cars', sampleCarPostData).respond(400, {
          message: errorMessage
        });

        scope.create(true);
        $httpBackend.flush();

        expect(scope.error).toBe(errorMessage);
      });
    });

    describe('$scope.update()', function () {
      beforeEach(function () {
        // Mock car in scope
        scope.car = mockCar;
      });

      it('should update a valid car', inject(function (Cars) {
        // Set PUT response
        $httpBackend.expectPUT(/api\/cars\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        scope.update(true);
        $httpBackend.flush();

        // Test URL location to new object
        expect($location.path()).toBe('/cars/' + mockCar._id);
      }));

      it('should set scope.error to error response message', inject(function (Cars) {
        var errorMessage = 'error';
        $httpBackend.expectPUT(/api\/cars\/([0-9a-fA-F]{24})$/).respond(400, {
          message: errorMessage
        });

        scope.update(true);
        $httpBackend.flush();

        expect(scope.error).toBe(errorMessage);
      }));
    });

    describe('$scope.remove(car)', function () {
      beforeEach(function () {
        // Create new cars array and include the car
        scope.cars = [mockCar, {}];

        // Set expected DELETE response
        $httpBackend.expectDELETE(/api\/cars\/([0-9a-fA-F]{24})$/).respond(204);

        // Run controller functionality
        scope.remove(mockCar);
      });

      it('should send a DELETE request with a valid carId and remove the car from the scope', inject(function (Cars) {
        expect(scope.cars.length).toBe(1);
      }));
    });

    describe('scope.remove()', function () {
      beforeEach(function () {
        spyOn($location, 'path');
        scope.car = mockCar;

        $httpBackend.expectDELETE(/api\/cars\/([0-9a-fA-F]{24})$/).respond(204);

        scope.remove();
        $httpBackend.flush();
      });

      it('should redirect to cars', function () {
        expect($location.path).toHaveBeenCalledWith('cars');
      });
    });
  });
}());
