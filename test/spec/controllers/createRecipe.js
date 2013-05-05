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

  it('should have an initial steps count of 0', function () {
    expect(scope.stepsCount).toEqual(0);
  });
});
