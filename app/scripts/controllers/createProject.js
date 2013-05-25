'use strict';

angular.module('steps2makeApp')
  .controller('CreateProjectCtrl', function ($scope, $location, Project) {
    $scope.project = {};
    $scope.project.stepsCount = 0;
    $scope.project.ingredients = [];
    $scope.save = function() {
      Project.save($scope.project, function(project) {
        $location.path('/edit/' + project._id.$oid);
      });
    };
    $scope.addIngredient = function () {
      $scope.project.ingredients.push({});
    };
    $scope.removeIngredient = function (index) {
      $scope.project.ingredients.splice(index, 1);
    };
  })
  .directive('stmIngredient', function() {
    return {
      restrict: 'E',
      replace: true,
      template: '<li><fieldset class="form-inline">\n  <div class="input-prepend">\n    <span class="add-on">#</span>\n    <input class="input-mini" type="number" min="0" ng-model="ingredient.quantity">\n  </div>\n  <input class="input-small" type="text" name="" placeholder="Measurement" ng-model="ingredient.measurement"/>\n  <input class="input-large" type="text" name="" placeholder="Ingredient" ng-model="ingredient.title"/>\n  <button class="btn btn-danger" ng-click="removeIngredient($index)">X</button>\n</fieldset></li>'
    };
  });
