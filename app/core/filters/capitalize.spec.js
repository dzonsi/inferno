describe('Capitalize filter', function() {

  beforeEach(module('filters'));

  var $filter;

  beforeEach(inject(function(_$filter_){
    $filter = _$filter_;
  }));

  it('should return first letter capitalize for string', function() {
    var capitalize = $filter('capitalize');
    expect(capitalize('all')).toEqual('All');
    expect(capitalize(8)).toBe(8);
    expect(capitalize(true)).toBe(true);
  });

});