angular.
	module('drinksEdit').
	factory('editDrinks',['Drinks', '$http',
		function(Drinks, $http) {
			var drinks = Drinks.getDrinks();
			return {
				getDrinks() {
					return drinks;
				},
				getDrink(id) {
					return Drinks.getDrink(id);
				},
				getPromise() {
					return $http.get('data/drinks.json');
				},
				addDrink(id, name, price) {
					Drinks.addDrink(id, name, price);
				},
				removeDrink(id) {
					Drinks.removeDrink(id);
				},
				updateDrinkPrice(id, newPrice) {
					Drinks.updateDrinkPrice(id, newPrice);
				}
			}
		}
	]).
	component('drinksEdit', {
		restrict: 'E',
		templateUrl: 'drinks-edit/drinks-edit.template.html',
		controller: DrinksEditController
	}).
	component('removeConfirm', {
		restrict: 'E',
		require: {
			DEC: '^drinksEdit'
		},
		templateUrl: 'drinks-edit/remove-confirm/remove-confirm.template.html',
		controller: RemoveConfirmController,
		bindings: {
			changeModal: '<',
			removeDrink: '<'
		}
	});