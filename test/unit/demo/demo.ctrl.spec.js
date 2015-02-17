'use strict';

describe('DemoCtrl', function() {
  var ctrl;

  beforeEach(function() {
    ctrl = $controllerConstructor('DemoCtrl');
  });

  describe('toggleLoading', function() {
    it('should toggle the isLoading model between true/false', function() {
      ctrl.toggleLoading();
      expect(ctrl.loaderConfig.isLoading).toBe(true);
    });
  });
});