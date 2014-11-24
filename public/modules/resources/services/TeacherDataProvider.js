angular.module('schoolManage')
    .factory('TeacherDataProvider', ['$http', '$q', '$route',function ($http, $q, $route) {
        var getTeachersBySchool = function(schoolId, callBack) {
            var defered = $q.defer();
            var teachersBySchoolPromise = defered.promise;
            $http({
                method: "GET",
                url: "/users?roles=teacher&school=" + schoolId
            }).success(function(teachers) {
                defered.resolve(teachers);
                if(callBack) {
                    callBack(teachers);
                }
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

        var createTeacher = function (info) {
            return $http({
                method: "POST",
                url: "/users",
                data: info
            })
        };
        var getTeacher = function (teacherId, callBack) {
            var defered = $q.defer();
            var teacherPromise = defered.promise;
            $http({
                method: "GET",
                url: "/users/" + teacherId + "?populate=school"
            }).success(function (teacher) {
                defered.resolve(teacher);
                if(callBack) {
                    callBack(teacher);
                }
            }).error(function (err) {
                console.error(err);
                defered.reject(err);
            });
            return teacherPromise;
        };
        var editTeacher = function (teacher) {
            return $http({
                method: "PUT",
                url: "/users/" + teacher._id,
                data: teacher
            })
        };
        var deleteTeacher = function (teacherId) {
            return $http({
                method: "DELETE",
                url: "/users/" + teacherId
            })
        };

        var getTeacherRooms = function (teacherId) {
            return $http({
                method: "GET",
                url: "/rooms?teachers=" + teacherId
            })
        };
        return {
            getTeachersBySchool: getTeachersBySchool,
            getCountsOfTeachersBySchool: getCountsOfTeachersBySchool,
            createTeacher: createTeacher,
            getTeacher: getTeacher,
            editTeacher: editTeacher,
            deleteTeacher: deleteTeacher,
            getTeacherRooms: getTeacherRooms
        };
    }]);
