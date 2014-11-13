'use strict';

var HTTPInterceptor = function($q) {
    return {
        request: function(request) {
            return request;
        },
        requestError: function(request) {
            return $q.reject(request)
        },
        response: function(response) {
            return response;
        },
        responseError: function(response) {
            if(response.status === 401){
                $location.path('/signin');
            }
            console.log(response.status);
            return $q.reject(response);
        }
    }
};

angular.module('core').config(function($httpProvider) {
        $httpProvider.interceptors.push(HTTPInterceptor)
    }
);


