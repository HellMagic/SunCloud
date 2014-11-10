angular.module('resources')
    .controller('studentViewController',
    ['StudentDataProvider', '$scope', 'AuthService', 'UserDataProvider', '$location', '$stateParams',
        function (StudentDataProvider, $scope, AuthService, UserDataProvider, $location, $stateParams) {

            $scope.rooms = [];

            StudentDataProvider.getStudent($stateParams.studentId, function(student) {
                $scope.student = student;


            });

            StudentDataProvider.getStudentRoom($stateParams.studentId, function(rooms){
                _.each(rooms, function(room) {
                    $scope.rooms.push(room.name)
                })
            });

            UserDataProvider.getTablet($stateParams.studentId,function(record){
                if(record.length){
                    $scope.tablet = record[0].tabletId.machine_id;
                }else{
                    $scope.tablet = "暂无"
                }


            });







        }
    ]
);