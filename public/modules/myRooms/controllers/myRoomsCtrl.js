angular.module('myRooms')
    .controller('myRoomsController', [
        'myRooms',
        '$scope',
        'RoomDataProvider',
        'DataAgent',
        'UserDataProvider',
        '$location',
        'AuthService',
        function(myRooms, $scope, RoomDataProvider, DataAgent, UserDataProvider, $location, AuthService) {
            $scope.temp = {};

            var me = AuthService.me;

            $scope.rooms = myRooms;
            console.log(myRooms);



            RoomDataProvider.getAdminRoomsBySchool(me.school).then(function(rooms){
                $scope.roomList = rooms;
                $scope.selectedRoom = $scope.roomList[0];
                console.log(rooms);
            });


            $scope.$watch('rooms', function(newRooms) {
                if (newRooms) {
                    $scope.rooms = newRooms;
                    for (var index = 0; index < $scope.rooms.length; index++) {
                        var theRoom = $scope.rooms[index];
                        if (theRoom.students === undefined) {
                            theRoom.students = [];
                        }
                    }
                }
            }, true);

            $scope.selectOneRoom = function(selectedRoom) {
                //_.each($scope.rooms, function(eachItem) {
                //    eachItem.isActive = false;
                //});
                //selectedRoom.isActive = true;
              $location.path('/myRooms/' + selectedRoom._id);
            };

            $scope.createTeachingRoom = function() {
                $scope.temp.createRoomTip = '';
                if (($scope.newRoomName == "") || ($scope.newRoomName === undefined)) {
                    $scope.temp.createRoomTip = 'noName';
                    return;
                }
                if ($scope.newRoomName.length > 15) {
                    $scope.temp.createRoomTip = 'formatWrong';
                    return;
                }
                var rooms = $scope.rooms;
                for (var roomIndex = 0; roomIndex < rooms.length; roomIndex++) {
                    if (rooms[roomIndex].name == $scope.newRoomName.trim()) {
                        $scope.temp.createRoomTip = 'alreadyHave';
                        return;
                    }
                }
                $('#createRoomDialog').modal('hide');
                RoomDataProvider.createTeachingRoom($scope.newRoomName.trim(), me._id).success(function(newRoom) {
                    var rooms = $scope.rooms;
                    var found = false;
                    for (var roomIndex = 0; roomIndex < rooms.length; roomIndex++) {
                        if (rooms[roomIndex]._id == newRoom._id) {
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        $scope.rooms.push(newRoom);
                    }
                    $scope.newRoomName = '';
                    $scope.temp.newRoomCode = newRoom.roomCode;
                    $scope.temp.create_room_success = true;
                }).error(function(err){

                });
            };


            $scope.claimRoom = function() {
                $('#claimRoomDialog').modal('hide');
                RoomDataProvider.addTeachersToRoom($scope.selectedRoom, me._id)
                    .success(function(newRoom){
                        $scope.rooms.push(newRoom);
                    })
                    .error(function(err){

                    })
            };
        }
    ]);
