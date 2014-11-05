'use strict';
// Setting up route
angular.module('myClasses').config(['$stateProvider',
    function($stateProvider) {
        var __templates = '/modules/myclasses/views/';

        $stateProvider.
            state('ClassesView', {
                url: '/myclasses',
                controller: 'myClassesController',
                templateUrl: __templates + 'index.html'
            }).
            state('classView',{
                url: '/:classId',
                parent: 'ClassesView',
                controller: 'classController',
                templateUrl: __templates + 'class.html'

            }).
            state('tabletView',{
                url: '/tablets/:tabletId',
                templateUrl:  __templates + 'tablet.html'
            }).
            state('studentView',{
                url: '/students/:studentId',
                templateUrl: __templates + 'student.html'
            })
        ;
    }
]);
