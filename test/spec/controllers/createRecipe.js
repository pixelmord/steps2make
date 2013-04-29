'use strict';

describe('Controller: CreateRecipeCtrl', function () {

  // load the controller's module
  beforeEach(module('steps2makeApp'));

  var CreateRecipeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreateRecipeCtrl = $controller('CreateRecipeCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
