'use strict';

// Setting up route
angular.module('manage').config(['$stateProvider',
    function($stateProvider) {
        var __templates = '/modules/manage/views/';

        $stateProvider.
            state('deviceManage', {
                url: '/manage',
                templateUrl: __templates + 'manage.html'
            });
    }
]);
