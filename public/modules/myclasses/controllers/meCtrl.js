angular.module('myClasses')
    .controller('meCtrl',
    [
        '$scope',
        'UserDataProvider',
        function
            ($scope, UserDataProvider) {

            UserDataProvider.getMe(function (me) {
                $scope.me = me;
            });
        }]);
