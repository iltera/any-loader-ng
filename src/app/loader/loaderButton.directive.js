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