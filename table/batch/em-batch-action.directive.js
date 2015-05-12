angular.module('portal-components')

.directive('emBatchAction', function() {
  return {
    restrict: 'E',
    template: '<li><a href="" ng-click="resMgr.runBatchAction(type, value)">{{ title }}</a></li>',
    replace: true,
    scope: {
      title: '@emTitle',
      type: '@emType',
      value: '=emValue'
    },
    require: '^emResourceTable',
    link: function(scope, element, attrs, resourceTableCtrl) {
      scope.resMgr = resourceTableCtrl.resMgr;
    }
  };
});
