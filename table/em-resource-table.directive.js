angular.module('portal-components')

.directive('emResourceTable', function() {
  return {
    restrict: 'A',
    scope: {
      resMgr: '=emResourceManager',
      batchMgr: '=?emBatchManager'
    },
    bindToController: true,
    controller: function() {
      if (this.batchMgr) {
        this.resMgr.batchMgr = this.batchMgr;
      }
    }
  };
});
