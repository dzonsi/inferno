'use strict';

angular.module('app').
	config(['$locationProvider', '$routeProvider',
		function($locationProvider, $routeProvider) {
	  $locationProvider.hashPrefix('!');

	  $routeProvider.
	  	when('/home', {
	  		template: '<tables-list></tables-list>'
	  	}).
	    when('/tables', {
	      template: '<tables-edit></tables-edit>'
	    }).
	    when('/drinks', {
	      template: '<drinks-edit></drinks-edit>'
	    }).
	  	when('/tables/:tableId', {
	  		template: '<table-detail></table-detail'
	  	}).
	  	otherwise('/home');
		}
	]);