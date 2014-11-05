angular.module('schools')
    .controller('schoolsController',
    [
        'schools',
        'SchoolDataProvider',
        'TeacherDataProvider',
        'RoomDataProvider',
        'StudentDataProvider',
        'TabletDataProvider',
        'RootDataProvider',
        '$scope',
        function
            (schools, SchoolDataProvider, TeacherDataProvider,RoomDataProvider,StudentDataProvider, TabletDataProvider,RootDataProvider,$scope) {

            $scope.schools = schools;

            TeacherDataProvider.getMe(function(user){
                $scope.me = user;
            });

            RootDataProvider.getAllSchoolsCount(function(counts){
                $scope.schoolCount = counts.count;
            });

            _.each($scope.schools, function(school) {
                RoomDataProvider.getCountsOfRoomsBySchool(school._id, function(counts){
                    school.roomCount = counts.count;
                });
                StudentDataProvider.getCountsOfStudentsBySchool(school._id, function(counts){
                    school.studentCount = counts.count;
                });
                TeacherDataProvider.getCountsOfTeachersBySchool(school._id, function(counts){
                    school.teacherCount = counts.count;
                });
                TabletDataProvider.getXiaoshuBySchool(school._id, function(counts){
                    school.xiaoshuLogCount = counts.count;
                })
            });

            $scope.schoolPage = function (index) {
                window.location = '#/schools/' + $scope.schools[index]._id
            };

            $scope.createNewSchool = function () {
                console.log($scope.newSchoolName);
                if (($scope.newSchoolName == "") || ($scope.newSchoolName === undefined)) {
                    alert('请填写学校名称');
                    return;
                }
                SchoolDataProvider.createSchool($scope.newSchoolName, function (school) {
                    $scope.schools.push(school);
                    $scope.newSchoolName = '';
                });
            };
        }]);
