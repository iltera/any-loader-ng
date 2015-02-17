/*!
  AngularJS loading indicator directives.
  @version: 0.0.1
  @author: Intridea Inc.
  @link: https://github.com/intridea/any-loader-ng.git
*/
angular.module('templates', ['views/loader/anyLoader.directive.html', 'views/loader/loaderButton.directive.html']);

angular.module("views/loader/anyLoader.directive.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/loader/anyLoader.directive.html",
    "<span class=\"any-loader\" ng-show=\"cfg.isLoading\">\n" +
    "  <i ng-class=\"{'fa fa-spinner fa-spin': (!cfg.iconClass)}\" class=\"fa fa-spin {{cfg.iconClass}}\" style=\"font-size: {{cfg.size}};\"></i>\n" +
    "</span>");
}]);

angular.module("views/loader/loaderButton.directive.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/loader/loaderButton.directive.html",
    "<button class=\"loader-button\" ng-disabled=\"cfg.isLoading || cfg.isSuccess || cfg.isFail\">\n" +
    "  <span ng-hide=\"cfg.isLoading || cfg.isSuccess || cfg.isFail\">{{cfg.label}}</span>\n" +
    "  <span ng-show=\"!cfg.isLoading && cfg.isSuccess\">{{cfg.successMsg}}</span>\n" +
    "  <span ng-show=\"!cfg.isLoading && cfg.isFail\">{{cfg.failMsg}}</span>\n" +
    "  <any-loader cfg=\"cfg\"></any-loader>\n" +
    "</button>");
}]);

angular.module('anyLoader', ['templates']);
(function() {
  'use strict';

  angular
    .module('anyLoader')
    .directive('anyLoader', AnyLoader);

  function AnyLoader() {
    /**
     * <any-loader
     *   cfg="configObject">
     *  </any-loader>
     *
     * @param {object} cfg Contains all the state and view options
     * @param {string} cfg.label The button text
     * @param {string} cfg.size (optional) The css font-size for the loader icon
     * @param {boolean} cfg.isLoading Is there something loading?
     * @param {boolean} cfg.isSuccess (optional, but required cfg.successMsg) Was the loading successful?
     * @param {boolean} cfg.isFail (optional, but required cfg.failMsg) Did the loading fail?
     * @param {string} cfg.successMsg (optional) The button text when isSuccess is true
     * @param {string} cfg.failMsg (optional) The button text when isFail is true
     * @param {string} cfg.iconClass (optional) The css class for the icon
     */
    return {
      restrict: 'AE',
      replace: true,
      scope: {
        cfg: '=',
      },
      templateUrl: 'views/loader/anyLoader.directive.html',
    };
  }
})();
(function() {
  'use strict';

  angular
    .module('anyLoader')
    .directive('loaderButton', LoaderButton);

  function LoaderButton() {
    /**
     * <loader-button
     *   cfg="configObject">
     * </loader-button>
     *
     * @param {object} cfg Contains all the state and view options
     * @param {string} cfg.label The button text
     * @param {string} cfg.size (optional) The css font-size for the loader icon
     * @param {boolean} cfg.isLoading Is there something loading?
     * @param {boolean} cfg.isSuccess (optional, but required cfg.successMsg) Was the loading successful?
     * @param {boolean} cfg.isFail (optional, but required cfg.failMsg) Did the loading fail?
     * @param {string} cfg.successMsg (optional) The button text when isSuccess is true
     * @param {string} cfg.failMsg (optional) The button text when isFail is true
     * @param {string} cfg.iconClass (optional) The css class for the icon
     */
    return {
      restrict: 'AE',
      replace: true,
      scope: {
        cfg: '=',
      },
      templateUrl: 'views/loader/loaderButton.directive.html',
    };
  }
})();
(function() {
  'use strict';

  angular
    .module('anyLoader')
    .controller('DemoCtrl', DemoCtrl);

  /* @ngInject */
  function DemoCtrl($timeout) {
    /*jshint validthis: true */
    var vm = this;

    // Assign all bindable models:
    vm.isLoading = false;
    vm.toggleLoading = toggleLoading;
    vm.resetButtonConfig = resetButtonConfig;
    vm.loadWithoutMsgs = loadWithoutMsgs;
    vm.loadWithMsgs = loadWithMsgs;
    vm.loaderConfig = {
      isLoading: false,
      size: '3em',
      iconClass: 'fa-refresh',
    };
    vm.buttonConfig = {
      label: 'Load Something',
      isLoading: false,
      isSuccess: false,
      isFail: false,
      successMsg: 'Success!',
      failMsg: 'Failed :(',
    };
    vm.buttonNoMsgConfig = {
      label: 'Load Something',
      isLoading: false,
    };

    //////////

    function loadWithMsgs () {
      /**
       * Fake loading something for some time
       */
      vm.buttonConfig.isLoading = true;
      vm.buttonConfig.isSuccess = false;
      vm.buttonConfig.isFail = false;

      $timeout(function() {
        vm.buttonConfig.isLoading = false;
        if ((Math.floor(Math.random() * (3 - 1)) + 1) % 2) {
          vm.buttonConfig.isSuccess = true;
        } else {
          vm.buttonConfig.isFail = true;
        }
      }, 1000);
    }

    function loadWithoutMsgs () {
      vm.buttonNoMsgConfig.isLoading = true;
      $timeout(function() {
        vm.buttonNoMsgConfig.isLoading = false;
      }, 1000);
    }

    function resetButtonConfig () {
      vm.buttonConfig.isSuccess = false;
      vm.buttonConfig.isFail = false;
    }

    function toggleLoading () {
      vm.loaderConfig.isLoading = !vm.loaderConfig.isLoading;
    }
  }
})();