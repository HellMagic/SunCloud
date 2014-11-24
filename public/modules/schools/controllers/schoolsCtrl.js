angular.module('schools')
    .controller('schoolsController',
    [
        'schools',
        'SchoolDataProvider',
        'TeacherDataProvider',
        'RoomDataProvider',
        'StudentDataProvider',
        'TabletDataProvider',
        'RootDataProvider',
        '$scope',
        'AuthService',
        '$location',
        function
            (schools, SchoolDataProvider, TeacherDataProvider,RoomDataProvider,StudentDataProvider, TabletDataProvider,RootDataProvider,$scope, AuthService, $location) {

            $scope.schools = schools;

            $scope.me = AuthService.me;
            $scope.newSchool = {};
            $scope.selectedSchool = [];
            $scope.temp = {};
            $scope.filterOptions = {
                filterText: ''
            };

            RootDataProvider.getAllSchoolsCount(function(counts){
                $scope.schoolCount = counts.count;
            });

            _.each($scope.schools, function(school) {
                RoomDataProvider.getCountsOfRoomsBySchool(school._id, function(counts){
                    school.roomCount = counts.count;
                });
                StudentDataProvider.getCountsOfStudentsBySchool(school._id, function(counts){
                    school.studentCount = counts.count;
                });
                TeacherDataProvider.getCountsOfTeachersBySchool(school._id, function(counts){
                    school.teacherCount = counts.count;
                });
                TabletDataProvider.getXiaoshuBySchool(school._id, function(counts){
                    school.xiaoshuLogCount = counts.count;
                })
            });

            $scope.gridOptions =
            {
                data: 'schools',
                multiSelect: false,
                rowTemplate: '<div  ng-mouseover="$parent.showedit=true" ng-mouseleave="$parent.showedit=false" ng-style="{\'cursor\': row.cursor, \'z-index\': col.zIndex() }" ' +
                'ng-repeat="col in renderedColumns" ng-class="col.colIndex()" ' +
                'class="ngCell {{col.cellClass}}" ng-cell></div>',
                columnDefs: [
                    {field: 'name', displayName: '学校名称', width:180},
                    {field: 'code', displayName: '学校代号'},
                    {field: 'address', displayName: '所在地', width:100},
                    {field: 'studentCount', displayName: '学生数', width:60},
                    {field: 'teacherCount', displayName: '老师数', width:60},
                    {field: 'roomCount', displayName: '班级数', width:60},
                    {field: 'xiaoshuLogCount', displayName: '登录晓书人数'},
                    {field: '', displayName: '编辑', cellTemplate:
                    '<div class="ngCellText" ng-class="col.colIndex()" ng-show="showedit">' +
                    '<a class="glyphicon glyphicon-edit text-success" ng-click="showEditSchoolDialog($event, row)"></a> &nbsp;&nbsp;' +
                    '<a class="glyphicon glyphicon-remove text-success" ng-click="deleteSchool($event,row)"></a></div>'}
                ],
                filterOptions: $scope.filterOptions,
                selectedItems: $scope.selectedSchool
            };


            $scope.createSchool = function () {
                var info = {};
                info.name = $scope.newSchool.name;
                info.address = $scope.newSchool.address;
                info.serverUrl = $scope.newSchool.serverUrl;
                info.serverIP = $scope.newSchool.serverIP;
                info.code = $scope.newSchool.code;

                var admin = {};
                admin.name = $scope.newSchool.name;
                admin.username = $scope.newSchool.admin;
                admin.password = 'xiaoshu';
                admin.roles = ['admin'];

                SchoolDataProvider.createSchool(info)
                    .success(function(school){
                        console.log(school);
                        $scope.schools.push(school);
                        $scope.newSchool = {};
                        $('#createSchoolDialog').modal('hide');
                        admin.school = school._id;
                        TeacherDataProvider.createTeacher(admin)
                            .success(function(newUser) {
                                swal({
                                    title: "创建学校成功",
                                    text: "学校管理员用户名为"+newUser.username+"\n默认密码为xiaoshu",
                                    type: "success",
                                    confirmButtonColor: "#2E8B57",
                                    confirmButtonText: "确定",
                                    closeOnConfirm: false })
                            }).error(function(err){
                                swal({
                                    title: "创建学校成功",
                                    text: "创建学校管理员账号失败，请重试",
                                    type: "warning",
                                    confirmButtonColor: "#2E8B57",
                                    confirmButtonText: "确定",
                                    closeOnConfirm: false })
                            });

                    }).error(function(err){
                        console.error(err);
                        swal('创建失败','请重试','error');
                    });
            };

            $scope.showEditSchoolDialog = function(event, row) {
                event.stopPropagation();
                $('#editSchoolDialog').modal('show');
                $scope.row = row;
                $scope.temp.newName = row.entity.name;
                $scope.temp.newCode = row.entity.code;
                $scope.temp.newAddress = row.entity.address;
                $scope.temp.newServerUrl = row.entity.serverUrl;
                $scope.temp.newServerIP = row.entity.serverIP;

            };
            $scope.editSchool = function(row) {
                var info = {};
                info._id = row.entity._id;
                info.name = $scope.temp.newName;
                info.code = $scope.temp.newCode;
                info.address = $scope.temp.newAddress;
                info.serverUrl = $scope.temp.newServerUrl;
                info.serverIP = $scope.temp.newServerIP;
                SchoolDataProvider.editSchool(info)
                    .success(function(editedSchool) {
                        $scope.row.entity.name = editedSchool.name;
                        $scope.row.entity.code = editedSchool.code;
                        $scope.row.entity.address = editedSchool.address;
                        $('#editSchoolDialog').modal('hide');
                        swal({title: "修改成功", type: "success", timer: 1000 });
                    })
                    .error(function(err) {
                        console.error(err);
                        $scope.error = true;
                        swal({title: "修改失败", text: "请重试", type: "error", timer: 2000 });
                    })
            };

            $scope.deleteSchool = function (event, row) {
                event.stopPropagation();
                swal({
                        title: "您确定要删除"+row.entity.name+"吗?",
                        text: "删除之后，该学校信息将无法找回",
                        type: "warning",
                        showCancelButton: true,
                        cancelButtonText: "取消",
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "删除",
                        closeOnConfirm: false },
                    function(){
                        SchoolDataProvider.deleteSchool(row.entity._id)
                            .success(function(school){
                                swal({title: "删除成功", type: "success", timer: 1000 });
                                $scope.schools.splice($scope.schools.indexOf(row.entity),1);
                            })
                            .error(function(err){
                                console.error(err);
                                swal({title: "删除失败", text: "", type: 'error'})
                            })
                    });
            };

            $scope.selectSchool = function () {
                console.log($scope.gridOptions.selectedItems);
                $location.path('/schools/' + $scope.gridOptions.selectedItems[0]._id);
            };
        }]);
