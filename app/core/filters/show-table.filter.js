angular.module('filters').
	filter('showTable', function() {
		return function(input, filter) {
			var tables = input;
			var output = [];

			switch(filter) {
				case 'all':
					tables.map(table => {
						output.push(table);
					});
					return output;
				case 'free':
					tables.map(table => {
						if(table.occupied == false) {
							output.push(table);
						}
					});
					return output;
				case 'occupied':
					tables.map(table => {
						if(table.occupied == true) {
							output.push(table);
						}
					});
					return output;
			}
		}
	});