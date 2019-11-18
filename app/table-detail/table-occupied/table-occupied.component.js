angular.
	module('tableDetail').
	component('tableOccupied', {
		templateUrl: 'table-detail/table-occupied/table-occupied.template.html',
		controller: TableOccupiedController,
		bindings: {
			table: '<',
			drinks: '<',
			numbers: '<',
			orderDrink: '=',
			orderNumber: '=',
    	changeStatus: '<',
    	addOrderDrink: '<',
    	removeOrderDrink: '<'
  	}
	});