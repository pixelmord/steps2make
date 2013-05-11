'use strict';

angular.module('steps2makeApp')
  .controller('CreateProjectCtrl', function ($scope, $location, Project) {
    $scope.project = {};
    $scope.project.stepsCount = 0;
    $scope.project.ingredients = [
      {
        quantity: 12,
        measurement: 'pcs.',
        title: 'Testingredient'
      },
      {
        quantity: 102,
        measurement: 'small',
        title: 'Nails'
      }
    ];
    $scope.save = function() {
      Project.save($scope.project, function(project) {
        $location.path('/edit/' + project._id.$oid);
      });
    };
  })
  .directive('stmIngredient', function() {
    return {
      restrict: 'E',
      template: '<fieldset class="form-inline">\n  <div class="input-prepend">\n    <span class="add-on">#</span>\n    <input class="input-mini" type="number" ng-model="ingredient.quantity">\n  </div>\n  <input class="input-small" type="text" name="" placeholder="Measurement" ng-model="ingredient.measurement"/>\n  <input class="input-large" type="text" name="" placeholder="Ingredient" ng-model="ingredient.title"/>\n</fieldset>'
    };
  })
  .directive('stmIngredients', function() {
    return {
      restrict: 'A',
      transclude: true,
      template: '<div ng-transclude></div><button class="btn btn-info" ng-click="addIngredient()">Add ingredient</button>',
      link: function(scope) {
        scope.addIngredient = function () {
          scope.project.ingredients.push({});
        };
      }
    };
  });
