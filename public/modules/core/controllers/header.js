'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus', '$state', '$rootScope',
	function($scope, Authentication, Menus, $state, $rootScope) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');
		$scope.$state = $state;

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};


		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});


	}
]);
