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
                templateUrl: __templates + 'app.html',
                resolve: {
                    theApp: ['AppDataProvider', '$stateParams',
                        function(AppDataProvider, $stateParams) {
                            return AppDataProvider.getApp($stateParams.appId)
                        }
                    ]
                }
            }).
            state('schoolView',{
                url: '/schools/:schoolId',
                //controller: 'schoolViewController',
                templateUrl: __templates + 'school.html'
            })
        ;
    }
]).run(function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.$on("$stateChangeSuccess",  function(event, toState, toParams, fromState, fromParams) {
        // to be used for back button //won't work when page is reloaded.
        $rootScope.previousState_name = fromState.name;
        $rootScope.previousState_params = fromParams;
    });
    //back button function called from back button's ng-click="back()"
    $rootScope.back = function() {
        $state.go($rootScope.previousState_name,$rootScope.previousState_params);
    };
});

