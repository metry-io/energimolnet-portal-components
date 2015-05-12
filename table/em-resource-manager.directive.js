angular.module('portal-components')

.directive('emResourceManager', function() {
  return {
    restrict: 'A',
    scope: {
      resMgr: '=emResourceManager'
    },
    require: '?emBatchManager',
    link: function(scope, element, attrs, batchManagerCtrl) {
      if (batchManagerCtrl) {
       scope.batchMgr = batchManagerCtrl.batchMgr;
      }
    },
    controller: function($scope) {
      this.resMgr = scope.resMgr;

      if (scope.batchMgr) {
        this.resMgr.batchMgr = scope.batchMgr;
      }
    }
  };
});
