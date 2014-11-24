angular.module('schoolManage')
    .factory('StudentDataProvider', ['$http', '$q', function ($http, $q) {

        var getStudentsBySchool = function(schoolId) {
            var defered = $q.defer();
            var studentsBySchoolPromise = defered.promise;
            $http({
                method: "GET",
                url: "/users?roles=student&school=" + schoolId
            }).success(function(students){
                defered.resolve(students);
            }).error(function(err) {
                defered.reject(err);
            });
            return studentsBySchoolPromise;
        };

        var getCountsOfStudentsBySchool = function(schoolId, callBack){
            $http({
                method: "GET",
                url: "/users/count?roles=student&school=" + schoolId
            }).success(function(counts) {
                if(callBack) {
                    callBack(counts);
                }
            }).error(function(err) {
                console.error(err);
            })
        };

        var createStudent = function (info) {
            return $http({
                method: "POST",
                url: "/users",
                data: info
            })
        };

        var createStudentBatch = function (studentsList, callBack) {
            var successList = [];
            var failList = [];
            _.each(studentsList, function(student) {
                console.log(student);
                $.ajax({
                    url: "/users",
                    method: "POST",
                    async: false,
                    data: student,
                    success: function (newStudent) {
                        console.log(newStudent);
                        successList.push(newStudent)
                    },
                    error: function(err) {
                        console.error(err);
                        failList.push(student)
                    },
                    dataType: "json"
                });
            });
            console.log('success:' + successList);
            console.log('fail: ' + failList);
            callBack(successList, failList);

        };

        var getStudent = function (studentId, callBack) {
            var defered = $q.defer();
            var studentPromise = defered.promise;
            $http({
                method: "GET",
                url: "/users/" + studentId + "?populate=school"
            }).success(function (student) {
                defered.resolve(student);
                if(callBack) {
                    callBack(student);
                }
            }).error(function (err) {
                console.error(err);
            });
            return studentPromise;
        };

        var editStudent = function (student) {
            return $http({
                method: "PUT",
                url: "/users/" + student._id,
                data: student
            })
        };

        var removeStudent = function (studentId) {
            return $http({
                method: "DELETE",
                url: "/users/" + studentId
            })
        };

        var getStudentRoom = function(studentId) {
            return $http({
                method: "GET",
                url: "/rooms?students=" + studentId
            })

        };

        return {
            getStudentsBySchool: getStudentsBySchool,
            getCountsOfStudentsBySchool: getCountsOfStudentsBySchool,
            createStudent: createStudent,
            createStudentBatch: createStudentBatch,
            getStudent: getStudent,
            editStudent: editStudent,
            removeStudent: removeStudent,
            getStudentRoom: getStudentRoom
        };
    }]);
