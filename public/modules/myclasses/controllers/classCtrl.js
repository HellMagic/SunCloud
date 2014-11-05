'use strict';

angular.module('myClasses').controller('classController',
    ['$scope', '$stateParams', '$location', 'Authentication','ClassDataProvider', 'UserDataProvider','$http','DataAgent',
    function($scope, $stateParams, $location, Authentication, ClassDataProvider, UserDataProvider, $http,DataAgent) {
        $scope.authentication = Authentication;
        $scope.isEditClassName = false;

        ClassDataProvider.getClass($stateParams.classId,function(theClass){
            $scope.theClass = theClass;
            $scope.theClass.students = $scope.theClass.students.sort(function(a, b) {
                if (a.name && b.name) {
                    return a.name.localeCompare(b.name);
                }
                return a.username.localeCompare(b.username);
            });

            $scope.noTabletNum = 0;

            _.each($scope.theClass.students, function(studentItem) {

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
        });

        $scope.logout = function (row) {
            $http({
                method: 'GET',
                url: '/usertablet?userId=' + row.entity._id + '&tabletId=' + row.entity.tabletId
            }).success(function(record){
                console.log('logout success' + record);
                row.entity.tabletId = null;
                row.entity.tablet = null;
                row.entity.loginTime = null;
                $('#logoutDialog').modal('hide');
            }).error(function(err){
                console.error(err)
            })
        };

        $scope.showDisbandClassDialog = function() {
            $('#disbandClassDialog').modal('show');
        };

        $scope.showJoinStudentDialog = function() {
            $('#joinStudentDialog').modal('show');
        };

        $scope.showLogoutDialog = function(row) {
            $('#logoutDialog').modal('show');
            $scope.row = row;
        }


        $scope.disbandClass = function() {
            ClassDataProvider.disbandClass($scope.theClass._id, function(oldClass) {
                DataAgent.prepForBroadcast('disbandClass', oldClass);
                ClassDataProvider.jumpToFirst();
                $('#disbandClassDialog').modal('hide');
                $('.modal-backdrop').remove();
                $scope.reload();
            });
        };

        $scope.editClassName = function() {
            $scope.isEditClassName = true;
        };

        $scope.editClassNameOver = function() {
            var theEditClass = _.find($scope.classes, function(classItem) {
                return classItem.classCode == $scope.theClass.classCode;
            });
            if (theEditClass) {
                theEditClass.name = $scope.theClass.name;
            } else {
                console.log('Edit Class Find Error');
            }
            $scope.isEditClassName = false;
            ClassDataProvider.editClass({
                name: $scope.theClass.name
            }, $stateParams.classId,function(newClassMin) {
                //console.log('put修改服务端class name success，the new name='+newClassMin.name);
            });
        };




        $scope.gridOptions =
        {
            data: 'theClass.students',
            showFilter: false,
            multiSelect: false,
            columnDefs: [
                {field: 'username', displayName: '学生', cellTemplate:'<div class="ngCellText" ng-class="col.colIndex()"><a href="/#/students/{{row.entity._id}}">{{row.getProperty(col.field)}}</a></div>'},
                {field: 'birthday', displayName: '生日'},
                {field: 'tablet', displayName: '正在使用的晓书',cellTemplate:'<div class="ngCellText" ng-class="col.colIndex()"><a href="/#/tablets/{{row.entity.tablet}}">{{row.getProperty(col.field)}}</a></div>'},
                {field: 'loginTime', displayName: '上次登录时间'},
                {field: 'tablet', displayName: '', cellTemplate:'<button type="button" style="align-items: center" class="btn btn-default btn-sm" ng-click="showLogoutDialog(row)" ng-show="row.entity.tablet"><span class="glyphicon glyphicon-log-out"></span> 登出</button>'}

            ]
        };




    }
]);
