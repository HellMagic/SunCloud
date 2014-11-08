angular.module('manage')
    .controller('manageNavController', [
        '$scope',
        '$route',
        '$location',
        '$routeParams',
        '$state',
        function($scope, $route, $location, $routeParams, $state) {
            $scope.items = [
                {name: '我的设备', state: 'myDevice'},
                {name: '应用程序', state: 'appsManage'},
                {name: '锁屏管理', state: 'lockView'},
                {name:'设置', state: 'mySetting'}];

            $state.transitionTo('myDevice');

            $scope.selectedState = $scope.items[0].state;
            $scope.goto = function(state) {
                $scope.selectedState = state;
                $state.transitionTo(state);
            };
        }
    ]);
