/*!
  AngularJS loading indicator directives.
  @version: 0.0.3
  @author: Intridea Inc.
  @link: https://github.com/intridea/any-loader-ng.git
*/
angular.module('anyLoaderTemplates', ['views/loader/anyLoader.directive.html', 'views/loader/loaderButton.directive.html']);

angular.module("views/loader/anyLoader.directive.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/loader/anyLoader.directive.html",
    "<span class=\"any-loader\" ng-show=\"cfg.isLoading\">\n" +
    "  <i ng-class=\"{'fa fa-spinner fa-spin': (!cfg.iconClass)}\" class=\"fa fa-spin {{cfg.iconClass}}\" style=\"font-size: {{cfg.size}};\"></i>\n" +
    "</span>");
}]);

angular.module("views/loader/loaderButton.directive.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/loader/loaderButton.directive.html",
    "<button class=\"loader-button {{cfg.btnClass}}\" ng-disabled=\"cfg.isLoading || cfg.isSuccess || cfg.isFail\">\n" +
    "  <span ng-hide=\"cfg.isLoading || cfg.isSuccess || cfg.isFail\">{{cfg.label}}</span>\n" +
    "  <span ng-show=\"!cfg.isLoading && cfg.isSuccess\">{{cfg.successMsg}}</span>\n" +
    "  <span ng-show=\"!cfg.isLoading && cfg.isFail\">{{cfg.failMsg}}</span>\n" +
    "  <any-loader cfg=\"cfg\"></any-loader>\n" +
    "</button>");
}]);

angular.module('anyLoader', ['anyLoaderTemplates']);
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
     * @param {string} cfg.btnClass (optional) The css class for the <button> element
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