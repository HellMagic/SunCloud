angular.module('schoolManage')
    .controller('tabletsController',
    ['tablets', 'TabletDataProvider', '$scope', '$location',
        function (tablets, TabletDataProvider, $scope, $location) {
            $scope.tablets = tablets;
            $scope.selectedTablet = [];

            _.each($scope.tablets, function(tabletItem) {

                TabletDataProvider.getTabletUser(tabletItem._id,function(record){
                    if(record.length){
                        tabletItem.user = record[0].userId;
                    }else{

                    }
                })
            });


            $scope.gridOptions =
            {
                data: 'tablets',
                multiSelect: false,
                columnDefs: [
                    {field: '_id', visible: false},
                    {field: 'machine_id', displayName: '晓书编号'},
                    {field: 'OS_type', displayName: '操作系统'},
                    {field: 'OS_version', displayName: '操作系统版本'},
                    {field: 'lastUpdate', displayName: '上次更新'},
                    //{field: 'school.name', displayName: '所属学校'},
                    {field: 'user.name', displayName: '正在使用',
                        cellTemplate:'<div class="ngCellText" ng-class="col.colIndex()"><a href="/#/students/{{row.entity.user._id}}">{{row.getProperty(col.field)}}</a></div>'},
                    {field: 'user', displayName: '', cellTemplate:'<button type="button" align="center" class="btn btn-default btn-sm" ng-click="showLogoutDialog(row)" ng-show="row.entity.user"><span class="glyphicon glyphicon-log-out"></span> 登出</button>'}

                ],
                selectedItems: $scope.selectedTablet

            };

            $scope.showLogoutDialog = function(row) {
                $('#logoutDialog').modal('show');
                $scope.row = row;
            };

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





            $scope.selectTablet = function () {
                //console.log($scope.selectedItem);
                //$state.transitionTo(roomView(roomId: $scope.gridOptions.selectedItems[0]._id))
                $location.path('/tablets/' + $scope.gridOptions.selectedItems[0].machine_id);
            };



        }]);
