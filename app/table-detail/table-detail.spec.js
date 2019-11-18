describe('tableDetail', function() {

  beforeEach(module('tableDetail'));

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

  describe('TableDetailController', function() {

    it('should create scope allTables and drinks objects', function() {
      $httpBackend.expectGET('data/tables.json');
      $componentController('tableDetail', { $scope: $rootScope});
      $httpBackend.flush();
      expect($rootScope.allTables).toEqual([{name: 'tables'}]);
      expect($rootScope.drinks).toEqual([{name: 'drinks'}]);
    });

    it('should create numbers array', function() {
      $componentController('tableDetail', { $scope: $rootScope});
      $httpBackend.flush();
      expect($rootScope.numbers).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    it('should create orderNumber object', function() {
      $httpBackend.expectGET('data/drinks.json');
      $componentController('tableDetail', { $scope: $rootScope});
      $httpBackend.flush();
      expect($rootScope.orderNumber).toEqual({number: 1});
    });

    it('should add new drink to drinks object', function() {
      $httpBackend.expectGET('data/drinks.json');
      $componentController('tableDetail', { $scope: $rootScope});
      $rootScope.addDrink(1, 'Ice coffee', 270);
      $httpBackend.flush();
      expect($rootScope.drinks).toEqual([{id: 1, name: 'Ice coffee', price: 270}, {name: 'drinks'}]);
    });

    it('should add new table to tables object', function() {
      $httpBackend.expectGET('data/tables.json');
      $componentController('tableDetail', { $scope: $rootScope});
      $rootScope.addTable(1, false, 0);
      $httpBackend.flush();
      expect($rootScope.allTables).toEqual([{number:1, occupied: false, amount: 0, orders: []}, {name: 'tables'}]);
    });

  });


});