'use strict';
// Setting up route
angular.module('myRooms').config(['$stateProvider',
    function($stateProvider) {
        var __templates = '/modules/myRooms/views/';

        $stateProvider.
            state('myRoomsView', {
                url: '/myRooms',
                controller: 'myRoomsController',
                templateUrl: __templates + 'rooms.html',
                resolve: {
                    myRooms: ['RoomDataProvider', 'AuthService',
                        function(RoomDataProvider, AuthService) {
                            return RoomDataProvider.getRoomsByTeacher(AuthService.me._id)
                        }
                    ]
                }
            }).
            state('myRoomView',{
                url: '/:roomId',
                parent: 'roomsView',
                controller: 'myRoomController',
                templateUrl: __templates + 'room.html',
                resolve: {
                    theRoom: ['RoomDataProvider','$stateParams',
                        function(RoomDataProvider, $stateParams) {
                            return RoomDataProvider.getRoom($stateParams.roomId)
                        }
                    ]
                }
            })
        ;
    }
]);
