angular.module('schoolManage')
    .controller('teachersController',
    ['teachers', 'TeacherDataProvider', '$scope', 'AuthService', '$location',
        function (teachers, TeacherDataProvider, $scope, AuthService, $location) {
            $scope.teachers = teachers;
            var me = AuthService.me;
            $scope.temp = {};
            $scope.temp.error = false;
            $scope.selectedTeacher = [];
            $scope.isAdmin = false;
            $scope.filterOptions = {
                filterText: ''
            };

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
                selectedItems: $scope.selectedTeacher,
                filterOptions: $scope.filterOptions


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

            $scope.deleteTeacher = function(row) {
                TeacherDataProvider.deleteTeacher(row.entity._id, function(old){
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
                var info = {};
                info.name = $scope.newTeacher.name;
                info.username = $scope.newTeacher.username;
                info.school = me.school._id;
                info.roles = ['teacher'];
                if($scope.isAdmin) {
                    info.roles.push('admin');
                }
                info.password = 'xiaoshu';
                TeacherDataProvider.createTeacher(info)
                    .success(function(teacher){
                        $scope.teachers.push(teacher);
                        $scope.newTeacher = undefined;
                        $('#createTeacherDialog').modal('hide');
                        swal({
                            title: "创建成功",
                            text: "此用户名可登录晓书教师账号和教师平台\n教师平台默认密码为xiaoshu",
                            type: "success",
                            confirmButtonColor: "#2E8B57",
                            confirmButtonText: "确定",
                            closeOnConfirm: false })
                    })
                    .error(function(err){
                        console.error(err);
                        if(err.code === 11000) {
                            $scope.errorMessage = "用户名已存在，请修改后重试"
                        }
                        swal({title: "创建失败", text: $scope.errorMessage, type: 'error'});
                    });
            };



            $scope.selectTeacher = function () {
                //console.log($scope.selectedItem);
                //$state.transitionTo(roomView(roomId: $scope.gridOptions.selectedItems[0]._id))
                $location.path('/teachers/' + $scope.gridOptions.selectedItems[0]._id);
            };


        }]);
