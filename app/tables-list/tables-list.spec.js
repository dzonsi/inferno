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
      var controller = $componentController('tablesList', { $scope: $rootScope});
      // call $onInit() to initialize data in controller
      controller.$onInit();
      $httpBackend.flush();
      expect($rootScope.filter.show).toBe('all');
    });

    it('should create scope tables and drinks objects', function() {
      $httpBackend.expectGET('data/tables.json');
      var controller = $componentController('tablesList', { $scope: $rootScope});
      // call $onInit() to initialize data in controller
      controller.$onInit();
      $httpBackend.flush();
      expect($rootScope.tables).toEqual([{name: 'tables'}]);
      expect($rootScope.drinks).toEqual([{name: 'drinks'}]);
    });

  });


});