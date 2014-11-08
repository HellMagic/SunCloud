angular.module('schoolManage')
    .controller('studentsController',
    ['students', 'StudentDataProvider', '$scope', 'AuthService', 'UserDataProvider',
        function (students, StudentDataProvider, $scope, AuthService, UserDataProvider) {
            $scope.students = students;
            var me = AuthService.me;
            $scope.noTabletNum = 0;
            $scope.temp = {};
            $scope.temp.error = false;


            _.each($scope.students, function(studentItem) {

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


            $scope.gridOptions =
            {
                data: 'students',
                multiSelect: false,
                columnDefs: [
                    {field: '_id', visible: false},
                    {field: 'name', displayName: '姓名'},
                    {field: 'username', displayName: '用户名'},
                    {field: 'gender', displayName: '性别', width: 60},
                    {field: 'grade', displayName: '年级', width: 50},
                    {field: 'tablet', displayName: '正在使用的晓书',cellTemplate:'<div class="ngCellText" ng-class="col.colIndex()"><a href="/#/tablets/{{row.entity.tablet}}">{{row.getProperty(col.field)}}</a></div>'},
                    {field: '', displayName: '', cellTemplate:
                        '<div class="ngCellText" ng-class="col.colIndex()" align=center>' +
                        '<a class="glyphicon glyphicon-edit text-primary" ng-click="showEditStudentDialog(row)"></a> &nbsp;&nbsp;' +
                        '<a class="glyphicon glyphicon-remove text-primary" ng-click="showRemoveStudentDialog(row)"></a></div>'}

                    //{field: 'loginDateLocal', displayName: '上次登录时间', width: 170}
                ]
            };

            $scope.showRemoveStudentDialog = function(row) {
                $('#removeStudentDialog').modal('show');
                $scope.row = row;

            };


            $scope.showEditStudentDialog = function(row) {
                $('#editStudentDialog').modal('show');
                $scope.row = row;
                $scope.temp.newName = row.entity.name;
                $scope.temp.newUsername = row.entity.username;

            };

            $scope.removeStudent = function(row) {
                StudentDataProvider.removeStudent(row.entity._id, function(old){
                    $scope.students.splice($scope.students.indexOf(old),1);
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
                        students.push(student);
                        $scope.newStudent = undefined;
                    }
                });
            };



            $scope.onDblClickRow = function (rowItem) {
                var thisUser = rowItem.entity;
                window.location = '#/student/' + thisUser._id;
            };




        }]);
