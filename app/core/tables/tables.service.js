angular.
	module('tables').
		factory('Tables', ['$http',
			function($http) {
				var tables = [];
				$http.get('data/tables.json').then(function(response) {
					angular.forEach(response.data, function(table) {
						tables.push(table);
					});
				}, function(reject) {
					console.log(reject);
				});

				return {
					getTables() {
						return tables;
					},
					getTable(number) {
						for (i in tables) {
							if(tables[i].number == number) {
								return tables[i];
							}
						}
					},
					addTable(n) {
						var table = {
							number: n,
							occupied: false,
							amount: 0,
							orders: []
						};
						tables.push(table);
					},
					removeTable(number) {
						for (i in tables) {
							if(tables[i].number == number) {
								tables.splice(i, 1);
								return;
							}
						}
					},
					changeStatus(number) {
						// find table
						var table = this.getTable(number);
						if(table.occupied) {
							table.occupied = !table.occupied;
							this.restartTable(number);
							// do i need restartTable method
							// check later, if not delete
						} else {
							table.occupied = !table.occupied;
						}
					},
					restartTable(number) {
						// find table
						var table = this.getTable(number);
						table.orders = [];
						table.amount = 0;
					},
					addTableOrder(number, order) {
						var table, exist;
						// find table
						table = this.getTable(number);
						// if table doesn't have eny order
						// push order into orders
						if(!table.orders.length) {
							table.orders.push(order);
						} else {
							// if table had orders
							// check if order exist in orders
							exist = false;
							for(i in table.orders) {
								if(table.orders[i].id == order.id) {
									// new order is in orders, add new order quantity to order
									// or immutable object ?
									table.orders[i].quantity += order.quantity;
									// change exist to true if there is order in orders
									exist = true;
									break;
								}
							}
							if(!exist) {
								// order dosn't exist in orders
								table.orders.push(order);
							}
						}
						// in all cases update table amount
						this.updateAmountWithOrder(number, order);
					},
					removeTableOrder(number, order) {
						// find table
						var table = this.getTable(number);
						// if table doesn't have eny order
						// can't remove order
						if(!table.orders.length) {
							console.log('table doesn\'t have any order, can\'t remove');
							return;
						} else {
							// if table had orders
							// check if remove order exist in orders
							for(i in table.orders) {
								if(table.orders[i].id == order.id) {
									// remove order is in orders
									// check if remove order quantity is less than order quantity
									// or immutable object ?
									if(order.quantity > table.orders[i].quantity) {
										// remove order quantity is greather than order quantity
										console.log('order quantity is higher than table' +
											' order quantity, can\'t remove');
										return;
									} else {
										// remove table order quantity if it is equal or less
										// than remove order quantity
										table.orders[i].quantity -= order.quantity;
										// if table orders quantity iz zero after remove
										// remove order form table orders
										if(!table.orders[i].quantity) {
											table.orders.splice(i, 1);
										}
										// update amount after remove the order
										this.updateAmount(number);
										return;
									}
								}
							}
							// order doesn't exist in orders
							// display something
							console.log('order doesn\'t exist in orders')
						}
					},
					updateAmount(number) {
						// get table
						var table = this.getTable(number);
						table.amount = 0;
						for (i in table.orders) {
							table.amount += table.orders[i].price * table.orders[i].quantity;
						}
					},
					updateAmountWithOrder(number, order) {
						//get table
						var table = this.getTable(number);
						table.amount += order.price * order.quantity;
					}
				}
			}
		]);