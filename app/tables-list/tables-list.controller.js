var TablesListController = function($scope, $routeParams, Drinks, Tables) {
	$scope.filter = {
		options: ['all', 'free', 'occupied'],
		show: 'all'
	}
	$scope.number = "number";
	$scope.changeOrder = function() {
		$scope.number == 'number' ? $scope.number = '-number' : $scope.number = 'number'
	}

	$scope.drinks = Drinks.getDrinks();

	$scope.tables = Tables.getTables();

}
TablesListController.$inject = ['$scope', '$routeParams', 'Drinks', 'Tables'];