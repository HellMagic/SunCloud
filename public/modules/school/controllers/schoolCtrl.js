angular.module('schoolManage')
    .controller('schoolController',
    [
        'SchoolDataProvider',
        'TeacherDataProvider',
        'RoomDataProvider',
        'StudentDataProvider',
        'TabletDataProvider',
        '$scope',
        function
            (SchoolDataProvider, TeacherDataProvider,RoomDataProvider,StudentDataProvider, TabletDataProvider,$scope) {

            TeacherDataProvider.getMe(function(user){
                $scope.me = user;

                RoomDataProvider.getCountsOfRoomsBySchool($scope.me.school, function(counts){
                    $scope.roomCount = counts.count;
                });
                StudentDataProvider.getCountsOfStudentsBySchool($scope.me.school , function(counts){
                    $scope.studentCount = counts.count;
                });
                TeacherDataProvider.getCountsOfTeachersBySchool($scope.me.school, function(counts){
                    $scope.teacherCount = counts.count;
                });
                TabletDataProvider.getXiaoshuBySchool($scope.me.school,  function(counts){
                    $scope.xiaoshuLogCount = counts.count;
                });
            });


        }]);
