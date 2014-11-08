angular.module('schoolManage')
    .factory('SchoolDataProvider', ['$http', '$q', '$route', function ($http, $q, $route) {

        var createSchool = function (name, callBack) {
            $http({
                method: "POST",
                url: "/schools",
                data: {
                    "name": name
                }
            }).success(function (school) {
                callBack(school);
            }).error(function (err) {
                console.error(err)
            });
        };
        var getSchool = function (schoolId, callBack) {
            var defered = $q.defer();
            var schoolPromise = defered.promise;
            $http({
                method: "GET",
                url: "/schools/" + schoolId
            }).success(function (school) {
                if(callBack){
                    callBack(school);
                }
                defered.resolve(school);
            }).error(function (err) {
                console.error(err)
            });
            return schoolPromise;
        };
        var editSchool = function (school, callBack) {//This will remove the information of rooms!
            delete school.rooms;
            $http({
                method: "PUT",
                url: "/schools/" + school._id,
                data: school
            }).success(function (school) {
                callBack(school);
            }).error(function (err) {
                console.error(err)
            });
        };
        var deleteSchool = function (callBack) {
            $http({
                method: "DELETE",
                url: "/schools/" + $route.current.params.schoolId
            }).success(function (school) {
                callBack(school);
            }).error(function (err) {
                console.error(err)
            });
        };
        return {
            createSchool: createSchool,
            getSchool: getSchool,
            editSchool: editSchool,
            deleteSchool: deleteSchool
        };
    }]);
