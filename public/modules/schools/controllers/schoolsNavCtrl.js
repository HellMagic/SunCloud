angular.module('schools')
    .controller('schoolsNavController', [
        '$scope',
        '$route',
        '$location',
        '$routeParams',
        '$state',
        function($scope, $route, $location, $routeParams, $state) {
            $scope.items = [
                {name: '学校', state: 'schools'},
                {name:'学生', state: 'studentsAll'},
                {name:'老师', state: 'teachersAll'},
                {name:'班级', state: 'classesAll'},
                {name:'机器', state: 'tabletsAll'},
                {name:'应用程序', state: 'appsAll'},
                {name:'模板', state: 'templateAll'},
                {name:'设置', state: 'settingAll'}];

            $state.transitionTo('schools');

            $scope.selectedState = $scope.items[0].state;
            $scope.goto = function(state) {
                $scope.selectedState = state;
                $state.transitionTo(state);
            };
        }
    ]);
