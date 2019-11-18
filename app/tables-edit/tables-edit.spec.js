describe('tablesEdit', function() {
	beforeEach(module('tablesEdit'));

  var $httpBackend, $componentController, $rootScope;

  beforeEach(inject(function($injector, _$rootScope_) {
    $componentController = $injector.get('$componentController');
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.when('GET', 'data/drinks.json')
      .respond([{name: 'drinks'}]);
    $httpBackend.when('GET', 'data/tables.json')
      .respond([{name: 'tables'}]);
    $rootScope = _$rootScope_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('TablesEditController', function() {
  	it('should create scope tables', function() {
  		var rootscope = $rootScope.$new();
  		$httpBackend.expectGET('data/tables.json');
  		$componentController('tablesEdit', { $scope: rootscope});
  		$httpBackend.flush();
  		expect(rootscope.tables).toEqual([{name: 'tables'}]);
  	});

  	it('should create scope add number with value 1', function() {
  		var rootscope = $rootScope.$new();
  		$componentController('tablesEdit', { $scope: rootscope});
  		$httpBackend.flush();
  		expect(rootscope.addNumber).toBe(1);
  	});
  })
});