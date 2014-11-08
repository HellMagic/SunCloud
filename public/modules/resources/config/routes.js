//'use strict';
//
//
//// Setting up route
//angular.module('resources').config(['$stateProvider',
//    function($stateProvider) {
//        var __templates = '/modules/resources/views/';
//
//        $stateProvider.
//            state('schoolNav', {
//                url: '/school',
//                controller: 'schoolNavController',
//                templateUrl:  __templates + 'schoolNav.html'
//            }).
//            state('schoolInfo',{
//                //url: ,
//                parent: 'schoolNav',
//                controller: 'schoolController',
//                templateUrl: __templates + 'school.html',
//                resolve: {
//                    school: ['SchoolDataProvider','AuthService',
//                        function(SchoolDataProvider, AuthService) {
//                            return SchoolDataProvider.getSchool(AuthService.me.school);
//                        }
//                    ]
//                }
//            }).
//            state('students',{
//                //url: '/:classId',
//                parent: 'schoolNav',
//                controller: 'studentsController',
//                templateUrl: __templates + 'students.html',
//                resolve: {
//                    students: ['StudentDataProvider','AuthService',
//                        function(StudentDataProvider, AuthService) {
//                            return StudentDataProvider.getStudentsBySchool(AuthService.me.school);
//                        }
//                    ]
//
//                }
//            }).
//            state('teachers',{
//                //url: '/tablets/:tabletId',
//                parent: 'schoolNav',
//                controller: 'teachersController',
//                templateUrl: __templates + 'teachers.html',
//                resolve: {
//                    teachers: ['TeacherDataProvider','AuthService',
//                        function(TeacherDataProvider, AuthService) {
//                            return TeacherDataProvider.getTeachersBySchool(AuthService.me.school);
//                        }
//                    ]
//
//                }
//            }).
//            state('classes',{
//                //url: '',
//                parent: 'schoolNav',
//                controller: 'classesController',
//                templateUrl: __templates + 'classes.html',
//                resolve: {
//                    rooms: ['RoomDataProvider','AuthService',
//                        function(RoomDataProvider, AuthService) {
//                            return RoomDataProvider.getRoomsBySchool(AuthService.me.school);
//                        }
//                    ]
//
//                }
//            }).
//            state('tablets',{
//                //url: '/students/:studentId',
//                parent: 'schoolNav',
//                controller: 'tabletsController',
//                templateUrl: __templates + 'tablets.html',
//                resolve: {
//                    tablets: ['TabletDataProvider','AuthService',
//                        function(TabletDataProvider, AuthService) {
//                            return TabletDataProvider.getTabletsBySchool(AuthService.me.school);
//                        }
//                    ]
//
//                }
//            }).
//            state('apps',{
//                //url: '',
//                parent: 'schoolNav',
//                controller: 'appsController',
//                templateUrl: __templates + 'apps.html'
//            }).
//            state('template',{
//                //url: '',
//                parent: 'schoolNav',
//                controller: 'templateController',
//                templateUrl: __templates + 'template.html'
//            }).
//            state('setting', {
//                //url: '',
//                parent: 'schoolNav',
//                controller: 'settingController',
//                templateUrl: __templates + 'setting.html'
//            })
//        ;
//    }
//]);
//
