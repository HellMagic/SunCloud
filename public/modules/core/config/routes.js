'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		//$urlRouterProvider.otherwise('/');
		//$urlRouterProvider.when()

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
            templateUrl: 'modules/core/views/home.html'
			//templateUrl: 'modules/users/views/authentication/signin.html'
		});
	}
]).run(['$rootScope','$location','Authentication','$state',function($rootScope, $location, $state,Anthentication){

	if(!Anthentication.user){
		$location.path('signin');
		//$state.transitionTo('signin');
	}
}]);

