var TableDetailController = function($scope, $routeParams, Drinks, Tables) {

	$scope.tableNumber = $routeParams.tableId;

	$scope.allTables = Tables.getTables();

	$scope.table = Tables.getTable($scope.tableNumber);

	$scope.drinks = Drinks.getDrinks();

	$scope.orderDrink = {
		drink: $scope.drinks[0]
	}
	$scope.numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	$scope.orderNumber = {
		number: 1
	};
	$scope.addDrink = function(id, n, p) {
		console.log(n, p);
		Drinks.addDrink(id, n, p);
	}
	$scope.addTable = function(n, o, a) {
		Tables.addTable(n, o, a);
	}
	$scope.addOrderDrink = function() {
		//var newOrder = Object.assign({}, $scope.orderDrink.drink);
		var newOrder = angular.copy($scope.orderDrink.drink);
		newOrder.quantity = $scope.orderNumber.number;
		var number = $scope.tableNumber;
		// add order in service
		Tables.addTableOrder(number, newOrder);
		console.log('add', number, newOrder)
	}
	$scope.removeOrderDrink = function() {
		//var newOrder = Object.assign({}, $scope.orderDrink.drink);
		var newOrder = angular.copy($scope.orderDrink.drink);
		newOrder.quantity = $scope.orderNumber.number;
		var number = $scope.tableNumber;
		// remove order in service
		Tables.removeTableOrder(number, newOrder);
		console.log('remove', number, newOrder)
	}
	$scope.changeTableStatus = function(number) {
		console.log(number)
		Tables.changeStatus(number);
	}
}
TableDetailController.$inject = ['$scope', '$routeParams', 'Drinks', 'Tables'];