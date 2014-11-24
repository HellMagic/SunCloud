'use strict';

// Authentication service for user variables
angular.module('core').factory('AuthService', ['$http', function($http){

    var me = {};
    $.ajax({
        url: "/me",
        async: false,
        success: function (json) {
            me = json;
        },
        dataType: "json"
    });
    return {
        me: me
    }

}]);