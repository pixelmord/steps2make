'use strict';

describe('Controller: CreateProjectCtrl', function () {

  // load the controller's module
  beforeEach(module('steps2makeApp'));

  var CreateProjectCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreateProjectCtrl = $controller('CreateProjectCtrl', {
      $scope: scope
    });
  }));

  it('should have an initial steps count of 0', function () {
    expect(scope.project.stepsCount).toEqual(0);
  });
  it('should have an initial ingredient count of 0', function () {
    expect(scope.project.ingredients.length).toEqual(0);
  });
  it('should increase ingredient count when addIngredient() is called', function () {
    var count = scope.project.ingredients.length;
    scope.addIngredient();
    expect(scope.project.ingredients.length).toEqual(count + 1);
  });
  it('should decrease ingredient count when removeIngredient() is called', function () {
    scope.addIngredient();
    var count = scope.project.ingredients.length;
    scope.removeIngredient(0);
    expect(scope.project.ingredients.length).toEqual(count - 1);
  });
});
