/**
 * User: Andreas Sahle | @pixelmord
 * Date: 01.06.13
 * Time: 22:31
 */

angular.module('configProvider', [])
  .factory('Config', function() {
    var config = {
      flickr: {
        apiKey: 'THEKEY',
        userID: 'YOURID'
      },
      mongolab: {
        apiKey: 'THEKEY',
        dbName: 'DBNAME'
      }
    }

    return {
      flickr: function() {
        return config.flickr;
      },
      mongolab: function() {
        return config.mongolab;
      }
    };
  });

