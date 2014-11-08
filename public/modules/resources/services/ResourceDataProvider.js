angular.module('resources')
    .factory('ResourceDataProvider', ['$http', '$q', '$route', '$location', function ($http, $q, $route, $location) {

        var getRoom = function(roomId) {

        };

        return {
            getRoom: getRoom,
        }



    }]);
