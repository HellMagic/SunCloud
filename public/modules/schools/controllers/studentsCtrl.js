angular.module('schools')
    .controller('studentsRootController',
    ['students', 'StudentDataProvider', 'RootDataProvider','$scope', '$location',
        function (students, StudentDataProvider, RootDataProvider,$scope, $location) {

            $scope.students = students;
            $scope.studentsGrid = [];
            $scope.newStudent = {};
            $scope.selectedStudent = [];
            $scope.temp = {};

            RootDataProvider.getAllSchools().then(function(schools) {
                $scope.schools = schools;
            });
            $scope.filterOptions = {
                filterText: ''
            };

            $scope.gridOptions =
            {
                data: 'students',
                multiSelect: false,
                rowTemplate: '<div  ng-mouseover="$parent.showedit=true" ng-mouseleave="$parent.showedit=false" ng-style="{\'cursor\': row.cursor, \'z-index\': col.zIndex() }" ' +
                'ng-repeat="col in renderedColumns" ng-class="col.colIndex()" ' +
                'class="ngCell {{col.cellClass}}" ng-cell></div>',
                columnDefs: [
                    {field: '_id', visible: false},
                    {field: 'name', displayName: '姓名'},
                    {field: 'username', displayName: '用户名'},
                    {field: 'school.name', displayName: '学校'},
                    {field: '', displayName: '编辑', cellTemplate:
                    '<div class="ngCellText" ng-class="col.colIndex()" ng-show="showedit">' +
                    '<a class="glyphicon glyphicon-edit text-success" ng-click="showEditStudentDialog($event, row)"></a> &nbsp;&nbsp;' +
                    '<a class="glyphicon glyphicon-remove text-success" ng-click="deleteStudent($event,row)"></a></div>'}
                ],
                filterOptions: $scope.filterOptions,
                selectedItems: $scope.selectedStudent
            };

            $scope.createStudent = function() {
                var info = {};
                info.name = $scope.newStudent.name;
                info.username = $scope.newStudent.username;
                info.school = $scope.newStudent.school._id;
                info.roles = ['student'];
                StudentDataProvider.createStudent(info)
                    .success(function(student){
                        student.school = $scope.newStudent.school;
                        $scope.students.push(student);
                        $scope.newStudent = {};
                        $('#createStudentDialog').modal('hide');
                    }).error(function(err){
                        console.error(err);
                        if(err.code === 11000) {
                            var message = "用户名已存在，请修改后重试"
                        }
                        swal({title: "创建失败", text: message, type: 'error'});
                    });
            };

            $scope.deleteStudent = function (event, row) {
                event.stopPropagation();
                swal({
                        title: "您确定要删除学生"+row.entity.name+"吗?",
                        text: "删除之后，该学生信息将无法找回",
                        type: "warning",
                        showCancelButton: true,
                        cancelButtonText: "取消",
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "删除",
                        closeOnConfirm: false },
                    function(){
                        StudentDataProvider.removeStudent(row.entity._id)
                            .success(function(student){
                                swal({title: "删除成功", type: "success", timer: 1000 });
                                $scope.students.splice($scope.students.indexOf(row.entity),1);
                            })
                            .error(function(err){
                                console.error(err);
                                swal({title: "删除失败", text: "", type: 'error'})
                            })
                    });
            };

            $scope.showEditStudentDialog = function(event, row) {
                event.stopPropagation();
                $('#editStudentDialog').modal('show');
                $scope.row = row;
                $scope.temp.newName = row.entity.name;
                $scope.temp.newUsername = row.entity.username;
                $scope.temp.newSchool = _.find($scope.schools, function(school) {
                    return school._id === row.entity.school._id
                });
            };
            $scope.editStudent = function(row) {
                var info = {};
                info._id = row.entity._id;
                info.name = $scope.temp.newName;
                info.username = $scope.temp.newUsername;
                info.school = $scope.temp.newSchool;
                StudentDataProvider.editStudent(info)
                    .success(function(editedStudent) {
                        $scope.row.entity.name = editedStudent.name;
                        $scope.row.entity.username = editedStudent.username;
                        $scope.row.entity.school = info.school;
                        $('#editStudentDialog').modal('hide');
                        swal({title: "修改成功", type: "success", timer: 1000 });
                    })
                    .error(function(err) {
                        console.error(err);
                        $scope.error = true;
                        swal({title: "修改失败", text: "请重试", type: "error", timer: 2000 });
                    })
            };

            $scope.selectStudent = function () {
                console.log($scope.gridOptions.selectedItems);
                $location.path('/students/' + $scope.gridOptions.selectedItems[0]._id);
            };

        }
    ]);
