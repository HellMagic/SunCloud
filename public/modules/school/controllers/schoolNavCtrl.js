angular.module('schoolManage')
    .controller('schoolNavController', [
        '$scope',
        '$route',
        '$location',
        '$routeParams',
        '$state',
        function($scope, $route, $location, $routeParams, $state) {
            $scope.items = [
                {name: '学校', state: 'schoolInfo'},
                {name:'学生', state: 'students'},
                {name:'老师', state: 'teachers'},
                {name:'班级', state: 'classes'},
                {name:'机器', state: 'tablets'},
                {name:'应用程序', state: 'apps'},
                {name:'模板', state: 'template'},
                {name:'设置', state: 'setting'}];

            $state.transitionTo('schoolInfo');

            $scope.selectedState = $scope.items[0].state;
            $scope.goto = function(state) {
                $scope.selectedState = state;
                $state.transitionTo(state);
            };
        }
    ]);
