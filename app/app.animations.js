angular.
	module('tablesList').
	animation('.table-list-item', function tableListItemAnimationFactory() {
		return {
    	enter: function(element, doneFn) {
    	  element.css({opacity: 0}).animate({opacity: 1}, 1000, doneFn);
    	  console.log('enter')
    	},

    	move: function(element, doneFn) {
    	  element.css({opacity: 0}).animate({opacity: 1}, 1000, doneFn);
    	  console.log('move')
    	},

    	leave: function(element, doneFn) {
    	  $(element).fadeOut(1000, doneFn);
    	  console.log('leave')
    	}
  	}
	});
