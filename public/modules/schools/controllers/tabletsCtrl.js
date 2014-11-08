angular.module('schools')
    .controller('tabletsRootController',
    ['tablets', 'TabletDataProvider', '$scope',
        function (tablets, TabletDataProvider, $scope) {
            $scope.tablets = tablets;

            $scope.gridOptions =
            {
                data: 'tablets',
                multiSelect: false,
                columnDefs: [
                    {field: '_id', visible: false},
                    {field: 'machine_id', displayName: '晓书编号'},
                    {field: 'OS_type', displayName: '操作系统'},
                    {field: 'OS_version', displayName: '操作系统版本'},
                    {field: 'lastUpdate', displayName: '上次更新'}
                ]
            };



            $scope.onDblClickRow = function (rowItem) {
                var thisUser = rowItem.entity;
                window.location = '#/student/' + thisUser._id;
            };




        }]);
