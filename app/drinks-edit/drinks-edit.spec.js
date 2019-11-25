describe('drinksEdit', function() {
  // not passing all the time
  // karma config files order ???

  beforeEach(module('drinksEdit'));
  // why do i need tablesList module ???
  beforeEach(module('tablesList'));

  var $httpBackend, $componentController;
  var $rootScope = {};


  beforeEach(inject(function($injector) {
    $componentController = $injector.get('$componentController');
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.when('GET', 'data/drinks.json')
      .respond([{name: 'drinks'}]);
    $httpBackend.when('GET', 'data/tables.json')
      .respond([{name: 'tables'}]);
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('DrinksEditController', function() {

    it('should create scope drinks objects', function() {
      $httpBackend.expectGET('data/drinks.json');
      var controller = $componentController('drinksEdit', { $scope: $rootScope});
      // call $onInit() to initialize data in controller
      controller.$onInit();
      $httpBackend.flush();
      expect($rootScope.drinks).toEqual([{name: 'drinks'}]);
    });

    it('should create scope removeDrinkId object', function() {
      $httpBackend.expectGET('data/drinks.json');
      var controller = $componentController('tablesList', { $scope: $rootScope});
      // call $onInit() to initialize data in controller
      controller.$onInit();
      $httpBackend.flush();
      expect($rootScope.removeDrinkId.id).toBe(1);
    });

    it('should create various scope properties', function() {
      $httpBackend.expectGET('data/drinks.json');
      var controller = $componentController('tablesList', { $scope: $rootScope});
      // call $onInit() to initialize data in controller
      controller.$onInit();
      $httpBackend.flush();
      expect($rootScope.showModal).toBe(false);
      expect($rootScope.startPrice).toBe(null);
      expect($rootScope.newPriceInfoShow).toBe(false);
    });

  });

});