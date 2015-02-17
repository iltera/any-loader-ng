'use strict';

describe('loader Directive', function() {
  var $compile,
    element,
    compiled,
    scope;

  // setup the app module and injections:
  beforeEach(function() {
    inject(function(_$compile_) {
      $compile = _$compile_;
    });

    $httpBackend.whenGET(/views\/([a-zA-Z]*\/)*[a-zA-Z.]*.html/)
      .respond(200);

    scope = $rootScope.$new();

    scope.loaderConfig = {
      label: 'Load Something',
      size: '3em',
      iconClass: 'fa-refresh',
      isLoading: false,
      isSuccess: false,
      isFail: false,
      successMsg: 'Success!',
      failMsg: 'Failed :(',
    };

    element = angular.element('<any-loader cfg="loaderConfig"></any-loader>');

    compiled = $compile(element)(scope);
    scope.$digest();
  });

  describe('any loader', function() {
    var isoScope;

    beforeEach(function() {
      isoScope = compiled.isolateScope();
    });

    it('changing the parent scope model should be reflected in the directive\'s isLoading model', function() {
      scope.loaderConfig.isLoading = true;
      expect(isoScope.cfg.isLoading).toBe(true);
    });

    it('should get the size string from parent', function() {
      expect(isoScope.cfg.size).toBe('3em');
    });
  });
});