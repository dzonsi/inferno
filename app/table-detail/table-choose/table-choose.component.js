angular.
	module('tableDetail').
	component('tableChoose', {
		templateUrl: 'table-detail/table-choose/table-choose.template.html',
		controller: TableChooseController,
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