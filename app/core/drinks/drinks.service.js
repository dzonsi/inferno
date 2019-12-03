angular.
	module('drinks').
		factory('Drinks', ['$http',
			function($http) {
				var drinks = [];
				$http.get('data/drinks.json').then(function(response) {
					response.data.forEach(drink => {
						drinks.push(drink);
					});
				}, function(reject) {
					console.log(reject);
				});

				return {
					getDrinks() {
						return drinks;
					},
					getDrink(id) {
						for(i in drinks) {
							if(drinks[i].id == id) {
								return drinks[i];
							}
						}
					},
					addDrink(id, name, price) {
						var newDrink = {
							id,
							name,
							price
						}
						drinks.push(newDrink);
					},
					removeDrink(id) {
						for (i in drinks) {
							if(drinks[i].id == id) {
								drinks.splice(i, 1);
								return;
							}
						}
					},
					updateDrinkPrice(id, newPrice) {
						for(i in drinks) {
							if(drinks[i].id == id) {
								drinks[i].price = newPrice;
								return;
							}
						}
					}
				}
			}
		]);