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
                url: '^/schoollist',
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
                url: '^/students',
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
                url: '^/teachers',
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
                url: '^/classes',
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
                url: '^/tablets',
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
                url: '^/apps',
                parent: 'schoolsNav',
                controller: 'appsRootController',
                templateUrl: __templates + 'apps.html',
                resolve: {
                    apps: ['AppDataProvider',
                        function(AppDataProvider) {
                            return AppDataProvider.getAllApps();
                        }
                    ]
                }
            }).
            state('templateAll',{
                url: '^/template',
                parent: 'schoolsNav',
                controller: 'templateRootController',
                templateUrl: __templates + 'template.html'
            }).
            state('settingAll', {
                url: '^/setting',
                parent: 'schoolsNav',
                controller: 'settingRootController',
                templateUrl: __templates + 'setting.html'
            })
        ;
    }
]);

