'use strict';

angular.module('steps2makeApp', ['ui', 'mongolab'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/projects', {
        templateUrl: 'views/listProjects.html',
        controller: 'ListProjectsCtrl'
      })
      .when('/projects/add', {
        templateUrl: 'views/createProject.html',
        controller: 'CreateProjectCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

angular.module('ui.directives', ['ui'])
  .directive('uiRedactor', function() {
    return {
      require: 'ngModel',
      link: function(scope, elm, attrs, ngModelCtrl) {
        var apply, expression, getVal, options, redactor;

        redactor = null;
        getVal = function() {
          return redactor !== null ? redactor.getCode() : void 0;
        };
        apply = function() {
          ngModelCtrl.$pristine = false;
          return scope.$apply();
        };
        options = {
          execCommandCallback: apply,
          keydownCallback: apply,
          keyupCallback: apply,
          buttons: [
            'html', '|',
            'formatting', '|',
            'bold', 'italic', 'deleted', '|',
            'unorderedlist', 'orderedlist', 'outdent', 'indent', '|',
            'table', 'link', '|',
            'fontcolor', 'backcolor', '|',
            'alignment', '|', 'horizontalrule'
          ]
        };
        scope.$watch(getVal, function(newVal) {
          if (!ngModelCtrl.$pristine) {
            return ngModelCtrl.$setViewValue(newVal);
          }
        });
        ngModelCtrl.$render = function() {
          return redactor !== null ? redactor.setCode(ngModelCtrl.$viewValue || '') : void 0;
        };
        expression = attrs.uiRedactor ? scope.$eval(attrs.uiRedactor) : {};
        angular.extend(options, expression);
        return setTimeout(function() {
          redactor = elm.redactor(options);
          return redactor;
        });
      }
    };
  });
