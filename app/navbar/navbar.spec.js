describe('navigationBar', function() {

	beforeEach(module('app'));

	var $componentController, $rootScope, $location;

	beforeEach(inject(function($injector, _$location_) {
    $componentController = $injector.get('$componentController');
    $rootScope = $injector.get('$rootScope');
    $location = _$location_;
  }));

  describe('navigationBar controller', function() {

  	it('should be defined', function() {
  		var $scope = $rootScope.$new();
  		var controller = $componentController('navigationBar', { $scope: $scope});
  		expect(controller).toBeDefined();
  	});

    it('isActive should return true if argument is same as location path', inject(function() {
        $location.path('/home');
        expect($location.path()).toBe('/home');

        var $scope = $rootScope.$new();
        var controller =  $componentController('navigationBar', { $scope: $scope});
        expect($scope.isActive('/home')).toBe(true);
        expect($scope.isActive('/drinks')).toBe(false);
    }));

  });

});