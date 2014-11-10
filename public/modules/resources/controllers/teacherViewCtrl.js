angular.module('resources')
    .controller('teacherViewController',
    ['TeacherDataProvider', '$scope', 'AuthService', 'RoomDataProvider', '$location', '$stateParams',
        function (TeacherDataProvider, $scope, AuthService, RoomDataProvider, $location, $stateParams) {

            $scope.rooms = [];

            TeacherDataProvider.getTeacher($stateParams.teacherId, function(teacher) {
                $scope.teacher = teacher;


            });

            TeacherDataProvider.getTeacherRooms($stateParams.teacherId, function(rooms){
                _.each(rooms, function(room) {
                    $scope.rooms.push(room.name)
                })
            })
        }
    ]
);