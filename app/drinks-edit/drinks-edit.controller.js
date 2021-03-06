var DrinksEditController = function($scope, $http, $window, orderByFilter, $timeout, $routeParams, Drinks, editDrinks) {
	this.$onInit = function() {
		$scope.drinks = editDrinks.getDrinks();
		$http.get('data/drinks.json')
			.then(response => console.log(response.data))
			.catch(error => $scope.status.error = true)
			.finally(() => $scope.status.loading = false);
		$scope.status = {
			loading: true,
			error: false
		}
		$scope.removeDrinkId = {
			id: 1
		};
		$scope.showModal = false;
		$scope.startPrice = null;
		$scope.newPriceInfoShow = false;
		$scope.newPriceName = null;
		$scope.newPriceValue = null;
		$scope.newPriceTimeout = null;
	}
	// reload page in error section
	$scope.reloadPage = function() {
		$window.location.reload(true)
	}
	// remove drink confirm method
	$scope.changeModal = function() {
		$scope.showModal = !$scope.showModal;
	}
	// validate form and call
	// addNewDrink if inputs are ok
	$scope.addNewDrinkValidate = function() {
		var $name = $('#drink-name');
		var $price = $('#drink-price');
		// test if both inputs are filled
		if($name.val() && $price.val()) {
			console.log('works')
			// test name val for match in drinks
			console.log($scope.drinks)
			var exist = false;
			$scope.drinks.forEach(function(drink) {
				if(drink.name.toLowerCase() == $name.val().toLowerCase()) {
					$('#already-exist').show('fast', function() {
						$timeout(function() {
							$('#already-exist').hide('slow')
						}, 3000);
					});
					console.log(drink.id, $name.val());
					exist = true;
					return;
				}
			});
			if(exist) {
				return;
			}
			// test price val for numbers only
			if(/^\d+(\.\d+)?$/.test($price.val())) {
				// everything is ok
				// add new drink by calling method
				var id = $scope.findNextId();
				var name = $name.val().charAt(0).toUpperCase() + $name.val().substr(1);
				var price = Math.round(parseFloat($price.val(), 10));
				$scope.addNewDrink(id, name, price);
				// clear inputs
				$name.val('');
				$price.val('');
			} else {
				// price is not a number display error message
				$('#not-a-number').show('fast', function() {
					$timeout(function() {
						$('#not-a-number').hide('slow')
					}, 3000);
				});
			}
		}
		// both inputs are not filled
		// display all fields error
		else {
			$('#all-fields').show('fast', function() {
				$timeout(function() {
					$('#all-fields').hide('slow')
				}, 3000);
			});
		}
	}
	// find smallest missing id in drinks
	$scope.findNextId = function() {
		var drinks = orderByFilter($scope.drinks, 'id');
		var noMissing = true;
		var i, id;
		console.log('all', drinks);
		for(i = 0; i < drinks.length; i++) {
			id = i + 1;
			console.log('number is', id)
			if(drinks[i].id != id) {
				noMissing = false;
				console.log('smallest missing id is', id);
				return id;
			}
		}
		if(noMissing) {
			console.log('smallest number is', drinks.length + 1);
			return drinks.length + 1;
		}
	}
	// add new drink by calling service
	$scope.addNewDrink = function(id, name, price) {
		editDrinks.addDrink(id, name, price);
	}
	// remove drink
	$scope.removeDrink = function() {
		editDrinks.removeDrink($scope.removeDrinkId.id);
		$scope.searchName = '';
		if(!$scope.drinks.length) {
			$scope.removeDrinkId.id = 1;
		} else {
			$scope.removeDrinkId.id = $scope.drinks[0].id;
		}
	}
	// call editDrinks update price
	$scope.newPrice = function(id, newPrice) {
		editDrinks.updateDrinkPrice(id, newPrice);
	}
	// call info that new price is set
	$scope.newPriceInfo = function(id, newPrice) {
		$scope.newPriceValue = newPrice;
		var drink = editDrinks.getDrink(id);
		$scope.newPriceName = drink.name;
		if($scope.newPriceInfoShow) {
			$timeout.cancel($scope.newPriceTimeout);
			$scope.newPriceInfoShow = !$scope.newPriceInfoShow;
			$scope.newPriceInfo(id, newPrice);
			} else {
			$scope.newPriceInfoShow = !$scope.newPriceInfoShow;
			$scope.newPriceTimeout = $timeout(() => {
				$scope.newPriceInfoShow = !$scope.newPriceInfoShow;
			}, 3000);
		}
	}
	// call on input dbl click
	$scope.editPrice = function(event, id) {
		$(event.target).attr('readonly', false);
		$scope.startPrice = Math.round(parseFloat(event.target.value, 10));
		$(`#click-info-${id}`).hide('slow');
		$(`#new-info-${id}, #exit-info-${id}`).show('slow');
	}
	// call on input blur
	$scope.editPriceConfirm = (event, id) => {
		$(event.target).attr('readonly', true);
		var newPrice = Math.round(parseFloat(event.target.value, 10));
		// new price is ok
		if(/^\d+(\.\d+)?$/.test(newPrice) && newPrice > 0) {
			if(newPrice != $scope.startPrice) {
				$scope.newPrice(id, newPrice);
				$scope.newPriceInfo(id, newPrice);
			} else {
				event.target.value = $scope.startPrice;
			}
		}
		// new price is not a number
		// or smaller than zero
		else {
			event.target.value = $scope.startPrice;
			$('#new-price-invalid').show('slow');
			$timeout(() => {
				$('#new-price-invalid').hide('slow');
			}, 3000);
		}
		$(`#click-info-${id}`).show('slow');
		$(`#new-info-${id}, #exit-info-${id}`).hide('slow');
	}
}
DrinksEditController.$inject = ['$scope', '$http', '$window', 'orderByFilter', '$timeout', '$routeParams', 'Drinks', 'editDrinks'];