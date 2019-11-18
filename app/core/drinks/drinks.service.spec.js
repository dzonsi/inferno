describe('Drinks service', function() {

  var $httpBackend, Drinks;

  beforeEach(module('drinks'));

  //beforeEach(inject(function(_Drinks_, _$httpBackend_) {
  //  Drinks = _Drinks_;
  //  $httpBackend = _$httpBackend_;
  //}));

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.when('GET', 'data/drinks.json')
      .respond([{name: 'test'}]);
    Drinks = $injector.get('Drinks');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should create drinks object', function() {
    $httpBackend.expectGET('data/drinks.json');
    var result = Drinks.getDrinks();
    $httpBackend.flush();
    expect(result).toEqual([{name: 'test'}]);
  });

  it('should add new drink to drinks object', function() {
    $httpBackend.expectGET('data/drinks.json');
    Drinks.addDrink(1, 'Mocha', 280);
    var result = Drinks.getDrinks();
    $httpBackend.flush();
    expect(result).toEqual([{id: 1, name: 'Mocha', price: 280}, {name: 'test'}]);
  });

});