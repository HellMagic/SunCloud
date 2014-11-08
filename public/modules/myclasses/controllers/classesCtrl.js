angular.module('myClasses')
    .controller('myClassesController', [
        '$scope',
        'ClassDataProvider',
        'DataAgent',
        'UserDataProvider',
        '$route',
        '$location',
        'AuthService',
        function($scope, ClassDataProvider, DataAgent, UserDataProvider, $route, $location, AuthService) {
            $scope.temp = {};

            var me = AuthService.me;
            //console.log(me);

            ClassDataProvider.getClassesByTeacher(me._id, function(classes) {
                $scope.classes = classes;
            });

            ClassDataProvider.getClassesBySchool(me.school, function(classes){
                $scope.classList = classes;
                $scope.selectedClass = $scope.classList[0];
            });

            ClassDataProvider.getAllSubjects(function(subjects){
                $scope.subjectList = subjects;
                $scope.selectedSubject = $scope.subjectList[0];
            });

            $scope.$watch('classes', function(newClasses) {
                if (newClasses) {
                    $scope.classes = newClasses;
                    for (var classIndex = 0; classIndex < $scope.classes.length; classIndex++) {
                        var theClass = $scope.classes[classIndex];
                        if (theClass.newStudents.length > 0) {
                            theClass.newStudentsStyle = 'navbar-unread';
                        } else {
                            theClass.newStudentsStyle = '';
                        }
                        if (theClass.students === undefined) {
                            theClass.students = [];
                        }
                    }
                }
            }, true);

            //
            $scope.selectOneClass = function(selectedClass) {
                //_.each($scope.classes, function(eachItem) {
                //    eachItem.isActive = false;
                //});
                //selectedClass.isActive = true;
              $location.path('/myclasses/' + selectedClass._id);
            };


            $scope.createClassButton = function() {
                $('#showTip_classCreate').modal({show: true});
            };


            $scope.createClass = function() {
                $scope.temp.createClassTip = '';
                if (($scope.newClassName == "") || ($scope.newClassName === undefined)) {
                    $scope.temp.createClassTip = 'noName';
                    return;
                }
                if ($scope.newClassName.length > 15) {
                    $scope.temp.createClassTip = 'formatWrong';
                    return;
                }
                var classes = $scope.classes;
                for (var classIndex = 0; classIndex < classes.length; classIndex++) {
                    if (classes[classIndex].name == $scope.newClassName.trim()) {
                        $scope.temp.createClassTip = 'alreadyHave';
                        return;
                    }
                }
                $('#showTip_classCreate').modal('hide');
                ClassDataProvider.createClass($scope.newClassName.trim(), me, function(newClass) {
                    var classes = $scope.classes;
                    var found = false;
                    for (var classIndex = 0; classIndex < classes.length; classIndex++) {
                        if (classes[classIndex]._id == newClass._id) {
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        $scope.classes.push(newClass);
                    }
                    $scope.newClassName = '';
                    $scope.temp.newClassCode = newClass.classCode;
                    $scope.temp.create_class_success = true;
                    //$('#showTip_classCreated').modal('show');
                });
            };

            $scope.claimClassButton = function() {
                $('#showTip_classClaim').modal({show: true});
            };

            $scope.claimClass = function() {
                $('#showTip_classClaim').modal('hide');
                ClassDataProvider.claimClass($scope.selectedClass,$scope.selectedSubject, me._id,function(newClass){

                })
            };
        }
    ]);
