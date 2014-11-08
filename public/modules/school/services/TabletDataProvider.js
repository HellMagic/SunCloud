angular.module('schoolManage')
    .factory('TabletDataProvider', ['$http', '$q', '$route', function ($http, $q, $route) {
        var getXiaoshuBySchool = function (schoolId, callBack) {
            $http({
                method: "GET",
                url: "/usertablet/count?schoolId=" + schoolId
            }).success(function (counts) {
                callBack(counts);
            }).error(function (err) {
                console.error(err);
            });
        };

        var getTabletsBySchool = function(schoolId, callBack) {
            var defered = $q.defer();
            var tabletsBySchoolPromise = defered.promise;
            $http({
                method: "GET",
                url: "/tablets?school=" + schoolId
            }).success(function(tablets) {
                defered.resolve(tablets);
                if(callBack) {
                    callBack(tablets);
                }
            }).error(function (err) {
                console.error(err);
            });
            return tabletsBySchoolPromise;
        };

        return {
            getXiaoshuBySchool: getXiaoshuBySchool,
            getTabletsBySchool: getTabletsBySchool

        };
    }]);
