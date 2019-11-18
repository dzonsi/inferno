angular.module('drinksEdit', [
	'ngRoute',
	'core'
])
	.directive('addOnEnter', function () {
	  return function (scope, element, attrs) {
	    element.on("keypress", function (event) {
	        if(event.which === 13) {
	           event.preventDefault();
	           $('#add-new-drink').click();
	           $(this).blur();
	           // if scope is used
	           // method is called
	           // but it's very slow
	           // why ???
	        }
	    });
	  };
	});