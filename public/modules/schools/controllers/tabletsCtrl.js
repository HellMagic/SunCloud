angular.module('schools')
    .controller('tabletsRootController',
    ['tablets', 'TabletDataProvider', '$scope', '$location',
        function (tablets, TabletDataProvider, $scope, $location) {
            $scope.tablets = tablets;
            $scope.filterOptions = {
                filterText: ''
            };
            $scope.selectedTablet = [];


            $scope.gridOptions =
            {
                data: 'tablets',
                multiSelect: false,
                rowTemplate: '<div  ng-mouseover="$parent.showedit=true" ng-mouseleave="$parent.showedit=false" ng-style="{\'cursor\': row.cursor, \'z-index\': col.zIndex() }" ' +
                'ng-repeat="col in renderedColumns" ng-class="col.colIndex()" ' +
                'class="ngCell {{col.cellClass}}" ng-cell></div>',
                columnDefs: [
                    {field: '_id', visible: false},
                    {field: 'machine_id', displayName: '晓书编号'},
                    {field: 'OS_type', displayName: '操作系统'},
                    {field: 'OS_version', displayName: '操作系统版本'},
                    {field: 'lastUpdate', displayName: '上次更新'}
                ],
                filterOptions: $scope.filterOptions,
                selectedItems: $scope.selectedTablet
            };

            $scope.selectTablet = function () {
                console.log($scope.gridOptions.selectedItems);
                $location.path('/tablets/' + $scope.gridOptions.selectedItems[0]._id);
            };


        }]);
