angular.module('schoolManage')
    .controller('studentsController', ['students', 'StudentDataProvider', '$scope', 'count',function (students, StudentDataProvider, $scope, count) {
        $scope.students = students;
        $scope.studentsGrid = [];

        $scope.filterOptions = {
            filterText: "",
            useExternalFilter: true
        };
        $scope.totalServerItems = 0;
        $scope.pagingOptions = {
            pageSizes: [60],
            pageSize: 60,
            currentPage: 1
        };
        $scope.setPagingData = function (data, page, pageSize) {
            var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
            $scope.studentsGridData = pagedData;
            $scope.totalServerItems = data.length;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };
        $scope.getPagedDataAsync = function (pageSize, page, searchText) {
            var data;
            if (searchText) {
                var ft = searchText.toLowerCase();
                data = $scope.studentsGrid.filter(function (item) {
                    return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                });
                $scope.setPagingData(data, page, pageSize);
            } else {
                $scope.setPagingData($scope.studentsGrid, page, pageSize);
            }
        };

        $scope.$watch('pagingOptions', function (newVal, oldVal) {
            if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
            }
        }, true);
        $scope.$watch('filterOptions', function (newVal, oldVal) {
            if (newVal !== oldVal) {
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
            }
        }, true);

        $scope.sortInfo = {fields: ['registDateLocal'], directions: ['desc']};
        // sort over all data
        function sortData(field, direction) {
            if (!$scope.studentsGrid) return;
            $scope.studentsGrid.sort(function (a, b) {
                if (direction == "asc") {
                    return String(a[field]).localeCompare(String(b[field]));
                } else if (direction == "desc") {
                    return !String(a[field]).localeCompare(String(b[field]));
                }
            })
        }

        // sort over all data, not only the data on current page
        $scope.$watch('sortInfo', function (newVal, oldVal) {
            sortData(newVal.fields[0], newVal.directions[0]);
            $scope.pagingOptions.currentPage = 1;
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage)
        }, true);

        $scope.gridOptions =
        {
            data: 'studentsGridData',
//            showFilter: true,
            multiSelect: false,
            columnDefs: [
                {field: '_id', visible: false},
                {field: 'name', displayName: '姓名'},
                {field: 'username', displayName: '用户名'},
                {field: 'gender', displayName: '性别', width: 60},
                {field: 'school', displayName: '学校'},
                {field: 'grade', displayName: '年级', width: 50},
                {field: 'q', displayName: '渠道号'},
                {field: 'registDateLocal', displayName: '注册时间', width: 170},
                {field: 'loginDateLocal', displayName: '上次使用时间', width: 170}
            ],
            rowTemplate: '' +
            '<div ' +
            '   ng-dblclick="onDblClickRow(row)" ' +
            '   ng-style="{ \'cursor\': row.cursor }" ' +
            '   ng-repeat="col in renderedColumns" ' +
            '   ng-class="col.colIndex()" ' +
            '   class="ngCell {{col.cellClass}}">' +
            '   <div ' +
            '       class="ngVerticalBar" ' +
            '       ng-style="{height: rowHeight}" ' +
            '       ng-class="{ ngVerticalBarVisible: !$last }">&nbsp;</div>' +
            '   <div ng-cell></div>' +
            '</div>',
            enablePaging: true,
            showFooter: true,
            totalServerItems: 'totalServerItems',
            pagingOptions: $scope.pagingOptions,
            filterOptions: $scope.filterOptions,
            sortInfo: $scope.sortInfo,
            useExternalSorting: true
        };

        $scope.$watch('students', function (newStudents) {
            if (newStudents) {
                $scope.studentsGrid = [];
                //Add local time to every student.
                for (var i = 0; i < newStudents.length; i++) {
                    var student = newStudents[i];
                    student.registDateLocal = moment(new Date(student.registDate)).format('YYYY-MM-DD HH:mm:ss');
                    student.loginDateLocal = moment(new Date(student.loginDate)).format('YYYY-MM-DD HH:mm:ss');

                    $scope.studentsGrid.push(
                        {
                            "_id": student._id,
                            "name": student.name,
                            "username": student.username,
                            "gender": student.gender,
                            "school": student.school,
                            "grade": student.grade,
                            "q": student.q,
                            "registDateLocal": student.registDateLocal,
                            "loginDateLocal": student.loginDateLocal
                        }
                    );
                }
                $scope.students = newStudents;
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
            }
        }, true);

        $scope.onDblClickRow = function (rowItem) {
            var thisUser = rowItem.entity;
            window.location = '#/student/' + thisUser._id;
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
            if ($scope.newStudent.remark === undefined) {
                $scope.newStudent.remark = '';
            }
            StudentDataProvider.createStudent({
                "name": $scope.newStudent.name,
                "username": $scope.newStudent.username,
                "remark": $scope.newStudent.remark,
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


    }]);
