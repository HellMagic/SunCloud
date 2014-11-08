'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$rootScope',
	function($scope, Authentication, $rootScope) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		//var me = {};
		//$.ajax({
		//	url: "/me",
		//	async: false,
		//	success: function (json) {
		//		me = json;
		//	},
		//	dataType: "json"
		//});
        //
        //
		//$rootScope.me = me;
	}
]);