angular.module('portal-components')

.directive('emNoResults', function() {
  return {
    restrict: 'E',
    template: '<div ng-show="!resMgr.loading && resMgr.data.length === 0" ng-transclude></div>',
    scope: {
      resMgr: '=emResourceManager'
    },
    transclude: true
  };
});
