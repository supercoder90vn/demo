'use strict';

describe('Cars E2E Tests:', function () {
  describe('Test cars page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/cars');
      expect(element.all(by.repeater('car in cars')).count()).toEqual(0);
    });
  });
});
