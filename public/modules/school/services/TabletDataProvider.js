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

        return {
            getXiaoshuBySchool: getXiaoshuBySchool

        };
    }]);
