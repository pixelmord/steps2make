/**
 * User: Andreas Sahle | @pixelmord
 * Date: 05.05.13
 * Time: 21:52
 */
'use strict';

angular.module('mongolab', ['ngResource', 'configProvider']).
  factory('Project', function($resource, Config) {

    var config = Config.mongolab(),
      Project = $resource('https://api.mongolab.com/api/1/databases' +
      '/' + config.dbName + '/collections/projects/:id',
      { apiKey: config.apiKey }, {
        update: { method: 'PUT' }
      }
    );

    Project.prototype.update = function(cb) {
      return Project.update({id: this._id.$oid},
        angular.extend({}, this, {_id:undefined}), cb);
    };

    Project.prototype.destroy = function(cb) {
      return Project.remove({id: this._id.$oid}, cb);
    };

    return Project;
  });
