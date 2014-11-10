angular.module('resources')
    .controller('roomViewController',
    [
        'room',
        'teachers',
        'students',
        'RoomDataProvider',
        'StudentDataProvider',
        '$scope',
        '$state',
        '$stateParams',
        'AuthService', function (
        room, teachers, students, RoomDataProvider, StudentDataProvider, $scope, $state, $stateParams,AuthService) {

        var me = AuthService.me;
        $scope.isEditingRoomName = false;

        $scope.allTeachers = teachers;
        $scope.allStudents = students;

        $scope.room = room;
        $scope.$watch('room', function (newRoom) {
            if (newRoom) {
                room = newRoom;
                $scope.room = room;
                $scope.roomNewName = room.name;
            }
        }, true);

        RoomDataProvider.getRoom($scope.room._id, function(room){
            $scope.roomMin = room;
        });

        $scope.teachers = room.teachers;

        $scope.students = $scope.room.students;

        $scope.$watch('students', function (newStudents) {
            if (newStudents) {
                newStudents = newStudents.sort(function (a, b) {
                    return a.username.localeCompare(b.username);
                });
                $scope.students = newStudents;
            }
        }, true);


        $scope.toEdit = function () {
            $scope.isEditingRoomName = true;
        };

        $scope.cancelEdit = function () {
            $scope.isEditingRoomName = false;
        };

        $scope.editRoom = function () {
            if (($scope.roomNewName == "") || ($scope.roomNewName === undefined)) {
                alert('请填写班级新名称');
                return;
            }
            $scope.isEditingRoomName = false;
            room.name = $scope.roomNewName;
            RoomDataProvider.editRoom(room, function (room) {
                $scope.room = room;
            });
        };

        $scope.gridOptions =
        {
            data: 'students',
            multiSelect: false,
            columnDefs: [
                {field: '_id', visible: false},
                {field: 'name', displayName: '姓名'},
                {field: 'username', displayName: '用户名'},
                {field: 'grade', displayName: '年级', width: 50},
                {field: '', displayName: '', cellTemplate:
                '<div class="ngCellText" ng-class="col.colIndex()" align=center>' +
                '<a class="glyphicon glyphicon-remove text-primary" ng-click="showRemoveStudentFromRoomDialog(row)"></a></div>'}
            ]
        };

        $scope.showRemoveStudentFromRoomDialog = function(index) {
            $('#removeStudentFromRoomDialog').modal('show');
            $scope.index = index;

        };

        $scope.showRemoveTeacherFromRoomDialog = function(index) {
            $('#removeTeacherFromRoomDialog').modal('show');
            $scope.index = index;

        };

        $scope.showAddTeacherDialog = function() {
            $('#room-addTeachers').modal('show');
        };


        $scope.removeStudentFromRoom = function(index) {
            RoomDataProvider.removeStudentFromRoom(room, students[index]._id, function(old){
                $scope.students.splice($scope.students.indexOf(old),1);
                $('#removeStudentFromRoomDialog').modal('hide');
            })
        };


        $scope.removeTeacherFromRoom = function(index) {
            console.log(teachers[index])
            RoomDataProvider.removeTeacherFromRoom(room, teachers[index], function(old){
                $scope.teachers.splice($scope.teachers.indexOf(old),1);
                $('#removeTeacherFromRoomDialog').modal('hide');
            })
        };

        $scope.selectTeachers = function (index) {
            if ($scope.allTeachers[index].selected) {
                $scope.teachersNotInRoom[index].selected = false;
                for (var i = 0; i < selectedTeachers.length; i++) {
                    if (selectedTeachers[i] == $scope.teachersNotInRoom[index]._id) {
                        selectedTeachers.splice(i, 1);
                        break;
                    }
                }
            } else {
                $scope.teachersNotInRoom[index].selected = true;
                selectedTeachers.push($scope.teachersNotInRoom[index]._id);
            }
        };

        $scope.toAddStudents = function() {
          $('#room-addStudents').modal('show');
            getStudentsNotInRoom();
        };

        $scope.toAddStudentsBatch = function() {
            $('#room-AddStudentsBatch').modal('show')
        };

        var selectedStudents = [];
        var getStudentsNotInRoom = function () {
            console.log('start');
            StudentDataProvider.getStudentsBySchool(me.school, function(students){
                var allStudents = students;
                var studentIds = $scope.room.students;

                selectedStudents = [];
                var studentsNotInRoom = [];
                for (var i = 0; i < allStudents.length; i++) {
                    var found = false;
                    for (var j = 0; j < studentIds.length; j++) {
                        if (allStudents[i]._id === studentIds[j]._id) {
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        studentsNotInRoom.push(allStudents[i]);
                        studentsNotInRoom[studentsNotInRoom.length - 1].selected = false;
                    }
                }
                $scope.studentsNotInRoom = studentsNotInRoom;
            });


        };

        $scope.selectStudents = function (index) {
            if ($scope.studentsNotInRoom[index].selected) {
                $scope.studentsNotInRoom[index].selected = false;
                for (var i = 0; i < selectedStudents.length; i++) {
                    if (selectedStudents[i] == $scope.studentsNotInRoom[index]._id) {
                        selectedStudents.splice(i, 1);
                        break;
                    }
                }
            } else {
                $scope.studentsNotInRoom[index].selected = true;
                selectedStudents.push($scope.studentsNotInRoom[index]._id);
            }
        };

        $scope.addStudents = function() {

            console.log(selectedStudents);
            console.log($scope.roomMin.students);
            RoomDataProvider.addStudentsToRoom($scope.roomMin, selectedStudents, function(room) {
                $('#room-addStudents').modal('hide');
                $state.transitionTo($state.current, $stateParams, {
                    reload: true,
                    inherit: false,
                    notify: true
                });
            })

        };





        $scope.studentPage = function (index) {
            window.location = '#/students/' + $scope.students[index]._id;
        };

        $scope.teacherPage = function (index) {
            window.location = '#/teachers/' + $scope.teachers[index]._id;
        };



    }
]);
