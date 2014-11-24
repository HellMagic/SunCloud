'use strict';

angular.module('myRooms').controller('myRoomController',
    ['theRoom', '$scope', '$stateParams', '$location', 'Authentication','RoomDataProvider', 'StudentDataProvider', 'UserDataProvider','$http','DataAgent', 'AuthService', '$state',
    function(theRoom, $scope, $stateParams, $location, Authentication, RoomDataProvider, StudentDataProvider,UserDataProvider, $http,DataAgent, AuthService, $state) {
        $scope.authentication = Authentication;
        $scope.isEditRoomName = false;
        $scope.addState = true;
        $scope.addBatchState = false;
        var me = AuthService.me;

            $scope.theRoom = theRoom;
            $scope.theRoom.students = $scope.theRoom.students.sort(function(a, b) {
                if (a.name && b.name) {
                    return a.name.localeCompare(b.name);
                }
                return a.username.localeCompare(b.username);
            });
            $scope.noTabletNum = 0;
            _.each($scope.theRoom.students, function(studentItem) {

                UserDataProvider.getTablet(studentItem._id,function(record){
                    if(record.length){
                        studentItem.tabletId = record[0].tabletId._id;
                        studentItem.tablet = record[0].tabletId.machine_id;
                        studentItem.loginTime = record[0].loginTime;
                    }else{
                        $scope.noTabletNum++;
                    }
                })
            });

        RoomDataProvider.getRoom($stateParams.roomId, function(room){
           $scope.roomMin = room;
        });

        $scope.logout = function (row) {
            $http({
                method: 'GET',
                url: '/usertablet?userId=' + row.entity._id + '&tabletId=' + row.entity.tabletId
            }).success(function(record){
                console.log('logout success' + record);
                row.entity.tabletId = null;
                row.entity.tablet = null;
                row.entity.loginTime = null;
                $('#logoutDialog').modal('hide');
            }).error(function(err){
                console.error(err)
            })
        };


        $scope.showLogoutDialog = function(row) {
            $('#logoutDialog').modal('show');
            $scope.row = row;
        };


        $scope.disclaimRoom = function() {
            RoomDataProvider.disclaimRoom($scope.theRoom, me._id, function(oldRoom) {
                console.log('hello');
                DataAgent.prepForBroadcast('disclaimRoom', oldRoom);
                RoomDataProvider.jumpToFirst();
                $('#disbandRoomDialog').modal('hide');
                $('.modal-backdrop').remove();
                $state.reload();
            });
        };

        $scope.editRoomName = function() {
            $scope.isEditRoomName = true;
        };

        $scope.editRoomNameOver = function() {
            var theEditRoom = _.find($scope.rooms, function(roomItem) {
                return roomItem.classCode == $scope.theRoom.classCode;
            });
            if (theEditRoom) {
                theEditRoom.name = $scope.theRoom.name;
            } else {
                console.log('Edit Room Find Error');
            }
            $scope.isEditRoomName = false;
            RoomDataProvider.editRoom({
                name: $scope.theRoom.name
            }, $stateParams.roomId,function(newRoomMin) {
            });
        };

        $scope.toAddStudents = function() {
            $scope.addState = true;
            $scope.addBatchState = false;
        };

        $scope.toAddStudentsBatch = function() {
            $scope.addState = false;
            $scope.addBatchState = true;
        };



        var selectedStudents = [];
        var getStudentsNotInRoom = function () {
                console.log('start');
                StudentDataProvider.getStudentsBySchool(me.school, function(students){
                    var allStudents = students;
                    var studentIds = $scope.theRoom.students;

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
            RoomDataProvider.addStudentsToRoom($scope.roomMin, selectedStudents, function(room) {
                $('#joinStudentDialog').modal('hide');
                $state.transitionTo($state.current, $stateParams, {
                    reload: true,
                    inherit: false,
                    notify: true
                });
            })

        };

        $scope.addStudentsBatch = function() {

        };



        $scope.toCreateStudent = function() {
            $('#createStudentDialog').modal('show');
        };

        $scope.createStudent = function () {
            if (($scope.newStudent === undefined) || ($scope.newStudent.name == '') || ($scope.newStudent.name === undefined) || ($scope.newStudent.username == '') || ($scope.newStudent.username === undefined)) {
                alert('请填写新学生名称');
                return;
            }
            if (!$scope.newStudent.username.match(/^[@\.a-zA-Z0-9_-]+$/)) {
                alert('用户名只能包含字母、数字、“-”、“_”、“@”、“.”。');
                return;
            }
            StudentDataProvider.createStudent({
                "name": $scope.newStudent.name,
                "username": $scope.newStudent.username,
                "school": me.school,
                "callBack": function (err, student) {
                    if (err) {
                        alert('创建失败，可能由于用户已存在。');
                        return;
                    }
                    $scope.studentsNotInRoom.push(student);
                    $scope.studentsNotInRoom[$scope.studentsNotInRoom.length-1].selected = true;
                    $scope.newStudent = undefined;
                    $('#createStudentDialog').modal('hide');
                }
            });
        };

        $scope.showEditStudentDialog = function(row) {
            $('#editStudentDialog').modal('show');
            $scope.row = row;
            $scope.temp.newName = row.entity.name;
            $scope.temp.newUsername = row.entity.username;

        };

        $scope.showRemoveStudentDialog = function(row) {
            $('#removeStudentDialog').modal('show');
            $scope.row = row;

        };

        $scope.removeStudentFromRoom = function(row) {
            RoomDataProvider.removeStudentFromRoom($scope.roomMin, row.entity._id, function(old){
                $scope.theRoom.students.splice($scope.theRoom.students.indexOf(old),1);
                $('#removeStudentDialog').modal('hide');
            })
        };

        $scope.editStudent = function(row) {
            var info = {};
            info._id = row.entity._id;
            info.name = $scope.temp.newName;
            info.username = $scope.temp.newUsername;
            StudentDataProvider.editStudent(info, function(err, editedStudent){
                if(err){
                    $scope.temp.error = true;
                    return;
                }
                $scope.row.entity.name = editedStudent.name;
                $scope.row.entity.username = editedStudent.username;
                $('#editStudentDialog').modal('hide');

            })
        };



        $scope.gridOptions =
        {
            data: 'theRoom.students',
            showFilter: false,
            multiSelect: false,
            columnDefs: [
                {field: 'username', displayName: '用户名', cellTemplate:'<div class="ngCellText" ng-class="col.colIndex()"><a href="/#/students/{{row.entity._id}}">{{row.getProperty(col.field)}}</a></div>'},
                {field: 'name', displayName: '姓名'},
                {field: 'tablet', displayName: '正在使用的晓书',cellTemplate:'<div class="ngCellText" ng-class="col.colIndex()"><a href="/#/tablets/{{row.entity.tablet}}">{{row.getProperty(col.field)}}</a></div>'},
                {field: 'loginTime', displayName: '上次登录时间'},
                {field: '', displayName: '', cellTemplate:
                '<div class="ngCellText" ng-class="col.colIndex()" align=center>' +
                '<a class="glyphicon glyphicon-edit text-primary" ng-click="showEditStudentDialog(row)"></a> &nbsp;&nbsp;' +
                '<a class="glyphicon glyphicon-remove text-primary" ng-click="showRemoveStudentDialog(row)"></a></div>'},
                {field: 'tablet', displayName: '',
                    cellTemplate:'<button type="button" style="align-items: center" class="btn btn-default btn-sm" ng-click="showLogoutDialog(row)" ng-show="row.entity.tablet"><span class="glyphicon glyphicon-log-out"></span> 登出晓书</button>'}
            ]
        };
    }
]);
