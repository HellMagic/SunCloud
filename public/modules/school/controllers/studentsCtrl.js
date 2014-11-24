angular.module('schoolManage')
    .controller('studentsController',
    ['students', 'StudentDataProvider', '$scope', 'AuthService', 'UserDataProvider', '$location',
        function (students, StudentDataProvider, $scope, AuthService, UserDataProvider, $location) {
            $scope.students = students;
            var me = AuthService.me;
            $scope.noTabletNum = 0;
            $scope.temp = {};
            $scope.errorMessage = false;
            $scope.selectedStudent = [];
            $scope.filterOptions = {
                filterText: ''
            };

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
                rowTemplate: '<div  ng-mouseover="$parent.showedit=true" ng-mouseleave="$parent.showedit=false" ng-style="{\'cursor\': row.cursor, \'z-index\': col.zIndex() }" ' +
                'ng-repeat="col in renderedColumns" ng-class="col.colIndex()" ' +
                'class="ngCell {{col.cellClass}}" ng-cell></div>',
                columnDefs: [
                    {field: '_id', visible: false},
                    {field: 'name', displayName: '姓名'},
                    {field: 'username', displayName: '用户名'},
                    {field: 'gender', displayName: '性别', width: 60},
                    {field: 'grade', displayName: '年级', width: 50},
                    {field: 'tablet', displayName: '正在使用的晓书',cellTemplate:'<div class="ngCellText" ng-class="col.colIndex()"><a href="/#/tablets/{{row.entity.tablet}}">{{row.getProperty(col.field)}}</a></div>'},
                    {field: '', displayName: '编辑', cellTemplate:
                        '<div class="ngCellText" ng-class="col.colIndex()" ng-show="showedit">' +
                        '<a class="glyphicon glyphicon-edit text-primary" ng-click="showEditStudentDialog($event, row)"></a> &nbsp;&nbsp;' +
                        '<a class="glyphicon glyphicon-remove text-primary" ng-click="removeStudent($event, row)"></a></div>'}

                    //{field: 'loginDateLocal', displayName: '上次登录时间', width: 170}
                ],
                selectedItems: $scope.selectedStudent,
                filterOptions: $scope.filterOptions
            };

            $scope.showEditStudentDialog = function(event, row) {
                event.stopPropagation();
                $('#editStudentDialog').modal('show');
                $scope.row = row;
                $scope.temp.newName = row.entity.name;
                $scope.temp.newUsername = row.entity.username;
            };
            $scope.editStudent = function(row) {
                var info = {};
                info._id = row.entity._id;
                info.name = $scope.temp.newName;
                info.username = $scope.temp.newUsername;
                StudentDataProvider.editStudent(info)
                    .success(function(editedStudent) {
                        $scope.row.entity.name = editedStudent.name;
                        $scope.row.entity.username = editedStudent.username;
                        $('#editStudentDialog').modal('hide');
                        swal({title: "修改成功", type: "success", timer: 1000 });
                    })
                    .error(function(err) {
                        console.error(err);
                        $scope.error = true;
                        swal({title: "修改失败", text: "请重试", type: "error", timer: 2000 });
                    })
            };

            $scope.removeStudent = function (event, row) {
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
                                swal({title: "删除失败", text: "请重试", type: 'error'})

                            })
                    });
            };




            $scope.createStudent = function () {
                if (!$scope.newStudent.username.match(/^[@\.a-zA-Z0-9_-]+$/)) {
                    alert('用户名只能包含字母、数字、“-”、“_”、“@”、“.”。');
                    return;
                }
                var info = {};
                info.name = $scope.newStudent.name;
                info.username = $scope.newStudent.username;
                info.school = me.school;
                info.roles = ['student'];
                StudentDataProvider.createStudent(info)
                    .success(function(newStudent) {
                        students.push(newStudent);
                        $('#createStudentDialog').modal('hide');
                        swal({title: "创建成功", type: 'success', timer: 1000});

                    })
                    .error(function(err) {
                        console.error(err);
                        if(err.code === 11000) {
                            var message = "用户名已存在，请修改后重试"
                        }
                        swal({title: "创建失败", text: message, type: 'error'});
                    }
                );
            };

            $scope.createStudentBatch = function () {

                var newStudents = [];
                var failList = [];
                //Format input string and get new students list.
                $scope.newStudentsList = $scope.newStudentsList.trim();
                var lines = $scope.newStudentsList.split(/\n/);
                for (var i = 0; i < lines.length; i++) {
                    lines[i] = lines[i].trim().replace(/[,， \s]+/igm, ' ');
                    var name = lines[i].split(/[,， \s]/)[0];
                    var username = lines[i].split(/[,， \s]/)[1];
                    if (!username.match(/^[@\.a-zA-Z0-9_-]+$/)) {
                        alert('用户名只能包含字母、数字、“-”、“_”、“@”、“.”。\n操作已取消，请重新检查！');
                        return;
                    }
                    newStudents.push({"name": name, "username": username, "school": me.school, "roles": ['student']});
                }

                function MultipleCreate(studentIndex) {
                    function switcher() {
                        console.log(studentIndex);
                        if (studentIndex < newStudents.length - 1) {
                            studentIndex++;
                            MultipleCreate(studentIndex);
                        } else {
                            if(failList.length) {
                                swal({title: "部分创建失败", text: "可能由于这些用户名已存在，请返回修改重试", type: 'warning', timer: 2000});
                                $scope.errorMessage = true;
                                var tempList = "";
                                _.each(failList, function(student) {
                                    tempList = tempList.concat(student.name+","+student.username+"\n");
                                });
                                $scope.newStudentsList = tempList;
                                console.log(tempList);
                            }else {
                                swal({title: "批量创建学生成功", type: 'success', timer: 2000});
                                $('#createStudentBatchDialog').modal('hide');
                            }
                        }
                    }

                    var newStudent = newStudents[studentIndex];
                    //for (var sIndex = 0; sIndex < $scope.students.length; sIndex++) {
                    //    var student = $scope.students[sIndex];
                    //    if (student.username === newStudent.username) {
                    //        failList.push(newStudent);
                    //        return switcher();
                    //    }
                    //}

                    StudentDataProvider.createStudent(newStudent)
                        .success(function(student) {
                            $scope.students.push(student);
                            switcher();
                        }).error(function(err) {
                            console.error(err);
                            failList.push(newStudent);
                            switcher();

                        });
                }
                MultipleCreate(0);
            };

            $scope.selectStudent = function () {
                $location.path('/students/' + $scope.gridOptions.selectedItems[0]._id);
            };
        }]);
