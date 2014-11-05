'use strict';


// Setting up route
angular.module('schoolManage').config(['$stateProvider',
    function($stateProvider) {
        var __templates = '/modules/school/views/';

        $stateProvider.
            state('schoolNav', {
                url: '/school',
                controller: 'schoolNavController',
                templateUrl:  __templates + 'schoolNav.html'
            }).
            state('schoolInfo',{
               //url: ,
                parent: 'schoolNav',
                controller: 'schoolController',
                templateUrl: __templates + 'school.html'
            }).
            state('students',{
                //url: '/:classId',
                parent: 'schoolNav',
                controller: 'studentsController',
                templateUrl: __templates + 'students.html',
                resolve: {
                    students: ['StudentDataProvider',
                        function(StudentDataProvider) {
                            return StudentDataProvider.getAllStudents();
                        }
                    ],
                    count: ['StudentDataProvider',
                        function(StudentDataProvider) {
                            return StudentDataProvider.getAllStudentsCount();
                        }
                    ]
                }
            }).
            state('teachers',{
                //url: '/tablets/:tabletId',
                parent: 'schoolNav',
                controller: 'teachersController',
                templateUrl: __templates + 'teachers.html'
            }).
            state('classes',{
                //url: '',
                parent: 'schoolNav',
                controller: 'classesController',
                templateUrl: __templates + 'classes.html'
            }).
            state('tablets',{
                //url: '/students/:studentId',
                parent: 'schoolNav',
                controller: 'tabletsController',
                templateUrl: __templates + 'tablets.html'
            }).
            state('apps',{
                //url: '',
                parent: 'schoolNav',
                controller: 'appsController',
                templateUrl: __templates + 'apps.html'
            }).
            state('template',{
                //url: '',
                parent: 'schoolNav',
                controller: 'templateController',
                templateUrl: __templates + 'template.html'
            }).
            state('setting', {
                //url: '',
                parent: 'schoolNav',
                controller: 'settingController',
                templateUrl: __templates + 'setting.html'
            })
        ;
    }
]);

