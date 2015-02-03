'use strict';

describe('Service: tGameApi', function () {

  // load the service's module
  beforeEach(module('tGameApp'));

  // instantiate service
  var tGameApi;
  beforeEach(inject(function (_tGameApi_) {
    tGameApi = _tGameApi_;
  }));

  it('should do something', function () {
    expect(!!tGameApi).toBe(true);
  });

});
