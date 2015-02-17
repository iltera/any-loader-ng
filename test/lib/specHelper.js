'use strict';
/*jshint -W079 */
/*jshint -W020 */
var $rootScope,
    $controllerConstructor,
    $httpBackend;

beforeEach(function() {
  module('templates');
  module('anyLoader');

  inject(function(_$rootScope_, _$controller_, _$httpBackend_) {
    /**
     * Commonly used dependencies are injected here to reduce the need
     * to adding them to each spec file
     */
    $rootScope = _$rootScope_;
    $controllerConstructor = _$controller_;
    $httpBackend = _$httpBackend_;
  });
});