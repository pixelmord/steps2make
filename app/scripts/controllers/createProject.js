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

angular.module('steps2makeApp')
  .controller('ImageAutoCompleteCtrl', function($scope, $http, Config) {
    var config = Config.flickr(),
      updateImageList = function () {
        var url = 'http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + config.apiKey;
        url += '&format=json&nojsoncallback=1&per_page=10';
        url += '&user_id=' + config.userID;
        url += '&tags=' + $scope.imageSearch.tag;
        $http.get( url )
          .success(function(data) {
            console.log(data);
            $scope.imageResults = data.photos.photo;
          });
      },
      searchTags = function(request, response) {
        var callback = function(data) {
          var tagList = [];
          angular.forEach(data.who.tags.tag, function(value) {
            if (value._content.indexOf($scope.imageSearch.tag) !== -1) {
              tagList.push(value);
            }
          });
          response(tagList);
        };
        $http.get('http://api.flickr.com/services/rest/?method=flickr.tags.getListUser&api_key=' + config.apiKey + '&user_id=' + config.userID + '&format=json&nojsoncallback=1&per_page=100')
          .success(callback);
      },
      _renderTagItem = function (ul, item) {
        return $('<li>')
          .data('item.autocomplete', item)
          .append('<a>' + item._content + '</a>')
          .appendTo(ul);
      },

      selectTag = function (event, ui) {
        //console.log(ui);
        if (ui.item) {
          event.preventDefault();
          $scope.imageSearch.tag = ui.item._content;
          $(this).val( ui.item._content);
          updateImageList();
        }
      };
    $scope.imageResults = [];
    $scope.test = 'test';
    $scope.tagAutocompleteOptions = {
      minLength: 1,
      source: searchTags,
      select: selectTag,
      delay: 500,
      _renderItem: _renderTagItem
    };
  });
