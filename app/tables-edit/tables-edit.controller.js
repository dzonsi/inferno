var TablesEditController = function($scope, orderByFilter, $timeout, $routeParams, Tables) {
	$scope.tables = Tables.getTables();
	$scope.$watch('tables.length', function() {
		if($scope.tables.length) {
			$scope.removeNumber.number = orderByFilter($scope.tables, 'number')[0].number;
		}
		$scope.setAddNumber();
	});
	$scope.addNumber = null;
	$scope.removeNumber = {
		number: null
	};
	$scope.clear = null;
	// add new table
	$scope.addTable = () => {
		console.log('add')
		var $input = $('#add-number');
		// check if input is empty
		// input is not empty
		if($input.val()) {
			var number = parseInt($input.val(), 10);
			console.log('number is', number)
			var exist;
			for(i in $scope.tables) {
				if($scope.tables[i].number == number) {
					exist = true;
					break;
				}
			}
			if(exist) {
				var $exist = $('#already-exist');
				$exist.show();
				$timeout(function() {
					$exist.hide();
				}, 2000);
			} else {
				Tables.addTable(number);
				$timeout.cancel($scope.clear);
				$input.val('');
			}
		}
		// input is empty
		// add number from order number
		else {
			Tables.addTable($scope.addNumber);
			$timeout.cancel($scope.clear);
			console.log('empty input')
		}
		// set next number to add
		// and number to remove
		// for both cases
		$scope.setAddNumber();
		$scope.setRemoveNumber();
	}
	// set add number
	// first missing number in tables numbers
	$scope.setAddNumber = function() {
		var tables = orderByFilter($scope.tables, 'number');
		var noMissing = true;
		var i, number;
		console.log('all', tables)
		for(i = 0; i < tables.length; i++) {
			number = i + 1;
			console.log('number is', number)
			if(tables[i].number != number) {
				$scope.addNumber = number;
				noMissing = false;
				console.log('smallest missing number is', number)
				break;
			}
		}
		if(noMissing) {
			$scope.addNumber = tables.length + 1;
			console.log('smallest number is', $scope.addNumber);
		}
	}
	// set add number every time
	$scope.setAddNumber();
	// remove table
	$scope.removeTable = function() {
		var table = Tables.getTable($scope.removeNumber.number);
		if(table.orders.length) {
			$('#have-orders-info').show();
			$timeout(() => {
				$('#have-orders-info').hide();
			}, 3000);
		} else {
			console.log('remove');
			Tables.removeTable($scope.removeNumber.number);
			$scope.setAddNumber();
			$scope.setRemoveNumber();
		}
	}
	// set remove number
	// first number in tables numbers
	$scope.setRemoveNumber = function() {
		console.log('setNew triggered')
		if(!$scope.tables.length) {
			$scope.removeNumber.number = null;
			console.log('set to null')
		} else {
			var tables = orderByFilter($scope.tables, 'number');
			$scope.removeNumber.number = tables[0].number;
			console.log('new remove number', $scope.removeNumber);
		}
	}
	// check if newNumber exist in table numbers
	$scope.checkNumber = function() {
		for(i in $scope.tables) {
			console.log(typeof $scope.newNumber)
			if($scope.tables[i].number == $scope.newNumber) {
				var $exist = $('#already-exist');
				$exist.show();
				$timeout(function() {
					$exist.hide();
				}, 2000);
				break;
			}
		}
	}
	// triggers checkNumber with timeout
	// and clear timeout if number is changed fast
	// for new checkNumber
	$scope.checkNumberTrigger = function() {
		if($scope.clear) {
			$timeout.cancel($scope.clear);
		}
		$scope.clear = $timeout($scope.checkNumber, 1000);
	}
}
TablesEditController.$inject = ['$scope', 'orderByFilter', '$timeout', '$routeParams', 'Tables'];