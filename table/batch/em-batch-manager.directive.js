angular.module('portal-components')

.directive('emBatchManager', function() {
  return {
    restrict: 'A',
    require: 'emResourceManager',
    scope: {
      batchMgr: 'emBatchManager'
    },
    bindToController: true,
    controller: function() {}
  };
});
