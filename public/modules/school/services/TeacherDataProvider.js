angular.module('schoolManage')
    .factory('TeacherDataProvider', ['$http', '$q', '$route', function ($http, $q, $route) {

        var me = {};
        var getMe = function (callBack) {
            var deferred = $q.defer();
            var userPromise = deferred.promise;

            $http.get('/me')
                .success(function (user) {
                    callBack(user);
                    deferred.resolve(user);
                    me = user;
                })
                .error(function (err) {
                    deferred.reject('Fetch User Error: ' + err);
                });
            return userPromise;
        };





        var getTeachersBySchool = function(schoolId, callBack) {
            var defered = $q.defer();
            var teachersBySchoolPromise = defered.promise;
            $http({
                method: "GET",
                url: "/users?roles=teacher&school=" + schoolId
            }).success(function(teachers) {
                defered.resolve(teachers);
                callBack(teachers);
            }).error(function (err) {
                console.error(err);
            });
            return teachersBySchoolPromise;
        };

        var getCountsOfTeachersBySchool = function(schoolId, callBack){
            $http({
                method: "GET",
                url: "/users/count?roles=teacher&school=" + schoolId
            }).success(function(counts){
                callBack(counts);
            }).error(function(err){
                console.error(err);
            });
        };

        var createTeacher = function (info) {//password will be the same as username!
            $http({
                method: "POST",
                url: "/users",
                data: {
                    "name": info.name,
                    "username": info.username,
                    "roles": ["teacher"],
                    "password": info.username,
                    "remark": info.remark
                }
            }).success(function (teacher) {
                info.callBack(undefined, teacher);
            }).error(function (err) {
                if (err.message === 'Username already exists') {
                    info.callBack('Username already exists');
                } else {
                    ohNo(err);
                }
            });
        };
        var getTeacher = function () {
            var defered = $q.defer();
            var teacherPromise = defered.promise;
            $http({
                method: "GET",
                url: "/users/" + $route.current.params.teacherId
            }).success(function (teacher) {
                defered.resolve(teacher);
            }).error(function (err) {
                ohNo(err);
            });
            return teacherPromise;
        };
        var editTeacher = function (teacher, callBack) {
            $http({
                method: "PUT",
                url: "/users/" + $route.current.params.teacherId,
                data: teacher
            }).success(function (teacher) {
                callBack(teacher);
            }).error(function (err) {
                ohNo(err);
            });
        };
        var removeTeacher = function (callBack) {
            $http({
                method: "DELETE",
                url: "/users/" + $route.current.params.teacherId
            }).success(function (teacher) {
                callBack(teacher);
            }).error(function (err) {
                ohNo(err);
            });
        };
        return {
            getMe: getMe,
            getTeachersBySchool: getTeachersBySchool,
            getCountsOfTeachersBySchool: getCountsOfTeachersBySchool,
            createTeacher: createTeacher,
            getTeacher: getTeacher,
            editTeacher: editTeacher,
            removeTeacher: removeTeacher
        };
    }]);
