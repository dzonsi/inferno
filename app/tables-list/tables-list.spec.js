describe('tablesList', function() {

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

  describe('TablesListController', function() {

    it('should create show property with value all', function() {
      $componentController('tablesList', { $scope: $rootScope});
      $httpBackend.flush();
      expect($rootScope.filter.show).toBe('all');
    });

    it('should create scope tables and drinks objects', function() {
      $httpBackend.expectGET('data/tables.json');
      $componentController('tablesList', { $scope: $rootScope});
      $httpBackend.flush();
      expect($rootScope.tables).toEqual([{name: 'tables'}]);
      expect($rootScope.drinks).toEqual([{name: 'drinks'}]);
    });

    /*it('should add new drink to drinks object', function() {
      $httpBackend.expectGET('data/drinks.json');
      $componentController('tablesList', { $scope: $rootScope});
      $rootScope.addDrink('Ice coffee', 270);
      $httpBackend.flush();
      expect($rootScope.drinks).toEqual([{name: 'Ice coffee', price: 270}, {name: 'drinks'}]);
    });

    it('should add new table to tables object', function() {
      $httpBackend.expectGET('data/tables.json');
      $componentController('tablesList', { $scope: $rootScope});
      $rootScope.addTable(1, false, 0);
      $httpBackend.flush();
      expect($rootScope.tables).toEqual([{number:1, occupied: false, amount: 0, orders: []}, {name: 'tables'}]);
    });*/

  });


});