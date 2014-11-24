angular.module('schoolManage')
    .factory('TabletDataProvider', ['$http', '$q', function ($http, $q) {
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

        var getTablet = function(tabletId, callBack) {
            var defered = $q.defer();
            var tabletPromise = defered.promise;
            $http({
                method: "GET",
                url: "/tablets?machine_id=" + tabletId + "&populate=school"
            }).success(function(tablet) {
                defered.resolve(tablet);
                console.log(tablet);
                if(callBack) {
                    callBack(tablet);
                }
            }).error(function (err) {
                console.error(err);
            });
            return tabletPromise;

        };

        var getTabletUser = function(tabletId, callBack) {
            var defered = $q.defer();
            var tabletPromise = defered.promise;
            $http({
                method: "GET",
                url: "/usertablets?tabletId=" + tabletId + "&populate=userId"
            }).success(function(record) {
                defered.resolve(record);
                console.log(record);
                if(callBack) {
                    callBack(record);
                }
            }).error(function (err) {
                console.error(err);
            });
            return tabletPromise;
        };

        return {
            getXiaoshuBySchool: getXiaoshuBySchool,
            getTabletsBySchool: getTabletsBySchool,
            getTablet: getTablet,
            getTabletUser: getTabletUser

        };
    }]);
