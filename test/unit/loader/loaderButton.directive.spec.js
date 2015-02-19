'use strict';

describe('<loader-button> directive', function() {
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

    scope.buttonConfig = {
      label: 'Load Something',
      size: '3em',
      iconClass: 'fa-refresh',
      isLoading: false,
      isSuccess: false,
      isFail: false,
      successMsg: 'Success!',
      failMsg: 'Failed :(',
      btnClass: 'special-btn-class',
    };

    element = angular.element('<loader-button cfg="buttonConfig"></loader-button>');

    compiled = $compile(element)(scope);
    scope.$digest();
  });

  describe('isolated scope', function() {
    var isoScope;

    beforeEach(function() {
      isoScope = compiled.isolateScope();
    });

    it('changing the parent scope model should be reflected in the directive\'s isLoading model', function() {
      scope.buttonConfig.isLoading = true;
      expect(isoScope.cfg.isLoading).toBe(true);
    });

    it('should get the size string from parent', function() {
      expect(isoScope.cfg.size).toBe('3em');
    });

    it('should get the btnClass string from parent', function() {
      expect(isoScope.cfg.btnClass).toBe('special-btn-class');
    });
  });
});