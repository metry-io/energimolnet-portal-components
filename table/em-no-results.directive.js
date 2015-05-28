angular.module('portal-components')

.directive('emNoResults', function() {
  return {
    restrict: 'E',
    template: '<div class="em-no-results" ng-show="!resMgr.loading && resMgr.data.length === 0" ng-transclude></div>',
    scope: {
      resMgr: '=emResourceManager'
    },
    transclude: true
  };
});
