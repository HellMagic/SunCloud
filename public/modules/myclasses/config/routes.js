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
                url: '/:roomId',
                parent: 'ClassesView',
                controller: 'classController',
                templateUrl: __templates + 'class.html',
                resolve: {
                    theClass: ['ClassDataProvider','$stateParams', 'AuthService',
                        function(ClassDataProvider, $stateParams) {
                            return ClassDataProvider.getClass($stateParams.roomId);
                        }
                    ]
                }

            })//.
            //state('tabletView1',{
            //    url: '/tablets/:tabletId',
            //    templateUrl:  __templates + 'tablet.html'
            //}).
            //state('studentView1',{
            //    url: '/students/:studentId',
            //    templateUrl: __templates + 'student.html'
            //})
        ;
    }
]);
