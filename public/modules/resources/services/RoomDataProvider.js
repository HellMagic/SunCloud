angular.module('schoolManage')
    .factory('RoomDataProvider', ['$http', '$q', '$route', function ($http, $q, $route) {
        var createRoom = function (info) {
            $http({
                method: "POST",
                url: "/rooms",
                data: {
                    "name": info.name,
                    "school": info.school,
                    "students": [],
                    "teachers": [{}]
                }
            }).success(function (room) {
                info.callBack(undefined, room);
            }).error(function (err) {
                info.callBack(err);
            });
        };

        var getRoom = function (roomId, callBack) {
            var defered = $q.defer();
            var roomPromise = defered.promise;
            $http({
                method: "GET",
                url: "/rooms/" + roomId
            }).success(function (room) {
                defered.resolve(room);
                if(callBack){
                    callBack(room);
                }
            }).error(function (err) {
                console.error(err);
            });
            return roomPromise;
        };
        var getRoomFull = function (roomId) {
            var defered = $q.defer();
            var roomPromise = defered.promise;
            $http({
                method: "GET",
                url: "/rooms/" + roomId + "?populate=teachers.teacher,students"
            }).success(function (room) {
                defered.resolve(room);
            }).error(function (err) {
                defered.reject(err);
            });
            return roomPromise;
        };
        var getRoomsBySchool = function (schoolId) {
            var defered = $q.defer();
            var roomPromise = defered.promise;
            $http({
                method: "GET",
                url: "/rooms?school=" + schoolId + "&populate=teachers.teacher"
            }).success(function (rooms) {
                defered.resolve(rooms);
            }).error(function (err) {
                console.error(err);
            });
            return roomPromise;
        };
        var getRoomsByUser = function (role) {
            var id = "";
            if (role === "teacher") {
                id = $route.current.params.teacherId;
            } else if (role === "student") {
                id = $route.current.params.studentId;
            } else {
                var err = new Error('The param "role" should be "teacher" or "student".');
                return console.error(err);
            }
            var defered = $q.defer();
            var roomPromise = defered.promise;
            $http({
                method: "GET",
                url: "/rooms/?" + role + "s=" + id + "&populate=school"
            }).success(function (rooms) {
                defered.resolve(rooms);
            }).error(function (err) {
                console.error(err);
            });
            return roomPromise;
        };
        var getCountsOfRoomsBySchool = function (schoolId, callBack) {
            $http({
                method: "GET",
                url: "/rooms/count?school=" + schoolId
            }).success(function (counts) {
                callBack(counts)
            }).error(function (err) {
                console.error(err);
            });
        };

        var editRoom = function (room, callBack) {
            $http({
                method: "PUT",
                url: "/rooms/" + room._id,
                data: room
            }).success(function (room) {
                callBack(room);
            }).error(function (err) {
                console.error(err);
            });
        };
        var deleteRoom = function (roomId, callBack) {
            $http({
                method: "DELETE",
                url: "/rooms/" + roomId
            }).success(function (room) {
                callBack(room);
            }).error(function (err) {
                console.error(err);
            });
        };

        var removeStudentFromRoom = function (room, studentId, callBack) {
            console.log(room.students);
            var students = _.filter(room.students, function(student){
                return student !== studentId;
            });
            $http({
                method: "PUT",
                url: "/rooms/" + room._id,
                data: {
                    students: students
                }
            }).success(function(room) {
                callBack(room);
            }).error(function(err) {
                console.error(err);
            })
        };

        var removeTeacherFromRoom = function (room, teacherId, callBack) {
            var teachers = _.filter(room.teachers, function(teacher){
                return teacher !== teacherId;
            });
            $http({
                method: "PUT",
                url: "/rooms/" + room._id,
                data: {
                    teachers: teachers
                }
            }).success(function(room) {
                callBack(room);
            }).error(function(err) {
                console.error(err);
            })

        };

        var addStudentsToRoom = function(room, students, callBack) {
            var studentsNow = room.students;
            if(studentsNow.length){
                studentsNow = studentsNow.concat(students);
            }else{
                studentsNow = students;
            }
            console.log(studentsNow);
            $http({
                method: "PUT",
                url: "/rooms/" + room._id,
                data: {
                    "students" : studentsNow
                }
            }).success(function(room) {
                callBack(room);
            }).error(function(err) {
                console.error(err);
            })



        };
        return {
            createRoom: createRoom,
            getRoom: getRoom,
            getRoomFull: getRoomFull,
            getRoomsBySchool: getRoomsBySchool,
            getRoomsByUser: getRoomsByUser,
            getCountsOfRoomsBySchool: getCountsOfRoomsBySchool,
            editRoom: editRoom,
            deleteRoom: deleteRoom,
            removeStudentFromRoom: removeStudentFromRoom,
            removeTeacherFromRoom: removeTeacherFromRoom,
            addStudentsToRoom: addStudentsToRoom
        };
    }]);
