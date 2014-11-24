angular.module('resources')
    .factory('DataAgent', ['$rootScope' , function ($rootScope) {
        var sharedService = {};

        sharedService.type = {};
        sharedService.message = {};

        sharedService.prepForBroadcast = function (type, msg) {
            this.type = type;
            this.message = msg;
            this.broadcastItem();
        };

        sharedService.broadcastItem = function () {
            $rootScope.$broadcast('handleBroadcast');
        };

        return sharedService;
    }]);
