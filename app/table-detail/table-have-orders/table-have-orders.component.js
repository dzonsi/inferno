angular.
	module('tableDetail').
	component('tableHaveOrders', {
		templateUrl: 'table-detail/table-have-orders/table-have-orders.template.html',
		controller: TableHaveOrdersController,
		bindings: {
			table: '<'
  	}
	});