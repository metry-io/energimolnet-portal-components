angular.module('energimolnet.ui')

.directive('emBatchAction', function() {
  return {
    restrict: 'E',
    template: '<li><a href="" ng-click="resMgr.batchAction(type, value)>{{ title }}</a></li>',
    replace: true,
    scope: {
      title: '@emTitle',
      type: '@emType',
      value: '=emValue'
    },
    require: '^emResourceManager',
    link: function(scope, element, attrs, resourceManagerCtrl) {
      scope.resMgr = resourceManagerCtrl.resMgr;
    }
  };
});
