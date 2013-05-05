'use strict';

angular.module('steps2makeApp')
  .controller('CreateRecipeCtrl', function ($scope) {
    $scope.stepsCount = 0;
  })
  .directive('wysiwyg', function () {
    return {
      require: 'ngModel',
      link: function (scope, el, attrs, ngModel) {
        el.redactor({
          keyupCallback: function(obj, e) {
            scope.$apply(ngModel.$setViewValue(obj.getCode()));
          }
        });
        el.setCode(scope.content);
      }
    };
  });
