'use strict';

describe('<any-loader> directive', function() {
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
      isLoading: false,
      size: '3em',
      iconClass: 'fa-refresh',
    };

    element = angular.element('<any-loader cfg="loaderConfig"></any-loader>');

    compiled = $compile(element)(scope);
    scope.$digest();
  });

  describe('isolated scope', function() {
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