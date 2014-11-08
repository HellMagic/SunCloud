angular.module('schools')
    .controller('classesRootController',
    ['rooms', 'RoomDataProvider', '$scope',
        function (rooms, TeacherDataProvider, $scope) {
            $scope.rooms = rooms;



            $scope.gridOptions =
            {
                data: 'rooms',
                multiSelect: false,
                columnDefs: [
                    {field: '_id', visible: false},
                    {field: 'name', displayName: '班级名'},
                    {field: 'school.name', displayName: '学校'},
                    //{field: 'grade', displayName: '年级', width: 50}
                    //{field: 'loginDateLocal', displayName: '上次登录时间', width: 170}
                ],
                selectedItems: []
            };



            $scope.onDblClickRow = function (rowItem) {
                var thisUser = rowItem.entity;
                window.location = '#/student/' + thisUser._id;
            };




        }]);
