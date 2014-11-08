'use strict';

angular.module('schools').config(['$stateProvider',
    function($stateProvider) {
        var __templates = '/modules/schools/views/';

        $stateProvider.
            state('schoolsNav', {
                url: '/schools',
                controller: 'schoolsNavController',
                templateUrl:  __templates + 'schoolsNav.html'
            }).
            state('schools',{
                //url: ,
                parent: 'schoolsNav',
                controller: 'schoolsController',
                templateUrl: __templates + 'schools.html',
                resolve: {
                    schools: ['RootDataProvider',
                        function(RootDataProvider) {
                            return RootDataProvider.getAllSchools();
                        }
                    ]
                }
            }).
            state('studentsAll',{
                //url: '/:classId',
                parent: 'schoolsNav',
                controller: 'studentsRootController',
                templateUrl: __templates + 'students.html',
                resolve: {
                    students: ['RootDataProvider',
                        function(RootDataProvider) {
                            return RootDataProvider.getAllStudents();
                        }
                    ]
                }
            }).
            state('teachersAll',{
                //url: '/tablets/:tabletId',
                parent: 'schoolsNav',
                controller: 'teachersRootController',
                templateUrl: __templates + 'teachers.html',
                resolve: {
                    teachers: ['RootDataProvider',
                        function(RootDataProvider) {
                            return RootDataProvider.getAllTeachers();
                        }
                    ]
                }
            }).
            state('classesAll',{
                //url: '',
                parent: 'schoolsNav',
                controller: 'classesRootController',
                templateUrl: __templates + 'classes.html',
                resolve: {
                    rooms: ['RootDataProvider',
                        function(RootDataProvider) {
                            return RootDataProvider.getAllRooms();
                        }
                    ]
                }
            }).
            state('tabletsAll',{
                //url: '/students/:studentId',
                parent: 'schoolsNav',
                controller: 'tabletsRootController',
                templateUrl: __templates + 'tablets.html',
                resolve: {
                    tablets: ['RootDataProvider',
                        function(RootDataProvider) {
                            return RootDataProvider.getAllTablets();
                        }
                    ]
                }

            }).
            state('appsAll',{
                //url: '',
                parent: 'schoolsNav',
                controller: 'appsRootController',
                templateUrl: __templates + 'apps.html'
            }).
            state('templateAll',{
                //url: '',
                parent: 'schoolsNav',
                controller: 'templateRootController',
                templateUrl: __templates + 'template.html'
            }).
            state('settingAll', {
                //url: '',
                parent: 'schoolsNav',
                controller: 'settingRootController',
                templateUrl: __templates + 'setting.html'
            })
        ;
    }
]);

