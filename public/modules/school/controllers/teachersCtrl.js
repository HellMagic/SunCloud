angular.module('schoolManage')
    .controller('teachersController',
    ['teachers', 'TeacherDataProvider', '$scope', 'AuthService', '$location',
        function (teachers, TeacherDataProvider, $scope, AuthService, $location) {
            $scope.teachers = teachers;
            var me = AuthService.me;
            $scope.temp = {};
            $scope.temp.error = false;
            $scope.selectedTeacher = [];


            $scope.gridOptions =
            {
                data: 'teachers',
                multiSelect: false,
                columnDefs: [
                    {field: '_id', visible: false},
                    {field: 'name', displayName: '姓名'},
                    {field: 'username', displayName: '用户名'},
                    {field: 'email', displayName: '邮箱'},
                    {field: 'phone', displayName: '电话'},
                    {field: '', displayName: '', cellTemplate:
                    '<div class="ngCellText" ng-class="col.colIndex()" align=center>' +
                    '<a class="glyphicon glyphicon-edit text-primary" ng-click="showEditTeacherDialog(row)"></a> &nbsp;&nbsp;' +
                    '<a class="glyphicon glyphicon-remove text-primary" ng-click="showRemoveTeacherDialog(row)"></a></div>'}

                    //{field: 'grade', displayName: '年级', width: 50}
                    //{field: 'loginDateLocal', displayName: '上次登录时间', width: 170}
                ],
                selectedItems: $scope.selectedTeacher

            };


            $scope.showRemoveTeacherDialog = function(row) {
                $('#removeTeacherDialog').modal('show');
                $scope.row = row;

            };


            $scope.showEditTeacherDialog = function(row) {
                $('#editTeacherDialog').modal('show');
                $scope.row = row;
                $scope.temp.newName = row.entity.name;
                $scope.temp.newUsername = row.entity.username;

            };

            $scope.removeTeacher = function(row) {
                TeacherDataProvider.removeTeacher(row.entity._id, function(old){
                    $scope.teachers.splice($scope.teachers.indexOf(old),1);
                    $('#removeTeacherDialog').modal('hide');
                })
            };

            $scope.editTeacher = function(row) {
                var info = {};
                info._id = row.entity._id;
                info.name = $scope.temp.newName;
                info.username = $scope.temp.newUsername;
                TeacherDataProvider.editTeacher(info, function(err, editedTeacher){
                    if(err){
                        $scope.temp.error = true;
                        return;
                    }
                    $scope.row.entity.name = editedTeacher.name;
                    $scope.row.entity.username = editedTeacher.username;
                    $('#editTeacherDialog').modal('hide');

                })
            };

            $scope.createTeacher = function () {
                if (($scope.newTeacher === undefined) || ($scope.newTeacher.name == '') || ($scope.newTeacher.name === undefined) || ($scope.newTeacher.username == '') || ($scope.newTeacher.username === undefined)) {
                    alert('请填写新老师名称');
                    return;
                }
                if (!$scope.newTeacher.username.match(/^[@\.a-zA-Z0-9_-]+$/)) {
                    alert('用户名只能包含字母、数字、“-”、“_”、“@”、“.”。');
                    return;
                }
                TeacherDataProvider.createTeacher({
                    "name": $scope.newTeacher.name,
                    "username": $scope.newTeacher.username,
                    "school": me.school,
                    "callBack": function (err, teacher) {
                        if (err) {
                            alert('创建失败，可能由于用户已存在。');
                            return;
                        }
                        teachers.push(teacher);
                        $scope.newTeacher = undefined;
                    }
                });
            };



            $scope.selectTeacher = function () {
                //console.log($scope.selectedItem);
                //$state.transitionTo(roomView(roomId: $scope.gridOptions.selectedItems[0]._id))
                $location.path('/teachers/' + $scope.gridOptions.selectedItems[0]._id);
            };


        }]);
