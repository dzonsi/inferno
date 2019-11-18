angular.
	module('tableDetail').
	component('tableFree', {
		templateUrl: 'table-detail/table-free/table-free.template.html',
		controller: TableFreeController,
		bindings: {
			table: '<',
    	changeStatus: '<'
  	}
	});