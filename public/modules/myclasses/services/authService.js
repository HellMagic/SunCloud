'use strict';

// Authentication service for user variables
angular.module('myClasses').factory('AuthService', ['$http', function($http){

    var me = {};
    $.ajax({
        url: "/me",
        async: false,
        success: function (json) {
            me = json;
        },
        dataType: "json"
    });
    //console.log(me);

    return {
        me: me
    }

}]);