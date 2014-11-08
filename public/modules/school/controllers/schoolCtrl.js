angular.module('schoolManage')
    .controller('schoolController',
    [
        'SchoolDataProvider',
        'TeacherDataProvider',
        'RoomDataProvider',
        'StudentDataProvider',
        'TabletDataProvider',
        'school',
        '$scope',
        'AuthService',
        function
            (SchoolDataProvider, TeacherDataProvider,RoomDataProvider,StudentDataProvider, TabletDataProvider,school,$scope, AuthService) {
            $scope.isEditingSchoolName = false;
            $scope.school = school;


            RoomDataProvider.getCountsOfRoomsBySchool(school._id, function(counts){
                    $scope.roomCount = counts.count;
                });
                StudentDataProvider.getCountsOfStudentsBySchool(school._id , function(counts){
                    $scope.studentCount = counts.count;
                });
                TeacherDataProvider.getCountsOfTeachersBySchool(school._id, function(counts){
                    $scope.teacherCount = counts.count;
                });
                TabletDataProvider.getXiaoshuBySchool(school._id,  function(counts){
                    $scope.xiaoshuLogCount = counts.count;
                });

            /**
             * Register watcher.
             */
            $scope.$watch('school', function (newSchool) {
                if (newSchool) {
                    $scope.school = school;
                    $scope.schoolNewName = school.name;
                }
            }, true);


            $scope.startEditSchool = function() {
                $scope.isEditingSchoolName = true;

            };
            $scope.cancelEdit = function() {
              $scope.isEditingSchoolName = false;
            };


            $scope.editSchool = function () {
                if (($scope.schoolNewName == "") || ($scope.schoolNewName === undefined)) {
                    alert('请填写学校新名称');
                    return;
                }
                school.name = $scope.schoolNewName;
                console.log($scope.schoolNewName);
                SchoolDataProvider.editSchool(school, function (newSchool) {
                    $scope.school = newSchool;
                });
                $scope.isEditingSchoolName = false;
            };


        }]);
