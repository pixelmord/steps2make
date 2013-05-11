'use strict';

describe('Controller: ListProjectsCtrl', function () {

  // load the controller's module
  beforeEach(module('steps2makeApp'));

  var ListProjectsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ListProjectsCtrl = $controller('ListProjectsCtrl', {
      $scope: scope
    });
  }));

});
