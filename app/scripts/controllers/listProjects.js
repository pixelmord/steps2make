'use strict';

angular.module('steps2makeApp')
  .controller('ListProjectsCtrl', function ($scope, Project) {
    $scope.projects = Project.query();
  });
