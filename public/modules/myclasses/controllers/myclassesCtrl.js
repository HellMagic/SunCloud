'use strict';

angular.module('myClasses').controller('tempCtrl', ['$scope', '$stateParams', '$location', 'Authentication',
    function($scope, $stateParams, $location, Authentication) {
        $scope.authentication = Authentication;
        $scope.students = [
            {tablet:'438945',name:'user1'},
            {tablet:'312433',name:'user2'}
        ];

        $scope.gridOptions =
        {
            data: 'students',
            showFilter: true,
            multiSelect: false,
            columnDefs: [
                {field: 'name', displayName: '学生', cellTemplate:'<div class="ngCellText" ng-class="col.colIndex()"><a href="/#/students/{{row.entity._id}}">{{row.getProperty(col.field)}}</a></div>'},
                {field: 'birthday', displayName: '生日'},
                {field: 'tablet', displayName: '正在使用的晓书',cellTemplate:'<div class="ngCellText" ng-class="col.colIndex()"><a href="/#/tablets/{{row.entity.tablet}}">{{row.getProperty(col.field)}}</a></div>'},
                {field: 'lastUpdate', displayName: '上次使用时间'}
            ]
            //columnDefs: [
            //    {field: '_id', visible: false},
            //    {field: 'name', displayName: '姓名'},
            //    {field: 'username', displayName: '用户名'},
            //    {field: 'gender', displayName: '性别', width: 60},
            //    {field: 'school', displayName: '学校'},
            //    {field: 'q', displayName: '渠道号'},
            //    {field: 'registDateLocal', displayName: '注册时间', width: 170},
            //    {field: 'loginDateLocal', displayName: '上次使用时间', width: 170}
            //],
            //rowTemplate: '' +
            //'<div ' +
            //'   ng-dblclick="onDblClickRow(row)" ' +
            //'   ng-style="{ \'cursor\': row.cursor }" ' +
            //'   ng-repeat="col in renderedColumns" ' +
            //'   ng-class="col.colIndex()" ' +
            //'   class="ngCell {{col.cellClass}}">' +
            //'   <div ' +
            //'       class="ngVerticalBar" ' +
            //'       ng-style="{height: rowHeight}" ' +
            //'       ng-class="{ ngVerticalBarVisible: !$last }">&nbsp;</div>' +
            //'   <div ng-cell></div>' +
            //'</div>',
            //enablePaging: true,
            //showFooter: true,
            //totalServerItems: 'totalServerItems',
            //pagingOptions: $scope.pagingOptions,
            //filterOptions: $scope.filterOptions,
            //sortInfo: $scope.sortInfo,
            //useExternalSorting: true
        };


    }
]);
