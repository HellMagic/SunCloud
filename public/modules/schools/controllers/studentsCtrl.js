angular.module('schoolManage')
    .controller('studentsController',
    ['students', 'StudentDataProvider', '$scope', 'count',
        function (students, StudentDataProvider, $scope, count) {
        $scope.students = students;
        $scope.studentsGrid = [];



        $scope.gridOptions =
        {
            data: 'students',
            multiSelect: false,
            columnDefs: [
                {field: '_id', visible: false},
                {field: 'name', displayName: '姓名'},
                {field: 'username', displayName: '用户名'},
                {field: 'gender', displayName: '性别', width: 60},
                {field: 'school.name', displayName: '学校'},
                {field: 'grade', displayName: '年级', width: 50}
                //{field: 'loginDateLocal', displayName: '上次登录时间', width: 170}
            ]
        };



        $scope.onDblClickRow = function (rowItem) {
            var thisUser = rowItem.entity;
            window.location = '#/student/' + thisUser._id;
        };




    }]);