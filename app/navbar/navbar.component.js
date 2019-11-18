angular.
	module('app').
	component('navigationBar', {
		templateUrl: 'navbar/navbar.template.html',
		controller: ['$scope', '$location', function($scope, $location) {
			$scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    	};
		}]
	});