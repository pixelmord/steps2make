'use strict';

angular.module('steps2makeApp', ['ui'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/recipe/add', {
        templateUrl: 'views/createRecipe.html',
        controller: 'CreateRecipeCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
