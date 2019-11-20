var TablesListController = function($scope, Drinks, Tables) {
	this.$onInit = function() {
		$scope.filter = {
			options: ['all', 'free', 'occupied'],
			show: 'all'
		}
		$scope.number = "number";
		$scope.drinks = Drinks.getDrinks();
		$scope.tables = Tables.getTables();
	}
	$scope.changeOrder = function() {
		$scope.number == 'number' ? $scope.number = '-number' : $scope.number = 'number'
	}
}
TablesListController.$inject = ['$scope', 'Drinks', 'Tables'];