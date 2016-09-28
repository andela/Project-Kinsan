describe('History factory', function() {
  let HistoryFac;

  // before each test load the angular module
  beforeEach(
    angular.mock.module('services.History')
  );

  // Set our injected History service (_Users_) to our local History variable
  beforeEach(inject(function(_HistoryFac_){
    HistoryFac = _HistoryFac_;
  }));

  // A simple test to verify the History service exists
  it('should exist', function() {
    expect(HistoryFac).toBeDefined();
  });

  it('should expect getHistory() to be defined', function() {
    expect(typeof HistoryFac.getHistory).toBe('function');
  });

});