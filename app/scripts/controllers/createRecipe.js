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
  })
angular.module("ui.directives").directive("uiRedactor", [
  "ui.config", function(uiConfig) {
    return {
      require: "ngModel",
      link: function(scope, elm, attrs, ngModelCtrl) {
        var apply, expression, getVal, options, redactor;

        redactor = null;
        getVal = function() {
          return redactor != null ? redactor.getCode() : void 0;
        };
        apply = function() {
          ngModelCtrl.$pristine = false;
          return scope.$apply();
        };
        options = {
          execCommandCallback: apply,
          keydownCallback: apply,
          keyupCallback: apply
        };
        scope.$watch(getVal, function(newVal) {
          if (!ngModelCtrl.$pristine) {
            return ngModelCtrl.$setViewValue(newVal);
          }
        });
        ngModelCtrl.$render = function() {
          return redactor != null ? redactor.setCode(ngModelCtrl.$viewValue || '') : void 0;
        };
        expression = attrs.uiRedactor ? scope.$eval(attrs.uiRedactor) : {};
        angular.extend(options, expression);
        return setTimeout(function() {
          return redactor = elm.redactor(options);
        });
      }
    };
  }
]);;
