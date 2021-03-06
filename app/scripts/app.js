'use strict';

angular.module('steps2makeApp', ['ui', 'mongolab', 'ngCookies', 'ngResource', 'ngSanitize', 'ngRoute'])
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

angular.module('steps2makeApp').config(['$httpProvider', function($httpProvider) {
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);

angular.module('ui.directives')
  // @todo: replace redactor since it is a non free editor
  .directive('uiRedactor', ['ui.config',function(uiConfig) {
    var options = uiConfig.uiRedactor || {};
    return {
      require: 'ngModel',
      link: function(scope, elm, attrs, ngModelCtrl) {
        var apply, expression, getVal, opt, redactor;

        redactor = null;
        getVal = function() {
          return redactor !== null ? redactor.getCode() : void 0;
        };
        apply = function() {
          ngModelCtrl.$pristine = false;
          return scope.$apply();
        };
        opt = {
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
        angular.extend(options, opt);
        angular.extend(options, expression);
        return setTimeout(function() {
          redactor = elm.redactor(options);
          return redactor;
        });
      }
    };
  }])
  .directive('uiAutocomplete', ['ui.config', function(uiConfig) {
    var directive = {
      require: '?ngModel',
      link: function(scope, element, attrs) {
        var options = {};
        if (uiConfig.autocomplete) {
          angular.extend(options, uiConfig.autocomplete);
        }
        var initAutocompleteWidget = function () {
          var opts = angular.extend({}, options, scope.$eval(attrs.uiAutocomplete));
          element.autocomplete(opts);
          if (opts._renderItem) {
            element.data('ui-autocomplete')._renderItem = opts._renderItem;
          }
        };
        // Watch for changes to the directives options
        scope.$watch(attrs.uiAutocomplete, initAutocompleteWidget, true);
      }
    };
    return directive;
  }]);
