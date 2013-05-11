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
});
