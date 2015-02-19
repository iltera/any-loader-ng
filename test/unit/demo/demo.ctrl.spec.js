'use strict';

describe('DemoCtrl', function() {
  var ctrl,
    scope,
    $timeout;

  beforeEach(function() {
    inject(function(_$timeout_) {
      $timeout = _$timeout_;
    });

    scope = $rootScope.$new();

    ctrl = $controllerConstructor('DemoCtrl', {$scope: scope});
  });

  describe('toggleLoading', function() {
    it('should toggle the isLoading model between true/false', function() {
      ctrl.toggleLoading();
      expect(ctrl.loaderConfig.isLoading).toBe(true);
    });
  });

  describe('loadWithMsgs', function() {
    beforeEach(function() {
      ctrl.loadWithMsgs();
    });

    it('should set the config loading to false after timeout', function() {
      expect(ctrl.buttonConfig.isLoading).toBe(true);
      expect(ctrl.buttonConfig.isSuccess).toBe(false);
      expect(ctrl.buttonConfig.isFail).toBe(false);

      $timeout.flush();

      expect(ctrl.buttonConfig.isLoading).toBe(false);
    });

    it('should set isSuccess to true when successful', function() {
      spyOn(Math, 'floor').and.callFake(function() {
        return 2;
      });

      $timeout.flush();

      expect(ctrl.buttonConfig.isSuccess).toBe(true);
    });

    it('should set isFail to true when fails', function() {
      spyOn(Math, 'floor').and.callFake(function() {
        return 1;
      });

      $timeout.flush();

      expect(ctrl.buttonConfig.isFail).toBe(true);
    });
  });

  describe('loadWithoutMsgs', function() {
    it('should set the isLoading property correctly while loading', function() {
      ctrl.loadWithoutMsgs();

      expect(ctrl.buttonNoMsgConfig.isLoading).toBe(true);

      $timeout.flush();

      expect(ctrl.buttonNoMsgConfig.isLoading).toBe(false);
    });
  });

  describe('resetButtonConfig', function() {
    it('should reset the isSuccess and isFail properties to false', function() {
      ctrl.resetButtonConfig();
      expect(ctrl.buttonConfig.isSuccess).toBe(false);
      expect(ctrl.buttonConfig.isFail).toBe(false);
    });
  });
});