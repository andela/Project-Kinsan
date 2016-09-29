// TODO: add a test to test the controller

// TODO: add a test for the service

// TODO: add a test that tests that the service returns a valid array of object

// TODO: add a test that tests that the service returns a message when the resource doesn't exist

describe('History factory', function() {
  let History;

  // before each test load the angular module
  beforeEach(
    angular.mock.module('mean')
  );

  // Set our injected History service (_Users_) to our local History variable
  beforeEach(inject(function(_History_){
    History = _History_;
  }));

  // A simple test to verify the History service exists
  it('should exist', function() {
    expect(History).toBeDefined();
  });

});