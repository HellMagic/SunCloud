'use strict';


// Setting up route
angular.module('resources').config(['$stateProvider',
    function($stateProvider) {
        var __templates = '/modules/resources/views/';

        $stateProvider.
            state('roomView', {
                url: '/rooms/:roomId',
                controller: 'roomViewController',
                templateUrl:  __templates + 'room.html',
                resolve: {
                    room: ['RoomDataProvider','$stateParams', 'AuthService',
                        function(RoomDataProvider, $stateParams) {
                            return RoomDataProvider.getRoomFull($stateParams.roomId);
                        }
                    ],
                    teachers: ['TeacherDataProvider', 'AuthService',
                        function(TeacherDataProvider, AuthService) {
                            return TeacherDataProvider.getTeachersBySchool(AuthService.me.school);
                        }
                    ],
                    students: ['StudentDataProvider', 'AuthService',
                        function(StudentDataProvider, AuthService) {
                            return StudentDataProvider.getStudentsBySchool(AuthService.me.school);
                        }
                    ]
                }
            }).
            state('studentView',{
                url: '/students/:studentId',
                controller: 'studentViewController',
                templateUrl: __templates + 'student.html'
            }).
            state('teacherView',{
                url: '/teachers/:teacherId',
                controller: 'teacherViewController',
                templateUrl: __templates + 'teacher.html'
            }).
            state('tabletView',{
                url: '/tablets/:tabletId',
                controller: 'tabletViewController',
                templateUrl: __templates + 'tablet.html'
            }).
            state('appView',{
                url: '/apps/:appId',
                controller: 'appViewController',
                templateUrl: __templates + 'app.html'
            }).
            state('schoolView',{
                url: '/schools/:schoolId',
                controller: 'schoolViewController',
                templateUrl: __templates + 'school.html'
            })
        ;
    }
]);

