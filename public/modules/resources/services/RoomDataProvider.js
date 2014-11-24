angular.module('schoolManage')
    .factory('RoomDataProvider', ['$http', '$q', function ($http, $q) {

        var createAdminRoom = function (info) {
            return $http({
                method: "POST",
                url: "/rooms",
                data: {
                    "name": info.name,
                    "school": info.school,
                    "roomType": 'admin',
                    "students": [],
                    "teachers": []
                }
            })
        };

        var createTeachingRoom = function (info) {
            return $http({
                method: "POST",
                url: "/rooms",
                data: {
                    "name": info.name,
                    "school": info.school,
                    "roomType": 'teaching',
                    "students": [],
                    "teachers": []
                }
            })
        };


        var getRoom = function (roomId) {
            var defered = $q.defer();
            var thePromise = defered.promise;
            $http({
                method: "GET",
                url: "/rooms/" + roomId
            }).success(function(room){
                defered.resolve(room);
            }).error(function(err){
                defered.reject(err);
            });
            return thePromise;
        };

        var getRoomFull = function (roomId) {
            var defered = $q.defer();
            var thePromise = defered.promise;
            $http({
                method: "GET",
                url: "/rooms/" + roomId + "?populate=teachers,students"
            }).success(function(room){
                defered.resolve(room);
            }).error(function(err){
                defered.reject(err);
            });
            return thePromise;
        };

        var getRoomsBySchool = function (schoolId) {
            var defered = $q.defer();
            var thePromise = defered.promise;
            $http({
                method: "GET",
                url: "/rooms?school=" + schoolId + "&populate=teachers"
            }).success(function(rooms){
                defered.resolve(rooms);
            }).error(function(err){
                defered.reject(err);
            });
            return thePromise;
        };

        var getAdminRoomsBySchool = function (schoolId) {
            var defered = $q.defer();
            var thePromise = defered.promise;
            $http({
                method: "GET",
                url: "/rooms?school=" + schoolId + "&roomType=admin&populate=teachers"
            }).success(function(rooms){
                defered.resolve(rooms);
            }).error(function(err){
                defered.reject(err);
            });
            return thePromise;
        };



        var getRoomsByTeacher = function (teacherId) {
            var defered = $q.defer();
            var thePromise = defered.promise;
            $http({
                method: "GET",
                url: "/rooms/?teachers=" + teacherId + "&populate=school"
            }).success(function(rooms){
                defered.resolve(rooms);
            }).error(function(err){
                defered.reject(err);
            });
            return thePromise;
        };

        var getRoomsByStudent = function (studentId) {
            var defered = $q.defer();
            var thePromise = defered.promise;
            $http({
                method: "GET",
                url: "/rooms/?students=" + studentId + "&populate=school"
            }).success(function(rooms){
                defered.resolve(rooms);
            }).error(function(err){
                defered.reject(err);
            });
            return thePromise;
        };

        var getCountsOfRoomsBySchool = function (schoolId, callBack) {
            return $http({
                method: "GET",
                url: "/rooms/count?school=" + schoolId
            }).success(function(count){
                callBack(count)
            }).error(function(err){
                console.log(err);
            })
        };

        var editRoom = function (room) {
            return $http({
                method: "PUT",
                url: "/rooms/" + room._id,
                data: room
            })
        };

        var deleteRoom = function (roomId) {
            return $http({
                method: "DELETE",
                url: "/rooms/" + roomId
            })
        };

        var removeStudentFromRoom = function (room, studentId) {
            var students = _.filter(room.students, function(student){
                return student !== studentId;
            });
            return $http({
                method: "PUT",
                url: "/rooms/" + room._id,
                data: {
                    students: students
                }
            })
        };

        var removeTeacherFromRoom = function (room, teacherId) {
            var teachers = _.filter(room.teachers, function(teacher){
                return teacher !== teacherId;
            });
            return $http({
                method: "PUT",
                url: "/rooms/" + room._id,
                data: {
                    teachers: teachers
                }
            })

        };

        var addStudentsToRoom = function(room, students) {
            var studentsNow = room.students;
                studentsNow = studentsNow.concat(students);
            return $http({
                method: "PUT",
                url: "/rooms/" + room._id,
                data: {
                    "students" : studentsNow
                }
            })
        };

        var addTeachersToRoom = function(room, teachers) {
            var teachersNow = room.teachers;
                teachersNow = teachersNow.concat(teachers);
            return $http({
                method: "PUT",
                url: "/rooms/" + room._id,
                data: {
                    "teachers" : teachersNow
                }
            })
        };

        return {
            createAdminRoom: createAdminRoom,
            createTeachingRoom: createTeachingRoom,
            getRoom: getRoom,
            getRoomFull: getRoomFull,
            getRoomsBySchool: getRoomsBySchool,
            getAdminRoomsBySchool: getAdminRoomsBySchool,
            getRoomsByTeacher: getRoomsByTeacher,
            getRoomsByStudent: getRoomsByStudent,
            getCountsOfRoomsBySchool: getCountsOfRoomsBySchool,
            editRoom: editRoom,
            deleteRoom: deleteRoom,
            removeStudentFromRoom: removeStudentFromRoom,
            removeTeacherFromRoom: removeTeacherFromRoom,
            addStudentsToRoom: addStudentsToRoom,
            addTeachersToRoom: addTeachersToRoom
        };
    }]);
