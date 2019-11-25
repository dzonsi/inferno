describe('tableChoose', function() {

	beforeEach(module('tableDetail'));

	var $componentController;
	var $scope = {};

	beforeEach(inject(function($injector) {
    $componentController = $injector.get('$componentController');
  }));

  it('should exist', function() {
  	var controller = $componentController('tableChoose', { $scope: $scope});
  	expect(controller).toBeDefined();
  });
});