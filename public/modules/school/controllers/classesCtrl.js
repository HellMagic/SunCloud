angular.module('schoolManage')
    .controller('classesController',
    ['rooms', 'RoomDataProvider', '$scope', 'AuthService', '$location',
        function (rooms, RoomDataProvider, $scope, AuthService, $location) {
            $scope.rooms = rooms;
            var me = AuthService.me;
            $scope.selectedRoom = [];



            $scope.gridOptions =
            {
                data: 'rooms',
                multiSelect: false,
                columnDefs: [
                    {field: '_id', visible: false},
                    {field: 'name', displayName: '班级名'},
                    //{field: 'school.name', displayName: '管理老师'},
                    //{field: 'grade', displayName: '年级', width: 50}
                    //{field: 'loginDateLocal', displayName: '上次登录时间', width: 170}
                ],
                selectedItems: $scope.selectedRoom
                //plugins: [new ngGridFlexibleHeightPlugin()]

            };


            $scope.createRoom = function () {
                if (($scope.newRoom === undefined) || ($scope.newRoom.name == '') || ($scope.newRoom.name === undefined) ) {
                    alert('请填写新班级名称');
                    return;
                }
                var rooms = $scope.rooms;
                for(var i = 0; i < rooms.length; i++ ) {
                    if($scope.newRoom.name.trim() === rooms[i].name){
                        alert('班级名已存在');
                        return;
                    }
                }

                RoomDataProvider.createRoom({
                    "name": $scope.newRoom.name.trim(),
                    "school": me.school},
                    function(err, room) {
                        if(err) {
                            alert('创建失败，可能由于班级名已存在');
                            return;
                        }
                        rooms.push(room);
                        $scope.newRoom = undefined;
                });
            };




            $scope.selectRoom = function () {
                $location.path('/rooms/' + $scope.gridOptions.selectedItems[0]._id);
            };
        }]);
