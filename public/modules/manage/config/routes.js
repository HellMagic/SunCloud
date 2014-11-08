'use strict';

// Setting up route
angular.module('manage').config(['$stateProvider',
    function($stateProvider) {
        var __templates = '/modules/manage/views/';

        $stateProvider.
            state('deviceManage', {
                url: '/manage',
                controller: 'manageNavController',
                templateUrl: __templates + 'manageNav.html'
            }).
            state('myDevice', {
                //url: '/manage',
                parent: 'deviceManage',
                controller: 'myDeviceController',
                templateUrl: __templates + 'myDevice.html'
            }).
            state('appsManage', {
                //url: '/manage',
                parent: 'deviceManage',
                controller: 'appsManageController',
                templateUrl: __templates + 'appsManage.html'
            }).
            state('lockView', {
                //url: '/manage',
                parent: 'deviceManage',
                controller: 'lockViewController',
                templateUrl: __templates + 'lockView.html'
            }).
            state('mySetting', {
                //url: '/manage',
                parent: 'deviceManage',
                controller: 'mySettingController',
                templateUrl: __templates + 'mySetting.html'
            });
    }
]);
