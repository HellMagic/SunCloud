angular.module('schools')
    .controller('teachersRootController',
    ['teachers', 'TeacherDataProvider', '$scope',
        function (teachers, TeacherDataProvider, $scope) {
            $scope.teachers = teachers;



            $scope.gridOptions =
            {
                data: 'teachers',
                multiSelect: false,
                columnDefs: [
                    {field: '_id', visible: false},
                    {field: 'name', displayName: '姓名'},
                    {field: 'username', displayName: '用户名'},
                    {field: 'gender', displayName: '性别', width: 60},
                    {field: 'school.name', displayName: '学校'},
                    {field: 'email', displayName: '邮箱'},
                    {field: 'phone', displayName: '电话'},
                    //{field: 'grade', displayName: '年级', width: 50}
                    //{field: 'loginDateLocal', displayName: '上次登录时间', width: 170}
                ]
            };



            $scope.onDblClickRow = function (rowItem) {
                var thisUser = rowItem.entity;
                window.location = '#/student/' + thisUser._id;
            };




        }]);
