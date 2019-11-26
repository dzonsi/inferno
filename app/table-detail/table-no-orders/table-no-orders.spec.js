describe('tableNoOrders', function() {

	beforeEach(module('tableDetail'));

	var $componentController, $rootScope;

	beforeEach(inject(function($injector) {
    $componentController = $injector.get('$componentController');
    $rootScope = $injector.get('$rootScope');
  }));

  describe('TableNoOrdersController', function() {

  	it('should be defined', function() {
  		var $scope = $rootScope.$new();
  		var controller = $componentController('tableNoOrders', { $scope: $scope});
  		expect(controller).toBeDefined();
  	});

  });

});