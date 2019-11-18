describe('Show table filter', function() {

  beforeEach(module('filters'));

  var $filter;

  var tables = [
    {
    number: 3,
    occupied: false,
    amount: 0,
    orders: []
    },
    {
    number: 4,
    occupied: true,
    amount: 0,
    orders: []
    },
    {
    number: 5,
    occupied: false,
    amount: 0,
    orders: []
    }
  ];

  beforeEach(inject(function(_$filter_){
    $filter = _$filter_;
  }));

  it('should return all tables when filter is all', function() {
    var showTable = $filter('showTable');

    expect(showTable(tables, 'all')).toEqual(tables);
  });

  it('should return only free tables when filter is free', function() {
    var showTable = $filter('showTable');

    expect(showTable(tables, 'free')).toEqual(
      [
        {
        number: 3,
        occupied: false,
        amount: 0,
        orders: []
        },
        {
        number: 5,
        occupied: false,
        amount: 0,
        orders: []
        }
      ]
    );
  });

  it('should return only occupied tables when filter is occupied', function() {
    var showTable = $filter('showTable');

    expect(showTable(tables, 'occupied')).toEqual(
      [
        {
        number: 4,
        occupied: true,
        amount: 0,
        orders: []
        }
      ]
    );
  });

});