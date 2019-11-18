describe('Tables service', function() {

  var Tables, $httpBackend;

  beforeEach(module('tables'));

  beforeEach(inject(function(_Tables_, _$httpBackend_) {
    Tables = _Tables_;
    $httpBackend = _$httpBackend_;
    $httpBackend.when('GET', 'data/tables.json')
      .respond([{name: 'test'}]);
  }));

  it('should create tables object', function() {
    $httpBackend.expectGET('data/tables.json');
    $httpBackend.flush();
    expect(Tables.getTables()).toEqual([{name: 'test'}]);
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should create tables object which is empty array', function() {
    expect(Tables.getTables()).toEqual([]);
  });

  it('should add new table object to tables array', function() {
    $httpBackend.expectGET('data/tables.json');
    Tables.addTable(1, false, 0);
    $httpBackend.flush();
    expect(Tables.getTables()).toEqual([{
      number: 1,
      occupied: false,
      amount: 0,
      orders: []
    }, {name: 'test'}]);
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should return single table based on table number', function() {
    Tables.addTable(2);
    expect(Tables.getTable(2)).toEqual({
      number: 2,
      occupied: false,
      amount: 0,
      orders: []
    });
  });

  it('should change table status based on table number', function() {
    Tables.addTable(3, false, 0);
    Tables.changeStatus(3);
    expect(Tables.getTable(3)).toEqual({
      number: 3,
      occupied: true,
      amount: 0,
      orders: []
    });
  });

  it('should add order to table', function() {
    Tables.addTable(4);
    Tables.changeStatus(4);
    Tables.addTableOrder(4, { id: 1, name: "Nescafe", price: 200, quantity: 1 });
    expect(Tables.getTable(4)).toEqual({
      number: 4,
      occupied: true,
      amount: 200,
      orders: [{ id: 1, name: "Nescafe", price: 200, quantity: 1 }]
    });
  });

  it('should remove order from tables orders', function() {
    Tables.addTable(4);
    Tables.addTableOrder(4, { id: 1, name: "Nescafe", price: 200, quantity: 2 });
    Tables.addTableOrder(4, { id: 2, name: "Mineral water", price: 120, quantity: 1 });
    Tables.removeTableOrder(4, { id: 1, name: "Nescafe", price: 200, quantity: 1 });
    expect(Tables.getTable(4)).toEqual({
      number: 4,
      occupied: false,
      amount: 320,
      orders: [
        { id: 1, name: "Nescafe", price: 200, quantity: 1 },
        { id: 2, name: "Mineral water", price: 120, quantity: 1 }
      ]
    });
  });

});