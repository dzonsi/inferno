describe('removeConfirm', function() {

	beforeEach(module('drinksEdit'));

	var $componentController, $rootScope;

	beforeEach(inject(function($injector) {
    $componentController = $injector.get('$componentController');
    $rootScope = $injector.get('$rootScope');
  }));

  describe('RemoveConfirmController', function() {

  	it('should be defined', function() {
  		var $scope = $rootScope.$new();
  		var controller = $componentController('removeConfirm', { $scope: $scope});
  		expect(controller).toBeDefined();
  	});

  });

});